"""
MindTrips FastAPI Backend
=========================
Run with: uvicorn api:app --reload --port 8000

Endpoints:
  POST /predict   — Returns ML-based travel style prediction
  GET  /health    — Server status
  GET  /model-info — Model metadata
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional
import joblib
import numpy as np
import json

from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import Request
from fastapi.responses import HTMLResponse

# ── Load trained model ──────────────────────────────────────────────
try:
    bundle = joblib.load("mindtrips_model.pkl")
    MODEL        = bundle["model"]
    LABEL_NAMES  = bundle["label_names"]
    FEATURE_COLS = bundle["feature_cols"]
    MODEL_META   = bundle
    print(f"✅ Model loaded: {bundle['model_name']} | Accuracy: {bundle['accuracy']*100:.1f}%")
except FileNotFoundError:
    raise RuntimeError("mindtrips_model.pkl not found. Run train_model.py first.")

# ── FastAPI App ──────────────────────────────────────────────────────
app = FastAPI(
    title="MindTrips AI Backend",
    description="ML-powered Indian travel recommendation engine",
    version="1.0.0"
)

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Request / Response Schemas ───────────────────────────────────────
class UserPreferences(BaseModel):
    # Destination context (user's intended type)
    destination_type: int = Field(
        ..., ge=0, le=6,
        description="0=beach 1=hill 2=city 3=adventure 4=religious 5=nature 6=desert"
    )
    avg_cost_per_day: float = Field(
        ..., gt=0,
        description="User's daily budget in INR"
    )
    season: int = Field(
        ..., ge=0, le=3,
        description="0=winter 1=summer 2=monsoon 3=all_year"
    )
    duration_days: int = Field(
        ..., ge=1, le=30,
        description="Planned trip duration in days"
    )
    crowd_level: int = Field(
        ..., ge=1, le=5,
        description="Preferred crowd level (1=quiet, 5=lively)"
    )
    safety_rating: int = Field(
        default=4, ge=1, le=5,
        description="Minimum safety requirement"
    )
    adventure_level: int = Field(
        ..., ge=1, le=5,
        description="Adventure preference (1=relaxed, 5=extreme)"
    )
    luxury_level: int = Field(
        ..., ge=1, le=5,
        description="Comfort/luxury preference (1=budget, 5=ultra luxury)"
    )
    family_friendly: int = Field(
        ..., ge=1, le=5,
        description="Family friendliness need (1=adults only, 5=family first)"
    )

class PredictionResponse(BaseModel):
    predicted_style: str
    confidence_scores: dict
    top_prediction_index: int
    model_used: str
    model_accuracy: float
    feature_values: dict
    recommendation_reason: str
    suggested_destinations: list[str]

# ── Destination suggestions per label ───────────────────────────────
SUGGESTIONS = {
    "Budget Backpacker":  ["Kasol, Himachal Pradesh", "Mcleod Ganj, Himachal Pradesh",
                           "Gokarna, Karnataka", "Varkala, Kerala", "Khuri Village, Rajasthan"],
    "Mid-Range Comfort":  ["Shimla, Himachal Pradesh", "Mumbai, Maharashtra",
                           "Bengaluru, Karnataka", "Ooty, Tamil Nadu", "Chandigarh, Punjab"],
    "Luxury Explorer":    ["Taj Lake Palace, Udaipur", "Ananda in the Himalayas",
                           "Lakshadweep", "Rambagh Palace, Jaipur", "Bangaram Atoll, Kerala"],
    "Family Trip":        ["Mussoorie, Uttarakhand", "Ooty, Tamil Nadu",
                           "Udaipur, Rajasthan", "Munnar, Kerala", "Amritsar, Punjab"],
    "Couple Getaway":     ["Dal Lake, Srinagar", "Alleppey Houseboat, Kerala",
                           "Andaman Islands", "Pondicherry", "Coorg, Karnataka"],
    "Solo Adventure":     ["Leh Ladakh", "Spiti Valley, Himachal Pradesh",
                           "Ziro Valley, Arunachal Pradesh", "Valley of Flowers, Uttarakhand",
                           "Sandakphu Trek, West Bengal"],
}

REASONS = {
    "Budget Backpacker":  "Your preference for low cost and high adventure aligns with the backpacker profile.",
    "Mid-Range Comfort":  "Your balanced budget and comfort preference suit a mid-range travel style.",
    "Luxury Explorer":    "Your high daily budget and luxury preference match premium travel experiences.",
    "Family Trip":        "Your family-friendly requirements and safety preference match family travel.",
    "Couple Getaway":     "Your romantic, mid-to-high luxury preference with scenic destinations suits a couple getaway.",
    "Solo Adventure":     "Your adventure-first, crowd-avoidance and independent travel style matches solo adventure.",
}

# ── Endpoints ────────────────────────────────────────────────────────
@app.get("/health")
def health():
    return {"status": "ok", "model": MODEL_META["model_name"],
            "accuracy": MODEL_META["accuracy"]}

@app.get("/model-info")
def model_info():
    return {
        "model_name": MODEL_META["model_name"],
        "accuracy":   MODEL_META["accuracy"],
        "cv_accuracy": MODEL_META["cv_accuracy"],
        "labels":     MODEL_META["label_names"],
        "features":   MODEL_META["feature_cols"],
        "feature_importances": MODEL_META.get("feature_importances", {}),
        "all_model_results": MODEL_META.get("all_model_results", {})
    }

@app.post("/predict", response_model=PredictionResponse)
def predict(prefs: UserPreferences):
    feature_vector = np.array([[
        prefs.destination_type,
        prefs.avg_cost_per_day,
        prefs.season,
        prefs.duration_days,
        prefs.crowd_level,
        prefs.safety_rating,
        prefs.adventure_level,
        prefs.luxury_level,
        prefs.family_friendly,
    ]])

    # Prediction
    pred_idx = int(MODEL.predict(feature_vector)[0])
    predicted_style = LABEL_NAMES[pred_idx]

    # Confidence scores (probability per class)
    if hasattr(MODEL, "predict_proba"):
        proba = MODEL.predict_proba(feature_vector)[0]
        confidence = {LABEL_NAMES[i]: round(float(p), 4) for i, p in enumerate(proba)}
    else:
        confidence = {LABEL_NAMES[i]: (1.0 if i == pred_idx else 0.0)
                      for i in range(len(LABEL_NAMES))}

    return PredictionResponse(
        predicted_style=predicted_style,
        confidence_scores=confidence,
        top_prediction_index=pred_idx,
        model_used=MODEL_META["model_name"],
        model_accuracy=round(MODEL_META["accuracy"], 4),
        feature_values={col: val for col, val in zip(FEATURE_COLS, feature_vector[0])},
        recommendation_reason=REASONS.get(predicted_style, ""),
        suggested_destinations=SUGGESTIONS.get(predicted_style, [])
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="0.0.0.0", port=10000, reload=True)
