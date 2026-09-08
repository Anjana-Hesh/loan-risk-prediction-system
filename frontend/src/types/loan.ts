export interface LoanFormData {
  annual_income: number;
  debt_to_income_ratio: number;
  credit_score: number;
  loan_amount: number;
  interest_rate: number;
  gender: 'Female' | 'Male' | 'Other';
  marital_status: 'Single' | 'Married' | 'Divorced' | 'Widowed';
  education_level: 'High School' | "Bachelor's" | "Master's" | 'PhD' | 'Other';
  employment_status: 'Employed' | 'Self-employed' | 'Unemployed' | 'Retired' | 'Student';
  loan_purpose: 'Debt consolidation' | 'Car' | 'Home' | 'Education' | 'Business' | 'Medical' | 'Vacation' | 'Other';
  grade_subgrade: string;
}

export interface PredictionResult {
  prediction: 0 | 1; // 0 = Approved (Low Risk), 1 = Rejected (High Risk)
  risk_probability: number;
  confidence_score: number;
  debt_to_income_ratio: number;
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