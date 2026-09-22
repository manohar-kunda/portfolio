import React, { useState, useEffect } from 'react';
import { Search, ExternalLink, ArrowRight, Code2, Layers, ShieldAlert, Cpu, FileText, UserCheck, X } from 'lucide-react';
import { projects } from '../../data/projects';
import { candidate } from '../../data/candidate';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (slug: string) => void;
  onOpenInterviewerModal: () => void;
  onOpenResumeModal: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onOpenInterviewerModal,
  onOpenResumeModal
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProjects = projects.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.technologies.some((t) => t.toLowerCase().includes(q)) ||
      p.engineeringFocus.some((f) => f.toLowerCase().includes(q)) ||
      p.tagline.toLowerCase().includes(q)
    );
  });

  const navigationActions = [
    { label: 'Jump to Projects', href: '#projects', icon: Code2 },
    { label: 'Explore Interactive Architecture', href: '#architecture', icon: Layers },
    { label: 'Engineering Mindset (Failure Scenarios)', href: '#mindset', icon: ShieldAlert },
    { label: 'Technical Skills Matrix', href: '#skills', icon: Cpu },
    { label: 'Candidate Story & Background', href: '#about', icon: FileText }
  ].filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-950">
          <Search className="w-4 h-4 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Type a project, tech, or concept (e.g. idempotency, kafka, postgres)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none"
          />
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4">
          {/* Quick Actions */}
          <div>
            <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-500">
              Quick Actions
            </div>
            <div className="mt-1 space-y-1">
              <button
                onClick={() => {
                  onClose();
                  onOpenInterviewerModal();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-blue-300 hover:bg-blue-950/50 hover:text-blue-200 transition-colors group text-left"
              >
                <div className="flex items-center gap-2.5">
                  <UserCheck className="w-4 h-4 text-blue-400" />
                  <span>Open "For Interviewers" Quick Lens</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenResumeModal();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors group text-left"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span>View Resume</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Projects */}
          <div>
            <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-500">
              Projects ({filteredProjects.length})
            </div>
            <div className="mt-1 space-y-1">
              {filteredProjects.length === 0 ? (
                <div className="px-3 py-2 text-xs text-slate-500">No matching projects found.</div>
              ) : (
                filteredProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onClose();
                      onSelectProject(p.slug);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors group text-left"
                  >
                    <div>
                      <div className="font-medium text-slate-100 group-hover:text-blue-400">{p.title}</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {p.technologies.slice(0, 4).join(' • ')}
                      </div>
                    </div>
                    <span className="text-[11px] text-blue-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                      Case Study →
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Navigation */}
          {navigationActions.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-500">
                Navigation
              </div>
              <div className="mt-1 space-y-1">
                {navigationActions.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={onClose}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-slate-400" />
                        <span>{item.label}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* External Links */}
          <div>
            <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-500">
              Profiles
            </div>
            <div className="mt-1 space-y-1">
              <a
                href={candidate.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <span>GitHub Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
              <a
                href={candidate.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Navigate with mouse or arrows</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
