import React, { useState } from 'react';
import { Cpu, Server, Database, Layout, ShieldCheck, Cloud, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { skillCategories } from '../../data/candidate';

export const SkillsMatrix: React.FC = () => {
  const [expandedIndices, setExpandedIndices] = useState<number[]>([0, 1]);

  const toggleCategory = (idx: number) => {
    if (expandedIndices.includes(idx)) {
      setExpandedIndices(expandedIndices.filter((i) => i !== idx));
    } else {
      setExpandedIndices([...expandedIndices, idx]);
    }
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Server':
        return Server;
      case 'Database':
        return Database;
      case 'Layout':
        return Layout;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Cloud':
        return Cloud;
      default:
        return Cpu;
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-24 border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/50 text-xs font-mono text-blue-300">
            <Cpu className="w-3.5 h-3.5" />
            <span>Engineering Competencies</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            How I Build Software: Verified Technical Depth
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Concrete knowledge areas and practical engineering uses. Zero arbitrary percentage bars.
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {skillCategories.map((category, idx) => {
            const Icon = getIcon(category.iconName);
            const isExpanded = expandedIndices.includes(idx);
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all duration-200"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleCategory(idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-slate-900/90 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-100">{category.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{category.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline text-[11px] font-mono text-slate-500">
                      {category.skills.length} core areas
                    </span>
                    <div className="p-1 rounded bg-slate-800 text-slate-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {/* Expanded Subtopics Grid */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-800/80 space-y-4 bg-slate-950/40">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      {category.skills.map((skill, sidx) => (
                        <div
                          key={sidx}
                          className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 flex flex-col justify-between"
                        >
                          <div>
                            <div className="text-xs font-bold text-blue-300 pb-2 border-b border-slate-800/80 font-mono">
                              {skill.name}
                            </div>
                            <ul className="mt-2.5 space-y-1.5 text-xs text-slate-300">
                              {skill.subtopics.map((topic, tidx) => (
                                <li key={tidx} className="flex items-start gap-2">
                                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                                  <span className="leading-snug">{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-3 pt-2.5 border-t border-slate-900 text-[11px] text-slate-400">
                            <span className="text-slate-500 font-mono">Application: </span>
                            {skill.practicalUse}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
