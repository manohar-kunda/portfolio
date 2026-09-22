import React, { useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import { engineeringScenarios } from '../../data/engineeringScenarios';
import { CodeSnippet } from '../common/CodeSnippet';

export const EngineeringMindset: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(engineeringScenarios[0].id);

  const activeScenario =
    engineeringScenarios.find((s) => s.id === selectedScenarioId) || engineeringScenarios[0];

  return (
    <section id="mindset" className="py-16 sm:py-24 border-t border-slate-800/80 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/50 text-xs font-mono text-amber-300">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Defensive System Design</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            I don't just build features. I think about what happens when they fail.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Real engineering begins when requests are duplicated, networks drop packets, databases lock, or services crash.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Scenarios Selector List */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            {engineeringScenarios.map((sc, idx) => {
              const isSelected = sc.id === selectedScenarioId;
              return (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScenarioId(sc.id)}
                  className={`p-4 rounded-xl border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-900 border-blue-500 shadow-md shadow-blue-950/30'
                      : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5 ${
                        isSelected ? 'bg-blue-600 text-white font-bold' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-slate-100 leading-snug">
                        {sc.question}
                      </div>
                      <div className="text-[11px] font-mono text-blue-400 mt-1">
                        Concept: {sc.engineeringConcept}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Scenario & Solution Card */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between backdrop-blur-sm shadow-xl">
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-800 flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1">
                    Failure Scenario Under Scrutiny
                  </span>
                  <h3 className="text-base font-bold text-slate-100">{activeScenario.question}</h3>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-blue-950/60 text-blue-300 border border-blue-800/40 shrink-0">
                  {activeScenario.engineeringConcept}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1 font-semibold">
                  The Real-World Problem
                </span>
                <p className="text-xs sm:text-sm text-slate-300 bg-red-950/20 p-3.5 rounded-xl border border-red-900/30 leading-relaxed">
                  {activeScenario.scenario}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1 font-semibold">
                  How I Handle It in Code & Architecture
                </span>
                <p className="text-xs sm:text-sm text-slate-200 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 leading-relaxed font-medium">
                  {activeScenario.howIHandleIt}
                </p>
              </div>

              {activeScenario.codeSnippet && (
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1 font-semibold">
                    Architectural Implementation Pattern ({activeScenario.snippetLanguage})
                  </span>
                  <CodeSnippet
                    code={activeScenario.codeSnippet}
                    language={activeScenario.snippetLanguage}
                    showLineNumbers={true}
                  />
                </div>
              )}
            </div>

            <div className="pt-4 mt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Ready for technical whiteboard discussion</span>
              <span className="text-blue-400">Zero hand-waving claims</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
