import React, { useState } from 'react';
import type { LoanFormData } from '../../types/loan';
import { Send, RotateCcw, AlertCircle } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

interface LoanFormProps {
  onAssess: (data: LoanFormData) => void;
  loading: boolean;
}

const defaultValues: LoanFormData = {
  person_age: 29,
  person_income: 75000,
  person_home_ownership: 'RENT',
  person_emp_length: 5,
  loan_intent: 'PERSONAL',
  loan_amnt: 12000,
  loan_int_rate: 10.5,
  cb_person_cred_hist_length: 4,
};

export const LoanForm: React.FC<LoanFormProps> = ({ onAssess, loading }) => {
  const [formData, setFormData] = useState<LoanFormData>(defaultValues);
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['person_home_ownership', 'loan_intent'].includes(name) ? value : Number(value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.person_age < 18) {
      setError('Applicant must be at least 18 years old.');
      return;
    }
    if (formData.loan_amnt <= 0) {
      setError('Loan amount must be greater than zero.');
      return;
    }
    
    onAssess(formData);
  };

  return (
    <GlassCard>
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-100">Applicant Parameters</h2>
          <p className="text-xs text-slate-400">Underwriting vector inputs for inference engine</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setFormData(defaultValues);
            setError('');
          }}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 transition"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Age</label>
            <input
              type="number"
              name="person_age"
              value={formData.person_age}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Annual Income ($)</label>
            <input
              type="number"
              name="person_income"
              value={formData.person_income}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Home Ownership</label>
            <select
              name="person_home_ownership"
              value={formData.person_home_ownership}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition"
            >
              <option value="RENT">Rent</option>
              <option value="OWN">Own</option>
              <option value="MORTGAGE">Mortgage</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Employment Length (Years)</label>
            <input
              type="number"
              name="person_emp_length"
              value={formData.person_emp_length}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Loan Intent</label>
            <select
              name="loan_intent"
              value={formData.loan_intent}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition"
            >
              <option value="PERSONAL">Personal</option>
              <option value="EDUCATION">Education</option>
              <option value="MEDICAL">Medical</option>
              <option value="VENTURE">Venture</option>
              <option value="HOMEIMPROVEMENT">Home Improvement</option>
              <option value="DEBTCONSOLIDATION">Debt Consolidation</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Requested Loan Amount ($)</label>
            <input
              type="number"
              name="loan_amnt"
              value={formData.loan_amnt}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Interest Rate (%)</label>
            <input
              type="number"
              step="0.1"
              name="loan_int_rate"
              value={formData.loan_int_rate}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Credit History Length (Years)</label>
            <input
              type="number"
              name="cb_person_cred_hist_length"
              value={formData.cb_person_cred_hist_length}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition"
              required
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              Computing Risk Vectors...
            </span>
          ) : (
            <>
              <Send className="w-4 h-4" /> Evaluate Applicant
            </>
          )}
        </button>
      </form>
    </GlassCard>
  );
};