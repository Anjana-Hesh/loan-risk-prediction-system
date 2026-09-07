import React, { useState } from 'react';
import type { LoanFormData, PredictionResult, AssessmentRecord } from './types/loan';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { AssessmentPage } from './pages/AssessmentPage';
import { HistoryPage } from './pages/HistoryPage';
import { ModelMetricsPage } from './pages/ModelMetricsPage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'assessment' | 'history' | 'metrics'>('assessment');
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<AssessmentRecord[]>([]);

  const handleAssessment = (formData: LoanFormData) => {
    setLoading(true);

    // Mock API execution (Spring Boot / FastAPI REST call)
    setTimeout(() => {
      const dti = formData.loan_amnt / formData.person_income;
      const isHighRisk = dti > 0.35 || formData.loan_int_rate > 14;

      const newResult: PredictionResult = {
        prediction: isHighRisk ? 1 : 0,
        risk_probability: isHighRisk ? 0.78 : 0.16,
        confidence_score: 0.94,
        debt_to_income_ratio: dti,
        loan_to_income_ratio: dti,
        model_name: 'XGBoost-V2.1-Ensemble',
        timestamp: new Date().toISOString(),
        risk_factors: isHighRisk
          ? ['Elevated Debt-to-Income ratio (> 35%)', 'Higher risk interest tier (> 14%)']
          : ['Strong income buffer', 'Healthy credit history tenure']
      };

      setResult(newResult);

      const record: AssessmentRecord = {
        ...formData,
        id: crypto.randomUUID(),
        created_at: new Date().toLocaleDateString(),
        result: newResult
      };

      setHistory(prev => [record, ...prev]);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3">
            <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
          </aside>

          <section className="lg:col-span-9">
            {currentTab === 'assessment' && (
              <AssessmentPage onAssess={handleAssessment} loading={loading} result={result} />
            )}
            {currentTab === 'history' && <HistoryPage history={history} />}
            {currentTab === 'metrics' && <ModelMetricsPage />}
          </section>
        </div>
      </main>

      <Footer onNavigate={(tab) => setCurrentTab(tab)} />
    </div>
  );
}