# 🗺️ MindTrips — Plan India, Your Way

AI-powered India travel planner with smart style prediction, 224 destinations,
60+ hotels with live booking links, and an interactive Explore India section.

---

## 📁 Project Structure

```
mindtrips/
│
├── index.html                  ← Main entry point (links all CSS + JS)
│
├── css/
│   ├── base.css                ← Root variables, body, nav, hero, planner, marquee
│   ├── features.css            ← 6 feature cards & demo panels
│   ├── predictor.css           ← Smart Predictor quiz UI & result panel
│   ├── explore.css             ← Explore India grid, state cards, modal
│   └── responsive.css          ← Hamburger menu + all breakpoints (1100/900/600px)
│
├── js/
│   ├── data.js                 ← All datasets: destinations, hotels, marquee places
│   ├── planner.js              ← Trip planner: generatePlan(), hotel cards, booking links
│   ├── features.js             ← Feature card demos (weather, budget calc, etc.)
│   ├── predictor.js            ← AI engine: rfInference(), quiz state, result rendering
│   ├── explore.js              ← 36 states data, renderStates(), searchStates(), modal
│   └── mobile.js               ← Hamburger menu toggle
│
├── python/
│   ├── train_model.py          ← Full ML training pipeline (scikit-learn)
│   ├── api.py                  ← FastAPI backend server
│   ├── mindtrips_model.pkl     ← Trained RandomForest model bundle
│   └── requirements.txt        ← Python dependencies
│
└── assets/
    └── browser_model.json      ← Exported model data (centroids, weights, metadata)
```

---

## 🚀 Quick Start

### Frontend Only (no backend needed)
Just open `index.html` in any browser. The AI predictor runs entirely in-browser
using the exported model weights from `assets/browser_model.json`.

### With FastAPI Backend

```bash
# 1. Navigate to python folder
cd python/

# 2. Install dependencies
pip install -r requirements.txt

# 3. Retrain model (optional — pkl already included)
python train_model.py

# 4. Start API server
uvicorn api:app --reload --port 8000
```

API available at `http://localhost:8000`
- `POST /predict` — Travel style prediction
- `GET  /model-info` — Model metadata & feature importances
- `GET  /health` — Server status

---

## 🤖 AI Model

| Detail | Value |
|---|---|
| Algorithm | RandomForest (200 estimators) |
| Training data | 139 Indian destinations |
| Features | 9 (destination type, budget, season, duration, crowd, safety, adventure, luxury, family) |
| Labels | 6 travel styles |
| Test accuracy | **80%** |
| CV accuracy | **73.4%** (5-fold) |

**Top feature importances:**
- Avg cost/day → 21.1%
- Crowd preference → 16.9%
- Luxury level → 12.9%
- Family friendliness → 11.4%

---

## ✨ Features

- **Smart Predictor** — Quiz-style AI that identifies your travel personality across 6 styles
- **Trip Planner** — 224 destinations, 36 states, hardcoded itineraries for all major routes
- **Hotel Booking** — 60+ hotels with direct MakeMyTrip & Booking.com links + date pre-fill
- **Explore India** — 36 state cards with live search, category filters, and detail modals
- **Feature Demos** — Weather, budget calculator, route finder, packing list, export panel
- **Fully Responsive** — Desktop, tablet, and mobile (320px+)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML, CSS, JavaScript |
| Fonts | Google Fonts (Cormorant Garamond, DM Sans) |
| ML (browser) | Weighted centroid inference (RF-derived) |
| ML (server) | scikit-learn RandomForestClassifier |
| Backend | FastAPI + Uvicorn |
| Model storage | joblib .pkl |
