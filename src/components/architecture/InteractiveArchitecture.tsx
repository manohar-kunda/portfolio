import React, { useState } from 'react';
import { Layers, ShieldCheck, Database, ArrowRight, ArrowDown, Server, Globe, Cpu } from 'lucide-react';

export const InteractiveArchitecture: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(2);

  const steps = [
    {
      id: 0,
      title: '1. Client Ingress',
      subtitle: 'React & Browser Client',
      icon: Globe,
      color: 'blue',
      summary: 'Performs preliminary client-side field validation, attaches Idempotency-Key headers on mutations, and transmits secure JSON over HTTPS.',
      details: [
        'Generates UUID v4 Idempotency-Key for sensitive POST/PUT mutation endpoints',
        'Validates mandatory form constraints before dispatching HTTP network traffic',
        'Intercepts HTTP 401/403/409 responses with contextual user notifications'
      ]
    },
    {
      id: 1,
      title: '2. Transport & Filter',
      subtitle: 'Spring MVC & Validation',
      icon: Server,
      color: 'purple',
      summary: 'Routes incoming HTTP request, validates DTO contracts with Jakarta Bean Validation, and extracts idempotency tokens.',
      details: [
        'Rejects malformed JSON with standardized RFC 7807 Problem Details payloads',
        'OncePerRequestFilter checks idempotency ledger before invoking business controllers',
        'Applies CORS policy and rate-limiting bucket counters'
      ]
    },
    {
      id: 2,
      title: '3. Application Service',
      subtitle: 'Domain Logic & Transactions',
      icon: Cpu,
      color: 'emerald',
      summary: 'Drives business logic within explicit @Transactional boundaries, enforcing domain invariants and orchestrating workflow steps.',
      details: [
        'Enforces transaction rollback on any unchecked Exception',
        'Executes external third-party network calls OUTSIDE of database connection scopes',
        'Guarantees domain invariants (e.g., non-negative inventory balances, valid state transitions)'
      ]
    },
    {
      id: 3,
      title: '4. Persistence & ORM',
      subtitle: 'Spring Data JPA & Hibernate',
      icon: Layers,
      color: 'amber',
      summary: 'Manages entity lifecycles, executes optimized JPQL/SQL queries with JOIN FETCH, and guards against concurrency conflicts via @Version.',
      details: [
        'Optimistic locking (@Version) eliminates lost update race conditions without blocking reads',
        'Explicit JOIN FETCH queries eradicate N+1 query performance degradation',
        'HikariCP connection pool manages active JDBC connections with strict lease timeouts'
      ]
    },
    {
      id: 4,
      title: '5. Relational Engine',
      subtitle: 'PostgreSQL ACID Storage',
      icon: Database,
      color: 'blue',
      summary: 'Guarantees durable ACID transactions, foreign key constraints, B-Tree indexes, and Flyway version-controlled schema migrations.',
      details: [
        'Engine-level CHECK constraints provide the ultimate safety net against bad data',
        'B-Tree indexes on foreign keys and lookup columns maximize query plan efficiency',
        'Flyway maintains versioned SQL scripts (V1, V2) tracked under Git source control'
      ]
    }
  ];

  return (
    <section id="architecture" className="py-16 sm:py-24 border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/50 text-xs font-mono text-blue-300">
            <Layers className="w-3.5 h-3.5" />
            <span>End-to-End Request Flow</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            How a Request Moves Through the System
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            A production-grade request path designed for fault isolation, idempotency, and data consistency.
          </p>
        </div>

        {/* Step Flow Nodes (Horizontal on Desktop, Vertical on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`flex flex-col justify-between p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer relative ${
                  isActive
                    ? 'bg-slate-900 border-blue-500 shadow-lg shadow-blue-950/30'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isActive ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">Step 0{idx + 1}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-100">{step.title}</div>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">{step.subtitle}</div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 text-[11px] font-mono text-blue-400 flex items-center justify-between">
                  <span>{isActive ? 'Inspecting' : 'Click to inspect'}</span>
                  <ArrowRight className="w-3 h-3 hidden md:inline" />
                  <ArrowDown className="w-3 h-3 md:hidden inline" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Inspection Panel */}
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-sm shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
            <div className="flex items-center gap-3">
              {React.createElement(steps[activeStep].icon, {
                className: 'w-6 h-6 text-blue-400'
              })}
              <div>
                <h3 className="text-base font-bold text-slate-100">
                  {steps[activeStep].title} — {steps[activeStep].subtitle}
                </h3>
                <span className="text-xs font-mono text-blue-400">
                  Stage {activeStep + 1} of 5 in Execution Pipeline
                </span>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-400 px-3 py-1 rounded bg-slate-950 border border-slate-800">
              Architectural Layer Focus
            </span>
          </div>

          <div className="mt-5 space-y-4">
            <p className="text-sm text-slate-200 leading-relaxed font-medium bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              {steps[activeStep].summary}
            </p>

            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
                Defensive Engineering Measures
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {steps[activeStep].details.map((detail, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/70 text-xs text-slate-300 flex items-start gap-2.5 leading-relaxed"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
