import React from 'react';
import { FileText, Download, GraduationCap, Briefcase, Code } from 'lucide-react';
import { candidate } from '../../data/candidate';
import { Modal } from '../common/Modal';
// Button removed

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="4xl"
      title={
        <div className="flex items-center gap-2 text-slate-100">
          <FileText className="w-5 h-5 text-blue-400" />
          <span>Curriculum Vitae / Resume</span>
        </div>
      }
      subtitle={`${candidate.name} — ${candidate.role}`}
    >
      <div className="space-y-6 text-slate-200">
        {/* Action bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Updated for 2026 Opportunities</span>
            <span>•</span>
            <span>{candidate.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${candidate.links.email}?subject=Resume Request - ${candidate.name}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Structured Resume Content */}
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-950/50 space-y-6">
          {/* Header */}
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-white tracking-tight">{candidate.name}</h2>
            <p className="text-sm font-mono text-blue-400 mt-0.5">{candidate.role}</p>
            <p className="text-xs text-slate-400 mt-2 max-w-2xl leading-relaxed">
              {candidate.positioningStatement}
            </p>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              Academic Foundation
            </h3>
            <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/60 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-bold text-slate-100">{candidate.education.degree}</span>
                <span className="text-xs font-mono text-slate-400">{candidate.education.duration}</span>
              </div>
              <p className="text-xs text-slate-300">{candidate.education.field}</p>
              <div className="pt-2 border-t border-slate-800/60">
                <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                  Core Foundations
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.education.coreSubjects.map((sub, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Core Technical Capabilities */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
              <Code className="w-4 h-4 text-blue-400" />
              Technical Capabilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/50 space-y-1">
                <span className="font-bold text-blue-300 font-mono block">Backend & Java</span>
                <p className="text-slate-400 leading-relaxed">
                  Java 17/21, Spring Boot 3, Spring Data JPA, Hibernate, REST APIs, Bean Validation, Problem Details.
                </p>
              </div>
              <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/50 space-y-1">
                <span className="font-bold text-blue-300 font-mono block">Databases & Migrations</span>
                <p className="text-slate-400 leading-relaxed">
                  PostgreSQL, MySQL, Flyway migrations, ACID transactions, Optimistic Locking, B-Tree indexes.
                </p>
              </div>
              <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/50 space-y-1">
                <span className="font-bold text-blue-300 font-mono block">Frontend & UI</span>
                <p className="text-slate-400 leading-relaxed">
                  React 18, TypeScript, JavaScript ES6+, Tailwind CSS, HTML5, Accessible design.
                </p>
              </div>
              <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/50 space-y-1">
                <span className="font-bold text-blue-300 font-mono block">Engineering & DevOps</span>
                <p className="text-slate-400 leading-relaxed">
                  JUnit 5, Mockito, Docker containerization, Git/GitHub, Linux CLI, AWS basics.
                </p>
              </div>
            </div>
          </div>

          {/* Project Highlights */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-400" />
              Featured Engineering Projects
            </h3>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/50">
                <div className="font-bold text-xs text-slate-100">
                  Enterprise Inventory, Warehouse & Procurement Platform
                </div>
                <div className="text-[11px] font-mono text-blue-400 mt-0.5">
                  Spring Boot 3 • PostgreSQL • Flyway • React • Docker
                </div>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  Engineered multi-warehouse inventory tracking with JPA @Version optimistic locking, composite check constraints, and Flyway schema migrations preventing negative inventory states.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/50">
                <div className="font-bold text-xs text-slate-100">
                  Order Processing & Transaction Engine
                </div>
                <div className="text-[11px] font-mono text-blue-400 mt-0.5">
                  Spring Boot 3 • Idempotency • Transaction Scoping • PostgreSQL
                </div>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  Implemented idempotent API endpoints via Idempotency-Key headers and intent-first persistence, ensuring external payment failures never orphan orders or tie up DB connections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
