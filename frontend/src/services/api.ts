import type { LoanFormData, PredictionResult, AssessmentRecord } from '../types/loan';

const API_BASE_URL = 'http://localhost:8080/api/v1/loan-assessments';

interface BackendApiResponse<T> {
  status: number;
  message: string;
  data: T;
  timestamp: string;
}

interface AssessmentResponseData {
  id: string;
  prediction: number;
  risk_probability: number;
  confidence_score: number;
  debt_to_income_ratio: number;
  model_name: string;
  timestamp: string;
  risk_factors: string[];
}

interface AssessmentHistoryItem {
  id: string;
  annualIncome: number;
  debtToIncomeRatio: number;
  creditScore: number;
  loanAmount: number;
  interestRate: number;
  gender: string;
  maritalStatus: string;
  educationLevel: string;
  employmentStatus: string;
  loanPurpose: string;
  gradeSubgrade: string;
  predictionVerdict: number;
  riskProbability: number;
  confidenceScore: number;
  assignedModel: string;
  createdAt: string;
}

/**
 * Sends applicant underwriting data to the Spring Boot backend
 */
export const evaluateLoanApplicant = async (formData: LoanFormData): Promise<{ result: PredictionResult; recordId: string }> => {
  const response = await fetch(`${API_BASE_URL}/evaluate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error(`Evaluation failed with status: ${response.status}`);
  }

  const json: BackendApiResponse<AssessmentResponseData> = await response.json();
  const serverData = json.data;

  const result: PredictionResult = {
    prediction: serverData.prediction === 1 ? 1 : 0,
    risk_probability: serverData.risk_probability,
    confidence_score: serverData.confidence_score,
    debt_to_income_ratio: serverData.debt_to_income_ratio,
    timestamp: serverData.timestamp || new Date().toISOString(),
    risk_factors: serverData.risk_factors || [],
  };

  return {
    result,
    recordId: serverData.id,
  };
};

/**
 * Fetches institutional audit history from the backend database
 */
export const getAssessmentAuditHistory = async (): Promise<AssessmentRecord[]> => {
  const response = await fetch(`${API_BASE_URL}/history`);

  if (!response.ok) {
    throw new Error(`Audit history fetch failed with status: ${response.status}`);
  }

  const json: BackendApiResponse<AssessmentHistoryItem[]> = await response.json();
  
  if (!json.data) return [];

  return json.data.map((item) => ({
    id: item.id,
    annual_income: item.annualIncome,
    debt_to_income_ratio: item.debtToIncomeRatio,
    credit_score: item.creditScore,
    loan_amount: item.loanAmount,
    interest_rate: item.interestRate,
    gender: item.gender as AssessmentRecord['gender'],
    marital_status: item.maritalStatus as AssessmentRecord['marital_status'],
    education_level: item.educationLevel as AssessmentRecord['education_level'],
    employment_status: item.employmentStatus as AssessmentRecord['employment_status'],
    loan_purpose: item.loanPurpose as AssessmentRecord['loan_purpose'],
    grade_subgrade: item.gradeSubgrade as AssessmentRecord['grade_subgrade'],
    created_at: new Date(item.createdAt).toLocaleDateString(),
    result: {
      prediction: item.predictionVerdict === 1 ? 1 : 0,
      risk_probability: item.riskProbability,
      confidence_score: item.confidenceScore,
      debt_to_income_ratio: item.debtToIncomeRatio,
      timestamp: item.createdAt,
      risk_factors: item.predictionVerdict === 1
        ? ['Elevated Debt-to-Income vector', 'Lower tier credit rating qualification']
        : ['Prime credit score qualification', 'Strong income buffer and low debt profile'],
    },
  }));
};