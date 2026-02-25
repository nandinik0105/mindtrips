"""
MindTrips — Travel Recommendation ML Model
==========================================
Trains RandomForest, DecisionTree, and KNN models on a structured
India travel dataset and exports the best model as a .pkl file.
"""

import json
import warnings
import numpy as np
import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import (
    accuracy_score, confusion_matrix, classification_report,
    ConfusionMatrixDisplay
)
from sklearn.pipeline import Pipeline

warnings.filterwarnings("ignore")
np.random.seed(42)

# ─────────────────────────────────────────────
# 1. STRUCTURED DATASET — 150 destinations
# ─────────────────────────────────────────────
#
# destination_type: beach=0, hill=1, city=2, adventure=3, religious=4, nature=5, desert=6
# season:           winter=0, summer=1, monsoon=2, all_year=3
# crowd_level:      1-5  (1=very quiet, 5=very crowded)
# safety_rating:    1-5  (1=low, 5=very safe)
# adventure_level:  1-5  (1=none, 5=extreme)
# luxury_level:     1-5  (1=budget, 5=ultra luxury)
# family_friendly:  1-5  (1=adults only, 5=perfect for family)
# avg_cost_per_day: INR
# duration_days:    recommended trip days
#
# LABEL (category): what travel style this suits best
# 0=Budget Backpacker, 1=Mid-Range Comfort, 2=Luxury Explorer,
# 3=Family Trip, 4=Couple Getaway, 5=Solo Adventure

