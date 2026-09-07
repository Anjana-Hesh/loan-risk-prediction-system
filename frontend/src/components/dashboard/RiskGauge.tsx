import React from 'react';
import { GlassCard } from '../ui/GlassCard';

interface RiskGaugeProps {
  probability: number; // 0.0 to 1.0
  confidence: number;  // 0.0 to 1.0
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ probability, confidence }) => {
  const percentage = Math.round(probability * 100);
  const isHighRisk = percentage > 40;

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <h3 className="text-sm font-bold text-slate-200">Risk Exposure Gauge</h3>
        <span className="text-xs text-slate-400 font-mono">Confidence: {(confidence * 100).toFixed(0)}%</span>
      </div>

      <div className="flex flex-col items-center justify-center my-4">
        <div className="relative flex items-center justify-center">
          <div className={`text-4xl font-black ${isHighRisk ? 'text-rose-400' : 'text-emerald-400'}`}>
            {percentage}%
          </div>
        </div>
        <span className="text-xs font-medium text-slate-400 mt-2">
          {isHighRisk ? 'High Probability of Default' : 'Low Probability of Default'}
        </span>
      </div>

      <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-800 p-0.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            isHighRisk ? 'bg-gradient-to-r from-amber-500 to-rose-500' : 'bg-gradient-to-r from-teal-400 to-emerald-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
        <span>0% (Safe)</span>
        <span>40% (Threshold)</span>
        <span>100% (Critical)</span>
      </div>
    </GlassCard>
  );
};