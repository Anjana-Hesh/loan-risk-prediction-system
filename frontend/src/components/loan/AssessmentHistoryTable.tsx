import React, { useState } from 'react';
import type { AssessmentRecord } from '../../types/loan';
import { Badge } from '../ui/Badge';
import { Search, FileSpreadsheet, Eye } from 'lucide-react';

interface AssessmentHistoryTableProps {
  records: AssessmentRecord[];
  onSelectRecord?: (record: AssessmentRecord) => void;
}

export const AssessmentHistoryTable: React.FC<AssessmentHistoryTableProps> = ({
  records,
  onSelectRecord
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = records.filter(r =>
    r.loan_intent.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by intent or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="text-xs text-slate-400">
          Showing <span className="text-cyan-400 font-semibold">{filteredRecords.length}</span> recorded evaluations
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/40">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-3.5">Audit Hash</th>
              <th className="p-3.5">Applicant Income</th>
              <th className="p-3.5">Loan Amount</th>
              <th className="p-3.5">Intent</th>
              <th className="p-3.5">Calculated DTI</th>
              <th className="p-3.5">Risk Probability</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {filteredRecords.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-slate-500">
                  No evaluation records matching criteria.
                </td>
              </tr>
            ) : (
              filteredRecords.map((r) => {
                const isApproved = r.result.prediction === 0;
                return (
                  <tr key={r.id} className="hover:bg-slate-900/50 transition">
                    <td className="p-3.5 font-mono text-slate-400">{r.id.slice(0, 8)}</td>
                    <td className="p-3.5 font-medium text-slate-100">${r.person_income.toLocaleString()}</td>
                    <td className="p-3.5">${r.loan_amnt.toLocaleString()}</td>
                    <td className="p-3.5 text-slate-300">{r.loan_intent}</td>
                    <td className="p-3.5 font-mono">{(r.result.debt_to_income_ratio * 100).toFixed(1)}%</td>
                    <td className="p-3.5 font-bold font-mono">{(r.result.risk_probability * 100).toFixed(1)}%</td>
                    <td className="p-3.5">
                      <Badge variant={isApproved ? 'success' : 'danger'}>
                        {isApproved ? 'Approved' : 'Rejected'}
                      </Badge>
                    </td>
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => onSelectRecord && onSelectRecord(r)}
                        className="text-cyan-400 hover:text-cyan-300 p-1 rounded-lg hover:bg-slate-800 transition"
                        title="View Audit Record"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};