DESTINATIONS = [
    # name, type, cost/day, season, duration, crowd, safety, adventure, luxury, family, LABEL
    # ── BEACHES ──
    ("Goa North",          0, 2800, 3, 5, 5, 4, 3, 3, 3, 4),  # Couple Getaway
    ("Goa South",          0, 2200, 0, 4, 3, 4, 2, 3, 4, 3),  # Family Trip
    ("Kovalam",            0, 2500, 0, 4, 3, 5, 2, 3, 4, 4),  # Couple Getaway
    ("Varkala",            0, 1800, 0, 3, 2, 5, 2, 2, 3, 5),  # Solo Adventure
    ("Palolem",            0, 1500, 0, 4, 2, 4, 2, 2, 3, 5),  # Solo Adventure
    ("Radhanagar Andaman", 0, 3200, 3, 5, 2, 5, 3, 4, 3, 4),  # Couple Getaway
    ("Havelock Island",    0, 3500, 3, 5, 2, 5, 4, 4, 3, 4),  # Couple Getaway
    ("Marari Beach",       0, 4500, 0, 4, 1, 5, 1, 5, 5, 2),  # Luxury Explorer
    ("Lakshadweep",        0, 6000, 0, 5, 1, 5, 3, 5, 4, 2),  # Luxury Explorer
    ("Gokarna",            0, 1200, 0, 3, 2, 4, 2, 2, 3, 0),  # Budget Backpacker
    ("Digha",              0, 1000, 0, 2, 4, 4, 1, 2, 4, 3),  # Family Trip
    ("Tarkarli",           0, 1800, 0, 3, 2, 4, 3, 2, 3, 5),  # Solo Adventure
    ("Mandrem",            0, 2000, 0, 4, 1, 4, 1, 2, 3, 4),  # Couple Getaway
    ("Bangaram Atoll",     0, 7500, 0, 5, 1, 5, 2, 5, 3, 2),  # Luxury Explorer
    ("Puri Beach",         0, 1400, 0, 3, 4, 4, 1, 2, 4, 3),  # Family Trip

    # ── HILLS / MOUNTAINS ──
    ("Manali",             1, 2200, 1, 5, 4, 4, 4, 3, 3, 5),  # Solo Adventure
    ("Shimla",             1, 2500, 0, 4, 4, 5, 2, 3, 4, 1),  # Mid-Range Comfort
    ("Mussoorie",          1, 2800, 1, 3, 4, 5, 2, 3, 4, 3),  # Family Trip
    ("Darjeeling",         1, 2200, 0, 4, 3, 5, 2, 3, 4, 3),  # Family Trip
    ("Ooty",               1, 2000, 1, 3, 4, 5, 1, 3, 5, 3),  # Family Trip
    ("Kodaikanal",         1, 2200, 1, 3, 3, 5, 2, 3, 4, 3),  # Family Trip
    ("Munnar",             1, 2500, 0, 4, 3, 5, 2, 3, 4, 3),  # Family Trip
    ("Coorg",              1, 3200, 0, 3, 2, 5, 2, 3, 4, 3),  # Family Trip
    ("Wayanad",            1, 2800, 0, 4, 2, 5, 3, 3, 4, 3),  # Family Trip
    ("Nainital",           1, 2400, 1, 3, 4, 5, 2, 3, 4, 3),  # Family Trip
    ("Kasol",              1, 1200, 1, 4, 3, 3, 4, 1, 2, 0),  # Budget Backpacker
    ("Mcleod Ganj",        1, 1400, 0, 4, 3, 4, 3, 2, 3, 0),  # Budget Backpacker
    ("Bir Billing",        1, 1600, 1, 3, 2, 4, 5, 2, 2, 5),  # Solo Adventure
    ("Auli",               1, 3500, 0, 3, 2, 4, 5, 4, 2, 5),  # Solo Adventure
    ("Spiti Valley",       1, 2000, 1, 7, 1, 3, 5, 2, 2, 5),  # Solo Adventure
    ("Chikmagalur",        1, 2800, 0, 3, 2, 5, 3, 3, 4, 3),  # Family Trip
    ("Sakleshpur",         1, 2200, 0, 2, 1, 5, 2, 3, 4, 4),  # Couple Getaway
    ("Khajjiar",           1, 2200, 1, 2, 2, 5, 2, 3, 4, 4),  # Couple Getaway
    ("Lansdowne",          1, 1800, 0, 2, 1, 5, 2, 2, 4, 4),  # Couple Getaway
    ("Dalhousie",          1, 2000, 0, 3, 2, 5, 2, 2, 4, 4),  # Couple Getaway
    ("Pelling",            1, 2500, 0, 3, 2, 5, 3, 3, 4, 4),  # Couple Getaway
    ("Yercaud",            1, 1800, 1, 2, 2, 5, 2, 2, 3, 3),  # Family Trip
    ("Mahabaleshwar",      1, 2800, 1, 3, 3, 5, 1, 3, 5, 3),  # Family Trip
    ("Matheran",           1, 2000, 1, 2, 3, 5, 2, 3, 3, 3),  # Family Trip
    ("Yelagiri",           1, 1500, 1, 2, 2, 5, 2, 2, 3, 3),  # Family Trip

    # ── CITIES ──
    ("Delhi",              2, 3000, 0, 4, 5, 3, 1, 3, 4, 3),  # Family Trip
    ("Mumbai",             2, 4000, 3, 3, 5, 3, 1, 3, 4, 1),  # Mid-Range Comfort
    ("Bengaluru",          2, 3500, 3, 3, 4, 4, 1, 3, 4, 1),  # Mid-Range Comfort
    ("Hyderabad",          2, 2800, 0, 3, 4, 4, 2, 3, 4, 3),  # Family Trip
    ("Chennai",            2, 2500, 0, 3, 4, 4, 1, 3, 4, 3),  # Family Trip
    ("Kolkata",            2, 2200, 0, 3, 4, 4, 2, 3, 3, 3),  # Family Trip
    ("Pune",               2, 2800, 3, 3, 4, 4, 2, 3, 4, 1),  # Mid-Range Comfort
    ("Jaipur",             2, 3200, 0, 4, 4, 4, 2, 4, 4, 3),  # Family Trip
    ("Lucknow",            2, 2200, 0, 3, 3, 4, 1, 3, 4, 3),  # Family Trip
    ("Udaipur",            2, 3800, 0, 4, 3, 5, 2, 4, 4, 4),  # Couple Getaway
    ("Jodhpur",            2, 3000, 0, 3, 3, 4, 2, 3, 4, 3),  # Family Trip
    ("Jaisalmer",          2, 2800, 0, 4, 2, 4, 2, 3, 3, 5),  # Solo Adventure
    ("Ahmedabad",          2, 2500, 0, 3, 4, 4, 1, 3, 4, 3),  # Family Trip
    ("Mysuru",             2, 2500, 0, 3, 3, 5, 1, 3, 4, 3),  # Family Trip
    ("Kochi",              2, 3000, 3, 3, 3, 5, 2, 3, 4, 3),  # Family Trip
    ("Chandigarh",         2, 2800, 0, 2, 3, 5, 1, 4, 4, 1),  # Mid-Range Comfort
    ("Pondicherry",        2, 2500, 3, 3, 3, 5, 2, 3, 4, 4),  # Couple Getaway
    ("Bhopal",             2, 2000, 0, 3, 3, 4, 2, 3, 4, 3),  # Family Trip
    ("Agartala",           2, 1800, 0, 3, 2, 5, 2, 2, 3, 5),  # Solo Adventure
    ("Guwahati",           2, 2200, 0, 3, 3, 4, 2, 2, 3, 3),  # Family Trip

    # ── ADVENTURE ──
    ("Leh Ladakh",         3, 4500, 1, 7, 2, 3, 5, 3, 2, 5),  # Solo Adventure
    ("Zanskar Valley",     3, 3500, 1, 7, 1, 3, 5, 2, 2, 5),  # Solo Adventure
    ("Nubra Valley",       3, 4000, 1, 5, 1, 4, 4, 3, 2, 5),  # Solo Adventure
    ("Pangong Lake",       3, 4200, 1, 5, 1, 3, 4, 3, 3, 5),  # Solo Adventure
    ("Rohtang Pass",       3, 2500, 1, 2, 3, 3, 5, 3, 2, 5),  # Solo Adventure
    ("Valley of Flowers",  3, 2800, 2, 4, 2, 4, 4, 2, 2, 5),  # Solo Adventure
    ("Dzukou Valley",      3, 2200, 1, 3, 1, 4, 4, 2, 2, 5),  # Solo Adventure
    ("Sandakphu Trek",     3, 2000, 0, 5, 1, 4, 4, 2, 2, 5),  # Solo Adventure
    ("Chopta Tungnath",    3, 2500, 1, 3, 1, 4, 4, 2, 2, 5),  # Solo Adventure
    ("Dudhsagar Trek",     3, 1800, 0, 3, 2, 4, 4, 2, 2, 5),  # Solo Adventure
    ("Gulmarg Skiing",     3, 4500, 0, 4, 3, 4, 5, 4, 3, 4),  # Couple Getaway
    ("Rishikesh Rafting",  3, 2200, 1, 3, 4, 4, 5, 2, 2, 5),  # Solo Adventure
    ("Jim Corbett Safari", 3, 5500, 0, 3, 2, 5, 3, 5, 4, 2),  # Luxury Explorer
    ("Kaziranga Safari",   3, 4500, 0, 3, 2, 5, 3, 4, 4, 2),  # Luxury Explorer
    ("Bandhavgarh Tiger",  3, 6000, 0, 3, 2, 5, 3, 5, 3, 2),  # Luxury Explorer
    ("Tawang",             3, 3000, 0, 5, 1, 4, 4, 3, 2, 5),  # Solo Adventure
    ("Ziro Valley",        3, 2200, 1, 4, 1, 5, 3, 2, 2, 5),  # Solo Adventure

    # ── RELIGIOUS / SPIRITUAL ──
    ("Varanasi",           4, 2000, 0, 3, 5, 3, 2, 2, 4, 3),  # Family Trip
    ("Amritsar",           4, 1800, 0, 3, 4, 5, 1, 3, 4, 3),  # Family Trip
    ("Tirupati",           4, 2000, 0, 2, 5, 5, 1, 2, 4, 3),  # Family Trip
    ("Haridwar",           4, 1500, 0, 3, 4, 5, 1, 2, 4, 3),  # Family Trip
    ("Rishikesh Yoga",     4, 1800, 0, 5, 3, 5, 2, 2, 4, 5),  # Solo Adventure
    ("Bodh Gaya",          4, 1500, 0, 3, 3, 5, 1, 2, 4, 3),  # Family Trip
    ("Pushkar",            4, 1800, 0, 3, 3, 4, 2, 2, 3, 3),  # Family Trip
    ("Dwarka",             4, 1600, 0, 2, 3, 5, 1, 2, 4, 3),  # Family Trip
    ("Shirdi",             4, 1500, 3, 2, 4, 5, 1, 2, 4, 3),  # Family Trip
    ("Kedarnath",          4, 2500, 1, 4, 4, 3, 4, 2, 3, 3),  # Family Trip
    ("Badrinath",          4, 2500, 1, 3, 3, 4, 3, 3, 3, 3),  # Family Trip
    ("Ajmer Dargah",       4, 1500, 3, 2, 4, 4, 1, 2, 4, 3),  # Family Trip
    ("Mathura Vrindavan",  4, 1500, 0, 2, 4, 5, 1, 2, 4, 3),  # Family Trip
    ("Ujjain",             4, 1600, 0, 2, 3, 5, 1, 2, 4, 3),  # Family Trip
    ("Somnath",            4, 1800, 0, 2, 3, 5, 1, 2, 4, 3),  # Family Trip
    ("Vaishno Devi",       4, 2000, 0, 3, 5, 4, 3, 3, 4, 3),  # Family Trip
    ("Ayodhya",            4, 1800, 0, 2, 4, 5, 1, 2, 4, 3),  # Family Trip
    ("Rameswaram",         4, 1800, 0, 2, 3, 5, 1, 2, 4, 3),  # Family Trip
    ("Madurai Meenakshi",  4, 2000, 0, 3, 4, 5, 1, 2, 4, 3),  # Family Trip

    # ── NATURE / WILDLIFE ──
    ("Sundarbans",         5, 3500, 0, 3, 2, 4, 3, 3, 3, 5),  # Solo Adventure
    ("Meghalaya",          5, 2800, 0, 4, 2, 5, 3, 2, 3, 5),  # Solo Adventure
    ("Arunachal Pradesh",  5, 3500, 0, 6, 1, 4, 4, 3, 2, 5),  # Solo Adventure
    ("Manipur Loktak",     5, 2500, 0, 3, 1, 5, 2, 2, 3, 5),  # Solo Adventure
    ("Nagarhole",          5, 5000, 0, 3, 1, 5, 2, 4, 3, 2),  # Luxury Explorer
    ("Kanha National Park",5, 5500, 0, 3, 2, 5, 3, 4, 3, 2),  # Luxury Explorer
    ("Periyar",            5, 3500, 0, 4, 3, 5, 3, 3, 3, 3),  # Family Trip
    ("Chilika Lake",       5, 2200, 0, 3, 2, 5, 2, 2, 3, 3),  # Family Trip
    ("Rann of Kutch",      5, 3500, 0, 3, 2, 5, 2, 3, 4, 3),  # Family Trip
    ("Majuli Island",      5, 2000, 0, 3, 1, 5, 2, 2, 3, 5),  # Solo Adventure
    ("Hampi",              5, 2500, 0, 4, 2, 5, 2, 2, 3, 5),  # Solo Adventure
    ("Badami Caves",       5, 2200, 0, 3, 2, 5, 2, 3, 3, 3),  # Family Trip
    ("Ajanta Ellora",      5, 2800, 0, 2, 3, 5, 2, 3, 4, 3),  # Family Trip
    ("Panna NP",           5, 4000, 0, 3, 1, 5, 3, 4, 3, 2),  # Luxury Explorer
    ("Simlipal",           5, 3000, 0, 3, 1, 4, 3, 3, 3, 5),  # Solo Adventure
    ("Kabini",             5, 5500, 0, 3, 1, 5, 3, 5, 3, 2),  # Luxury Explorer
    ("Namdapha",           5, 3500, 0, 5, 1, 4, 4, 3, 2, 5),  # Solo Adventure
    ("Dibru Saikhowa",     5, 3000, 0, 3, 1, 4, 3, 3, 2, 5),  # Solo Adventure

    # ── DESERT ──
    ("Jaisalmer Desert",   6, 2800, 0, 4, 2, 4, 3, 3, 4, 4),  # Couple Getaway
    ("Rann Utsav Camp",    6, 8000, 0, 3, 2, 5, 2, 5, 4, 2),  # Luxury Explorer
    ("Sam Sand Dunes",     6, 2500, 0, 2, 3, 4, 3, 3, 3, 3),  # Family Trip
    ("Khuri Village",      6, 1500, 0, 3, 1, 4, 3, 2, 3, 5),  # Solo Adventure
    ("Bikaner Camel Fest", 6, 2200, 0, 3, 3, 4, 2, 2, 3, 3),  # Family Trip
    ("Pushkar Camel Fair", 6, 2800, 0, 2, 4, 4, 2, 3, 3, 3),  # Family Trip
    ("Kutch White Desert", 6, 3500, 0, 3, 2, 5, 2, 3, 4, 4),  # Couple Getaway

    # ── LUXURY EXPERIENCES ──
    ("Taj Lake Palace",    2, 18000, 0, 3, 1, 5, 1, 5, 4, 2), # Luxury Explorer
    ("Ananda Himalayas",   1, 15000, 1, 4, 1, 5, 2, 5, 3, 2), # Luxury Explorer
    ("Evolve Back Coorg",  5, 14000, 0, 3, 1, 5, 2, 5, 4, 2), # Luxury Explorer
    ("Leela Kovalam",      0, 12000, 0, 4, 1, 5, 2, 5, 4, 2), # Luxury Explorer
    ("Rambagh Palace",     2, 16000, 0, 3, 1, 5, 1, 5, 4, 2), # Luxury Explorer
    ("Barefoot Havelock",  0, 12000, 3, 5, 1, 5, 3, 5, 3, 2), # Luxury Explorer
    ("Tamara Coorg",       1, 14000, 0, 3, 1, 5, 2, 5, 4, 2), # Luxury Explorer

    # ── HONEYMOON / ROMANTIC ──
    ("Dal Lake Srinagar",  1, 4500, 1, 5, 3, 4, 2, 4, 3, 4), # Couple Getaway
    ("Pahalgam",           1, 3500, 1, 4, 2, 4, 3, 3, 3, 4), # Couple Getaway
    ("Sonamarg",           1, 3200, 1, 3, 2, 4, 3, 3, 3, 4), # Couple Getaway
    ("Tsomgo Lake Sikkim", 1, 4000, 0, 3, 2, 5, 3, 3, 3, 4), # Couple Getaway
    ("Alleppey Houseboat", 0, 5500, 0, 3, 3, 5, 1, 5, 3, 4), # Couple Getaway
    ("Kumarakom",          5, 6000, 0, 4, 2, 5, 1, 5, 4, 4), # Couple Getaway
    ("Mahabalipuram",      0, 2800, 0, 3, 3, 5, 2, 3, 4, 4), # Couple Getaway
    ("Pondicherry French", 2, 3500, 3, 3, 2, 5, 1, 4, 4, 4), # Couple Getaway
    ("Andaman Neil Island",0, 3800, 3, 4, 1, 5, 2, 4, 3, 4), # Couple Getaway
    ("Gulmarg Honeymoon",  1, 5500, 0, 4, 2, 4, 3, 4, 3, 4), # Couple Getaway
    ("Nubra Valley Couple",3, 5000, 1, 5, 1, 4, 3, 3, 3, 4), # Couple Getaway
]

