import React from 'react';
import { ShieldAlert, Mail, Phone, MapPin, ExternalLink, GitFork, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate?: (tab: 'assessment' | 'history' | 'metrics') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-850 bg-slate-950/90 backdrop-blur-2xl text-slate-400 mt-20 transition-colors">
      <div className="border-b border-slate-850/80 py-3 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-emerald-400 font-semibold">TechJitters Enterprise v2.4</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">High-Precision Automated Credit Underwriting Console</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 256-Bit Encrypted Audit Logs
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-black tracking-wider text-slate-100 uppercase">
                  TechJitters
                </h3>
                <p className="text-[11px] text-cyan-400 font-medium">
                  Automated Credit Solutions
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Providing modern enterprise decisioning architectures and real-time applicant risk evaluation platforms. Built for high reliability and compliant credit underwriting workflows.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/Anjana-Hesh/loan-risk-prediction-system.git"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 transition"
              >
                <GitFork className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/anjana-heshan-79334b260/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 transition"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              Platform Modules
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('assessment')}
                  className="hover:text-cyan-400 transition"
                >
                  Applicant Underwriting
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('history')}
                  className="hover:text-cyan-400 transition"
                >
                  Audit History Logs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('metrics')}
                  className="hover:text-cyan-400 transition"
                >
                  Performance Analytics
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              Policy Standards
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Fair Credit Compliance</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Automated DTI Calculation</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Audit Trail Integrity</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              Support & Contact
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-slate-500">Corporate Inquiries</span>
                  <a href="mailto:contact@techjitters.com" className="text-slate-300 hover:text-cyan-400 transition">
                    contact@techjitters.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-slate-500">Hotline</span>
                  <span className="text-slate-300 font-mono">+94 77 218 4920</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-slate-500">Location</span>
                  <span className="text-slate-300">Colombo / Galle, Sri Lanka</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-slate-850 py-5 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} TechJitters Solutions. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer transition">Risk Security Policy</span>
            <span className="hover:text-slate-400 cursor-pointer transition">Compliance Audit</span>
          </div>
        </div>
      </div>
    </footer>
  );
};