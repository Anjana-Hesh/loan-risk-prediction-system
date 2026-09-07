export interface LoanFormData {
  person_age: number;
  person_income: number;
  person_home_ownership: 'RENT' | 'OWN' | 'MORTGAGE' | 'OTHER';
  person_emp_length: number;
  loan_intent: 'PERSONAL' | 'EDUCATION' | 'MEDICAL' | 'VENTURE' | 'HOMEIMPROVEMENT' | 'DEBTCONSOLIDATION';
  loan_amnt: number;
  loan_int_rate: number;
  cb_person_cred_hist_length: number;
}

export interface PredictionResult {
  prediction: 0 | 1; // 0 = Approved / Low Risk, 1 = Rejected / High Risk
  risk_probability: number;
  confidence_score: number;
  debt_to_income_ratio: number;
  loan_to_income_ratio: number;
  model_name: string;
  timestamp: string;
  risk_factors: string[];
}

export interface AssessmentRecord extends LoanFormData {
  id: string;
  created_at: string;
  result: PredictionResult;
}

export interface ModelPerformanceMetric {
  metric: string;
  score: string;
  benchmark: string;
}