# Column names
cols = [
    "destination_type", "avg_cost_per_day", "season",
    "duration_days", "crowd_level", "safety_rating",
    "adventure_level", "luxury_level", "family_friendly",
    "label"
]

# Build DataFrame (skip name)
data = [row[1:] for row in DESTINATIONS]
df = pd.DataFrame(data, columns=["destination_type","avg_cost_per_day","season",
                                  "duration_days","crowd_level","safety_rating",
                                  "adventure_level","luxury_level","family_friendly","label"])

print(f"Dataset shape: {df.shape}")
print("\nLabel distribution:")
label_names = ["Budget Backpacker","Mid-Range Comfort","Luxury Explorer",
               "Family Trip","Couple Getaway","Solo Adventure"]
for i, name in enumerate(label_names):
    count = (df["label"] == i).sum()
    print(f"  {i} - {name}: {count} samples")

# ─────────────────────────────────────────────
# 2. FEATURES & LABELS
# ─────────────────────────────────────────────
feature_cols = ["destination_type","avg_cost_per_day","season",
                "duration_days","crowd_level","safety_rating",
                "adventure_level","luxury_level","family_friendly"]

X = df[feature_cols].values
y = df["label"].values

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42, stratify=y
)

print(f"\nTrain: {len(X_train)} | Test: {len(X_test)}")

