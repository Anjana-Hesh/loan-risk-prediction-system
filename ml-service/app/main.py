import os
import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="Credit Risk Inference Engine", version="2.0")

# Model path dynamically resolve 
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "loan_risk_pipeline.pkl")

pipeline = None
try:
    if os.path.exists(MODEL_PATH):
        pipeline = joblib.load(MODEL_PATH)
        print("Model Pipeline successfully loaded into memory!")
    else:
        print(f"Warning: Model file not found at {MODEL_PATH}")
except Exception as e:
    print(f"Error loading model: {e}")

class LoanApplicantPayload(BaseModel):
    annual_income: float
    debt_to_income_ratio: float
    credit_score: int
    loan_amount: float
    interest_rate: float
    gender: str
    marital_status: str
    education_level: str
    employment_status: str
    loan_purpose: str
    grade_subgrade: str

@app.post("/predict")
def predict_loan_risk(data: LoanApplicantPayload):
    if pipeline is None:
        raise HTTPException(status_code=500, detail="Model pipeline is not loaded on server.")

    # Pydantic v2 compatible serialization
    payload_dict = data.model_dump() if hasattr(data, "model_dump") else data.dict()
    input_df = pd.DataFrame([payload_dict])

    prediction = int(pipeline.predict(input_df)[0])
    probabilities = pipeline.predict_proba(input_df)[0]
    
    # Dataset Target: 1 = Paid Back (Approved/Low Risk), 0 = Default (High Risk)
    risk_prob = float(probabilities[0])
    confidence = float(max(probabilities))

    risk_factors = []
    if data.debt_to_income_ratio > 0.25:
        risk_factors.append("Elevated Debt-to-Income vector")
    if data.credit_score < 620:
        risk_factors.append("Lower tier credit rating qualification")
    if data.interest_rate > 15.0:
        risk_factors.append("High interest rate exposure")
    if not risk_factors:
        risk_factors.append("Strong income buffer and low debt profile")

    return {
        "prediction": 1 if prediction == 0 else 0, # 1 = Rejected, 0 = Approved
        "probability_risk": round(risk_prob, 4),
        "confidence_score": round(confidence, 4),
        "model_name": "CreditRisk-Inference-Engine-v2",
        "key_risk_factors": risk_factors
    }