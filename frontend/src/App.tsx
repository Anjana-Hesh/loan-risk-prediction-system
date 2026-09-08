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

    // Initial local evaluation simulation (will connect to backend endpoint)
    setTimeout(() => {
      const isHighRisk = formData.debt_to_income_ratio > 0.25 || formData.credit_score < 600 || formData.interest_rate > 15;

      const newResult: PredictionResult = {
        prediction: isHighRisk ? 1 : 0,
        risk_probability: isHighRisk ? 0.76 : 0.14,
        confidence_score: 0.93,
        debt_to_income_ratio: formData.debt_to_income_ratio,
        timestamp: new Date().toISOString(),
        risk_factors: isHighRisk
          ? ['Elevated Debt-to-Income vector', 'Lower tier credit score qualification']
          : ['Prime credit score qualification', 'Strong income-to-debt ratio']
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