# ─────────────────────────────────────────────
# 3. TRAIN ALL THREE MODELS
# ─────────────────────────────────────────────
models = {
    "RandomForest": RandomForestClassifier(n_estimators=200, max_depth=None,
                                           min_samples_split=2, random_state=42),
    "DecisionTree": DecisionTreeClassifier(max_depth=8, random_state=42),
    "KNN":          KNeighborsClassifier(n_neighbors=5, weights="distance",
                                          metric="euclidean")
}

results = {}
for name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    cv_scores = cross_val_score(model, X, y, cv=5, scoring="accuracy")
    results[name] = {
        "model": model,
        "accuracy": acc,
        "cv_mean": cv_scores.mean(),
        "cv_std": cv_scores.std(),
        "y_pred": y_pred
    }
    print(f"\n{'='*45}")
    print(f"  {name}")
    print(f"{'='*45}")
    print(f"  Test Accuracy  : {acc:.4f} ({acc*100:.2f}%)")
    print(f"  CV Accuracy    : {cv_scores.mean():.4f} ± {cv_scores.std():.4f}")
    print(f"\n  Classification Report:")
    print(classification_report(y_test, y_pred, target_names=label_names))

# ─────────────────────────────────────────────
# 4. BEST MODEL
# ─────────────────────────────────────────────
best_name = max(results, key=lambda k: results[k]["cv_mean"])
best_model = results[best_name]["model"]
best_acc   = results[best_name]["accuracy"]
best_cv    = results[best_name]["cv_mean"]

