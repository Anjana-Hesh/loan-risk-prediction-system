import React from 'react';
import type { LoanFormData, PredictionResult } from '../types/loan';
import { LoanForm } from '../components/loan/LoanForm';
import { ResultCard } from '../components/loan/ResultCard';

interface AssessmentPageProps {
  onAssess: (data: LoanFormData) => void;
  loading: boolean;
  result: PredictionResult | null;
}

export const AssessmentPage: React.FC<AssessmentPageProps> = ({ onAssess, loading, result }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7">
        <LoanForm onAssess={onAssess} loading={loading} />
      </div>
      <div className="lg:col-span-5 h-full">
        <ResultCard result={result} />
      </div>
    </div>
  );
};