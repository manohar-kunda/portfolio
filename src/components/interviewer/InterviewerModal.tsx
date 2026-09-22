import React from 'react';
import { UserCheck, CheckCircle, ExternalLink, HelpCircle, ArrowRight, Code2 } from 'lucide-react';
import { candidate } from '../../data/candidate';
import { projects } from '../../data/projects';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

interface InterviewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (slug: string) => void;
  onOpenResumeModal: () => void;
}

export const InterviewerModal: React.FC<InterviewerModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onOpenResumeModal
}) => {
  const topicsToAsk = [
    {
      category: 'Java & Object-Oriented Principles',
      bullets: [
        'OOP polymorphism, abstraction, and encapsulation in domain modeling',
        'Java Collections Framework (HashMap bucket collision & resizing, ArrayList vs LinkedList)',
        'Streams API, Functional Interfaces, and exception handling best practices',
        'Multithreading basics, concurrency primitives, and thread safety'
      ]
    },
    {
      category: 'Spring Boot & Backend Engineering',
      bullets: [
        'Inversion of Control (IoC), Dependency Injection, and Spring Bean lifecycles',
        'Spring MVC REST controllers, @Valid DTO validation, and @RestControllerAdvice',
        'Spring Data JPA entity lifecycles, lazy loading pitfalls, and JOIN FETCH optimization',
        '@Transactional boundary propagation and rollback behavior with external API calls'
      ]
    },
    {
      category: 'SQL & Database Architecture',
      bullets: [
        'ACID transactions, isolation levels, and read-phenomena (dirty reads, phantom reads)',
        'Optimistic locking (@Version) vs Pessimistic locking (SELECT FOR UPDATE)',
        '3NF database schema normalization and B-Tree indexing strategies',
        'Flyway version-controlled migration scripts vs dangerous hibernate ddl-auto=update'
      ]
    },
    {
      category: 'Distributed Systems & Reliability Patterns',
      bullets: [
        'Idempotent API design using Idempotency-Key headers and unique constraints',
        'Failure compensation strategies when third-party payment gateways time out',
        'Asynchronous event processing, RabbitMQ queues, and Dead Letter Queues (DLQ)',
        'Strict HTTP timeouts and circuit breakers to prevent thread pool exhaustion'
      ]
    }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="4xl"
      title={
        <div className="flex items-center gap-2 text-blue-400">
          <UserCheck className="w-5 h-5" />
          <span className="text-slate-100 font-bold">Interviewer Fast-Track Lens</span>
        </div>
      }
      subtitle="A 60-second technical summary designed to help technical interviewers and hiring managers immediately evaluate architectural readiness."
    >
      <div className="space-y-6 text-slate-200">
        {/* Quick Position Box */}
        <div className="bg-blue-950/20 p-4 rounded-xl border border-blue-900/40 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-semibold text-sm text-slate-100">
              Candidate: {candidate.name} ({candidate.education.degree})
            </span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
              Available for Hire
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Positioned as a serious early-career Java Full Stack Developer with strong foundations in Spring Boot, PostgreSQL, REST APIs, and defensive distributed systems.
          </p>
        </div>

        {/* What You Can Ask Me About */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-400" />
            What You Can Ask Me About
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topicsToAsk.map((topic, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-2"
              >
                <div className="text-xs font-bold text-blue-300 font-mono pb-1 border-b border-slate-800">
                  {topic.category}
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {topic.bullets.map((b, bidx) => (
                    <li key={bidx} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Worth Discussing */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-blue-400" />
            Projects Worth Discussing
          </h3>
          <div className="space-y-2.5">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-100">{proj.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-blue-300 border border-slate-800">
                      {proj.role}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1 font-mono">
                    Concepts: {proj.engineeringFocus.slice(0, 3).join(' • ')}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectProject(proj.slug);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium cursor-pointer"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Strip */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                onClose();
                onOpenResumeModal();
              }}
            >
              Inspect Resume
            </Button>
            <a href={candidate.links.github} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                Explore GitHub Repositories
              </Button>
            </a>
          </div>

          <a href={`mailto:${candidate.links.email}`}>
            <Button variant="primary" size="sm">
              Schedule Technical Interview
            </Button>
          </a>
        </div>
      </div>
    </Modal>
  );
};