print(f"\n✅ Best Model: {best_name}")
print(f"   Test Accuracy: {best_acc*100:.2f}%")
print(f"   CV Accuracy:   {best_cv*100:.2f}%")

# ─────────────────────────────────────────────
# 5. CONFUSION MATRIX (text)
# ─────────────────────────────────────────────
y_best_pred = results[best_name]["y_pred"]
cm = confusion_matrix(y_test, y_best_pred)
print(f"\nConfusion Matrix ({best_name}):")
print(pd.DataFrame(cm, index=[f"True:{l}" for l in label_names],
                       columns=[f"Pred:{l[:5]}" for l in label_names]).to_string())

# ─────────────────────────────────────────────
# 6. FEATURE IMPORTANCE
# ─────────────────────────────────────────────
fi_data = {}
if hasattr(best_model, "feature_importances_"):
    importances = best_model.feature_importances_
    fi_dict = dict(zip(feature_cols, importances))
    fi_sorted = sorted(fi_dict.items(), key=lambda x: x[1], reverse=True)
    print(f"\nFeature Importances ({best_name}):")
    for feat, imp in fi_sorted:
        bar = "█" * int(imp * 40)
        print(f"  {feat:<22} {imp:.4f}  {bar}")
    fi_data = {k: float(v) for k, v in fi_sorted}

