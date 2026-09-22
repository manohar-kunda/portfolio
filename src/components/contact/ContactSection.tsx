import React, { useState } from 'react';
import { Mail, Copy, Check, ExternalLink, Send, MapPin, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import { candidate } from '../../data/candidate';
// Button removed

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(candidate.links.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 border-t border-slate-800/80 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/50 text-xs font-mono text-blue-300">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Inquiries</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Let's build something reliable.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Available for full-time Java Full Stack and Backend Engineering roles.
          </p>
        </div>

        <div className="max-w-xl mx-auto space-y-4">
          {/* Email Card with Copy button */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 flex items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                  Primary Email
                </span>
                <span className="text-xs sm:text-sm font-mono text-slate-200 truncate block font-medium">
                  {candidate.links.email}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={copyEmail}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                title="Copy email address"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <a
                href={`mailto:${candidate.links.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium"
              >
                <span>Write</span>
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={candidate.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700 flex items-center justify-between group transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
                    GitHub
                  </div>
                  <div className="text-[11px] font-mono text-slate-500">
                    Source repositories
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
            </a>

            <a
              href={candidate.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700 flex items-center justify-between group transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
                    LinkedIn
                  </div>
                  <div className="text-[11px] font-mono text-slate-500">
                    Professional network
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
            </a>
          </div>

          {/* Location & Status Notice */}
          <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/60 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              {candidate.location}
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {candidate.availability}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
