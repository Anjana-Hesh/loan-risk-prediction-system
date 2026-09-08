import React from 'react';
import type { AssessmentRecord } from '../types/loan';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { FileDown } from 'lucide-react';

interface HistoryPageProps {
  history: AssessmentRecord[];
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ history }) => {
  return (
    <GlassCard>
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-100">Audit & Assessment Logs</h2>
          <p className="text-xs text-slate-400">Persisted historical underwriting evaluations</p>
        </div>
        <button className="text-xs text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-cyan-500/20 transition">
          <FileDown className="w-3.5 h-3.5" /> Export Logs
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="p-3">Audit ID</th>
              <th className="p-3">Annual Income</th>
              <th className="p-3">Loan Amount</th>
              <th className="p-3">Credit Score</th>
              <th className="p-3">Grade</th>
              <th className="p-3">Risk Probability</th>
              <th className="p-3">Verdict</th>
              <th className="p-3">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {history.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-slate-500">
                  No underwriting logs recorded yet.
                </td>
              </tr>
            ) : (
              history.map((item) => {
                const isApproved = item.result.prediction === 0;
                return (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition">
                    <td className="p-3 font-mono text-slate-400">{item.id.slice(0, 8)}...</td>
                    <td className="p-3 font-medium text-slate-100">${item.annual_income.toLocaleString()}</td>
                    <td className="p-3">${item.loan_amount.toLocaleString()}</td>
                    <td className="p-3 font-mono">{item.credit_score}</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-slate-800 font-mono">{item.grade_subgrade}</span></td>
                    <td className="p-3 font-bold font-mono">{(item.result.risk_probability * 100).toFixed(1)}%</td>
                    <td className="p-3">
                      <Badge variant={isApproved ? 'success' : 'danger'}>
                        {isApproved ? 'Approved' : 'Rejected'}
                      </Badge>
                    </td>
                    <td className="p-3 text-slate-400">{item.created_at}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};