# ─────────────────────────────────────────────
# 7. SAVE MODEL + METADATA as PKL
# ─────────────────────────────────────────────
model_bundle = {
    "model": best_model,
    "model_name": best_name,
    "feature_cols": feature_cols,
    "label_names": label_names,
    "accuracy": float(best_acc),
    "cv_accuracy": float(best_cv),
    "confusion_matrix": cm.tolist(),
    "feature_importances": fi_data,
    "all_model_results": {
        k: {"accuracy": float(v["accuracy"]), "cv_mean": float(v["cv_mean"])}
        for k, v in results.items()
    }
}

joblib.dump(model_bundle, "mindtrips_model.pkl")
print(f"\n✅ Model saved: mindtrips_model.pkl")

# ─────────────────────────────────────────────
# 8. ALSO EXPORT MODEL LOGIC AS JSON (for browser)
# ─────────────────────────────────────────────
export = {
    "model_name": best_name,
    "accuracy": float(best_acc),
    "cv_accuracy": float(best_cv),
    "label_names": label_names,
    "feature_cols": feature_cols,
    "feature_importances": fi_data,
    "confusion_matrix": cm.tolist(),
    "all_results": {
        k: {"accuracy": float(v["accuracy"]), "cv_mean": float(v["cv_mean"])}
        for k, v in results.items()
    }
}
with open("model_metadata.json", "w") as f:
    json.dump(export, f, indent=2)

print("✅ Metadata saved: model_metadata.json")

# ─────────────────────────────────────────────
# 9. EXPORT TREE RULES FOR BROWSER INFERENCE
#    (Decision thresholds from RF feature importances + training data stats)
# ─────────────────────────────────────────────
# Build per-class centroid lookup (used in browser KNN-style prediction)
centroids = {}
for label_idx, label_name in enumerate(label_names):
    mask = y == label_idx
    if mask.sum() > 0:
        centroids[label_name] = X[mask].mean(axis=0).tolist()

# Build score weights from feature importances
weights = [fi_data.get(f, 1/len(feature_cols)) for f in feature_cols]

browser_model = {
    "weights": weights,
    "centroids": centroids,
    "label_names": label_names,
    "feature_cols": feature_cols,
    "feature_ranges": {
        col: {"min": float(X[:,i].min()), "max": float(X[:,i].max()),
              "mean": float(X[:,i].mean()), "std": float(X[:,i].std())}
        for i, col in enumerate(feature_cols)
    },
    "accuracy": float(best_acc),
    "cv_accuracy": float(best_cv),
    "model_name": best_name,
    "all_results": {
        k: {"accuracy": float(v["accuracy"]), "cv_mean": float(v["cv_mean"])}
        for k, v in results.items()
    },
    "confusion_matrix": cm.tolist()
}
with open("browser_model.json", "w") as f:
    json.dump(browser_model, f, indent=2)

print("✅ Browser model saved: browser_model.json")
print("\n" + "="*50)
print("  TRAINING COMPLETE")
print(f"  Best: {best_name} | Accuracy: {best_acc*100:.1f}%")
print("="*50)
