import React, { useState, useEffect } from 'react';
import type { LoanFormData, PredictionResult, AssessmentRecord } from './types/loan';
import { evaluateLoanApplicant, getAssessmentAuditHistory } from './services/api';
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

  // 1. Initial Load: Fetch History from DB via Service
  useEffect(() => {
    getAssessmentAuditHistory()
      .then((data) => setHistory(data))
      .catch((err) => console.warn('Audit history service offline:', err));
  }, []);

  // 2. Submit Assessment via Service
  const handleAssessment = async (formData: LoanFormData) => {
    setLoading(true);

    try {
      const { result: newResult, recordId } = await evaluateLoanApplicant(formData);

      setResult(newResult);

      const newRecord: AssessmentRecord = {
        ...formData,
        id: recordId,
        created_at: new Date().toLocaleDateString(),
        result: newResult,
      };

      setHistory((prev) => [newRecord, ...prev]);
    } catch (error) {
      console.error('Underwriting assessment failed:', error);
      alert('Failed to connect to backend underwriting service. Ensure Spring Boot is running.');
    } finally {
      setLoading(false);
    }
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