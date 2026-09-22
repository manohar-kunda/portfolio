import React, { useState } from 'react';
import { Layers, Server, Database, Globe, Cpu, Cloud, CheckCircle2 } from 'lucide-react';

interface StackLayer {
  id: string;
  name: string;
  badge: string;
  icon: React.ElementType;
  technologies: string[];
  role: string;
  responsibility: string;
  patterns: string[];
}

export const InteractiveStack: React.FC = () => {
  const [selectedLayerId, setSelectedLayerId] = useState<string>('backend');

  const stackLayers: StackLayer[] = [
    {
      id: 'frontend',
      name: 'Client Interface Layer',
      badge: 'Presentation',
      icon: Globe,
      technologies: ['React 18', 'TypeScript', 'Tailwind CSS', 'HTML5', 'Modern JavaScript'],
      role: 'Type-safe interactive user interfaces with optimistic client state and validation feedback.',
      responsibility: 'Enforces input formatting before transmission, provides instant UI feedback, and handles API error states gracefully.',
      patterns: ['Component-driven architecture', 'Custom Hooks', 'Strict TypeScript DTO contracts']
    },
    {
      id: 'api',
      name: 'REST API & Transport Layer',
      badge: 'Transport',
      icon: Server,
      technologies: ['Spring MVC', 'RESTful Controllers', 'Jakarta Bean Validation', 'RFC 7807 Problem Details'],
      role: 'Contract-first HTTP endpoints, request routing, payload validation, and standard error mappings.',
      responsibility: 'Ensures strict HTTP status code semantics, validates request DTOs with @Valid, and normalizes exception payloads.',
      patterns: ['Controller-Service-Repository', 'Idempotency Key headers', 'Global Exception Advice']
    },
    {
      id: 'backend',
      name: 'Business Logic & Services',
      badge: 'Core Domain',
      icon: Cpu,
      technologies: ['Java 17/21', 'Spring Boot 3', 'Dependency Injection', '@Transactional Boundaries'],
      role: 'Encapsulates business rules, state machines, domain invariants, and atomic transaction lifecycles.',
      responsibility: 'Coordinates database updates, ensures data invariants (e.g. non-negative inventory), and scopes database connections.',
      patterns: ['SOLID Principles', 'State Machine transitions', 'Compensating transactions', 'Defensive validation']
    },
    {
      id: 'persistence',
      name: 'Persistence & ORM Layer',
      badge: 'Data Access',
      icon: Layers,
      technologies: ['Spring Data JPA', 'Hibernate 6', 'HikariCP Pool', 'Optimistic Locking (@Version)'],
      role: 'Translates domain models to relational storage with atomic transaction control and concurrency safeguards.',
      responsibility: 'Prevents lost updates via optimistic locking (@Version) and prevents performance pitfalls via JOIN FETCH queries.',
      patterns: ['Repository Pattern', 'Optimistic Concurrency Control', 'JOIN FETCH query optimization']
    },
    {
      id: 'database',
      name: 'Relational Database Engine',
      badge: 'Storage',
      icon: Database,
      technologies: ['PostgreSQL 15', 'MySQL 8', 'Flyway Migrations', 'ACID Transactions', 'B-Tree Indexes'],
      role: 'Guarantees durable ACID storage, foreign key integrity, check constraints, and indexed queries.',
      responsibility: 'Acts as the ultimate consistency guarantee: table check constraints prevent corrupt data even if application logic fails.',
      patterns: ['3NF Relational Modeling', 'Version-controlled Flyway migrations', 'Check constraints']
    },
    {
      id: 'infra',
      name: 'DevOps & Infrastructure',
      badge: 'Runtime',
      icon: Cloud,
      technologies: ['Docker', 'Linux CLI', 'AWS Essentials (EC2/RDS)', 'Git & GitHub Actions', 'Maven'],
      role: 'Reproducible local containerization, deterministic builds, and production deployment environments.',
      responsibility: 'Multi-stage Dockerfiles package minimal, secure JRE containers with health check probes (/actuator/health).',
      patterns: ['Multi-stage Docker builds', 'Immutable artifacts', 'Environment variable separation']
    }
  ];

  const activeLayer = stackLayers.find((l) => l.id === selectedLayerId) || stackLayers[2];

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
        <div>
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" />
            Full Stack Engineering Architecture
          </h3>
          <p className="text-xs text-slate-400">
            Click or tap any layer to inspect technologies, responsibilities, and code patterns.
          </p>
        </div>
        <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-blue-950/60 text-blue-400 border border-blue-800/50">
          6-Tier Architecture
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5">
        {/* Layer Selector Column */}
        <div className="lg:col-span-5 flex flex-col gap-2">
          {stackLayers.map((layer) => {
            const Icon = layer.icon;
            const isSelected = layer.id === selectedLayerId;
            return (
              <button
                key={layer.id}
                onClick={() => setSelectedLayerId(layer.id)}
                className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600/15 border-blue-500/80 text-white shadow-sm shadow-blue-900/20'
                    : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold">{layer.name}</div>
                    <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                      {layer.technologies.slice(0, 2).join(' • ')}
                    </div>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                    isSelected
                      ? 'bg-blue-500/30 text-blue-300 border border-blue-400/40'
                      : 'bg-slate-800/80 text-slate-500'
                  }`}
                >
                  {layer.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Layer Details Column */}
        <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-950/80 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <activeLayer.icon className="w-5 h-5 text-blue-400" />
                <h4 className="text-sm font-semibold text-slate-100">{activeLayer.name}</h4>
              </div>
              <span className="text-xs font-mono text-slate-400">{activeLayer.badge}</span>
            </div>

            <div className="mt-4 space-y-3.5">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Technologies & Frameworks
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeLayer.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700/60 text-slate-300 font-mono text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Architectural Role
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{activeLayer.role}</p>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Engineering Responsibility
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">{activeLayer.responsibility}</p>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Key Implemented Patterns
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                  {activeLayer.patterns.map((pattern, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/60 p-2 rounded-lg border border-slate-800/60"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{pattern}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Verified in production projects</span>
            <span className="text-blue-400">Layer {stackLayers.findIndex((l) => l.id === activeLayer.id) + 1} of 6</span>
          </div>
        </div>
      </div>
    </div>
  );
};
