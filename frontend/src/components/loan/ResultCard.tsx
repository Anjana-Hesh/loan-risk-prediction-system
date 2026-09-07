import React from 'react';
import type { PredictionResult } from '../../types/loan';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { CheckCircle2, XCircle, ShieldAlert, Cpu } from 'lucide-react';

interface ResultCardProps {
  result: PredictionResult | null;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  if (!result) {
    return (
      <GlassCard className="h-full flex flex-col items-center justify-center text-center p-8 border-dashed">
        <ShieldAlert className="w-12 h-12 text-slate-600 mb-3" />
        <h3 className="text-base font-semibold text-slate-300 mb-1">Awaiting Evaluation Payload</h3>
        <p className="text-xs text-slate-500 max-w-xs">
          Submit the underwriting parameters to run inference against the serialized ML pipeline.
        </p>
      </GlassCard>
    );
  }

  const isApproved = result.prediction === 0;
  const riskPercent = (result.risk_probability * 100).toFixed(1);

  return (
    <GlassCard className="flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Evaluation Output</span>
          <Badge variant={isApproved ? 'success' : 'danger'}>
            {isApproved ? 'Low Default Risk' : 'High Default Risk'}
          </Badge>
        </div>

        <div className="flex items-center gap-4 mb-6">
          {isApproved ? (
            <CheckCircle2 className="w-14 h-14 text-emerald-400 shrink-0" />
          ) : (
            <XCircle className="w-14 h-14 text-rose-400 shrink-0" />
          )}
          <div>
            <h3 className="text-2xl font-black text-slate-100">
              {isApproved ? 'Approved' : 'Rejected'}
            </h3>
            <p className="text-xs text-slate-400">
              {isApproved ? 'Meets automated underwriting risk policy.' : 'Exceeds permissible probability of default threshold.'}
            </p>
          </div>
        </div>

        <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 mb-5">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-slate-400">Estimated Default Probability</span>
            <span className={`font-bold ${isApproved ? 'text-emerald-400' : 'text-rose-400'}`}>
              {riskPercent}%
            </span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                isApproved ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-amber-500 to-rose-500'
              }`}
              style={{ width: `${riskPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
            <span className="text-[11px] text-slate-400 block mb-0.5">Engineered DTI</span>
            <span className="text-sm font-bold text-slate-200">
              {(result.debt_to_income_ratio * 100).toFixed(1)}%
            </span>
          </div>
          <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
            <span className="text-[11px] text-slate-400 block mb-0.5">Model Confidence</span>
            <span className="text-sm font-bold text-cyan-400">
              {(result.confidence_score * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        {result.risk_factors.length > 0 && (
          <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/60 mb-2">
            <span className="text-[11px] font-semibold text-slate-400 block mb-2">Key Factor Explanations:</span>
            <ul className="space-y-1">
              {result.risk_factors.map((f, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" /> {result.model_name}
        </span>
        <span>{new Date(result.timestamp).toLocaleTimeString()}</span>
      </div>
    </GlassCard>
  );
};