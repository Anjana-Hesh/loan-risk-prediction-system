import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Sliders } from 'lucide-react';

interface FeatureWeight {
  feature: string;
  weight: number;
}

export const FeatureImportanceChart: React.FC = () => {
  const features: FeatureWeight[] = [
    { feature: 'Credit Rating Grade (grade_subgrade)', weight: 32 },
    { feature: 'Calculated Debt-to-Income (DTI)', weight: 25 },
    { feature: 'Credit Score Benchmark', weight: 19 },
    { feature: 'Interest Rate Vector', weight: 14 },
    { feature: 'Annual Income Scaling', weight: 10 }
  ];

  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-800 mb-4">
        <Sliders className="w-4 h-4 text-cyan-400" />
        <h3 className="text-sm font-bold text-slate-200">Risk Feature Weight Matrix</h3>
      </div>

      <div className="space-y-3">
        {features.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">{item.feature}</span>
              <span className="text-cyan-400 font-mono font-semibold">{item.weight}%</span>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800/80">
              <div
                className="bg-cyan-500 h-full rounded-full"
                style={{ width: `${item.weight}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};