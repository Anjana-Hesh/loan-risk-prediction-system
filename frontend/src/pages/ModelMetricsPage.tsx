import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import type { ModelPerformanceMetric } from '../types/loan';
import { Layers, CheckCircle, Database } from 'lucide-react';

export const ModelMetricsPage: React.FC = () => {
  const metrics: ModelPerformanceMetric[] = [
    { metric: 'ROC-AUC Score', score: '0.924', benchmark: 'Target >= 0.85' },
    { metric: 'F1-Score (High Risk)', score: '0.867', benchmark: 'Target >= 0.80' },
    { metric: 'Accuracy', score: '91.8%', benchmark: 'Baseline 81.2%' },
    { metric: 'Inference Latency', score: '18ms', benchmark: '< 50ms REST SLA' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => (
          <GlassCard key={idx} className="p-5">
            <span className="text-xs text-slate-400 block mb-1">{m.metric}</span>
            <p className="text-2xl font-bold text-cyan-400 mb-1">{m.score}</p>
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-400" /> {m.benchmark}
            </span>
          </GlassCard>
        ))}
      </div>

      <GlassCard>
        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
          <Database className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-base font-bold text-slate-100">Engineered Feature Importance Matrix</h3>
            <p className="text-xs text-slate-400">Relative weight assigned by the final XGBoost Classifier</p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {[
            { name: 'Engineered Debt-to-Income (DTI)', weight: 34 },
            { name: 'Loan Interest Rate', weight: 26 },
            { name: 'Annual Income (Log Transformed)', weight: 18 },
            { name: 'Credit History Length', weight: 12 },
            { name: 'Home Ownership Status (Encoded)', weight: 10 },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">{item.name}</span>
                <span className="text-slate-400">{item.weight}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-cyan-500 h-full rounded-full"
                  style={{ width: `${item.weight}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};