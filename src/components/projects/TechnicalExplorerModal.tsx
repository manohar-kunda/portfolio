import React, { useState } from 'react';
import { 
  FileText, 
  Layers, 
  Network, 
  Database, 
  Compass, 
  AlertTriangle, 
  CheckCircle, 
  Server, 
  HelpCircle,
  ExternalLink,
  Check,
  ArrowRight
} from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import type { Project } from '../../types/project';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { CodeSnippet } from '../common/CodeSnippet';


interface TechnicalExplorerModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  initialTab?: string;
}

export const TechnicalExplorerModal: React.FC<TechnicalExplorerModalProps> = ({
  project,
  isOpen,
  onClose,
  initialTab = 'overview'
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  if (!project) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'architecture', label: 'Architecture', icon: Layers },
    { id: 'api', label: 'API Design', icon: Network },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'decisions', label: 'Decisions', icon: Compass },
    { id: 'challenges', label: 'Challenges', icon: AlertTriangle },
    { id: 'testing', label: 'Testing', icon: CheckCircle },
    { id: 'deployment', label: 'Deployment', icon: Server },
    { id: 'qa', label: 'Interviewer Q&A', icon: HelpCircle }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="5xl"
      title={
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-lg font-bold text-slate-100">{project.title}</span>
          <Badge variant="blue" size="sm">
            {project.role}
          </Badge>
          <Badge
            variant={project.status === 'Completed' ? 'emerald' : 'amber'}
            size="sm"
          >
            {project.status}
          </Badge>
        </div>
      }
      subtitle={project.tagline}
    >
      {/* Tab Navigation Strip */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-900/40'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Panes */}
      <div className="mt-6 text-slate-200">
        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                Problem Statement
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                {project.problemStatement}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                Engineering Solution
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                {project.solutionSummary}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                Why I Built This Project
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed bg-blue-950/20 p-4 rounded-xl border border-blue-900/40 text-blue-200/90">
                {project.whyIBuiltThis}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                  Target Users
                </h4>
                <ul className="space-y-1.5">
                  {project.targetUsers.map((user, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>{user}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                  Verified Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700/60 font-mono text-[11px] text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-medium border border-slate-700"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View Repository on GitHub</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium border border-blue-500"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Application Demo</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* 2. ARCHITECTURE TAB */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-mono uppercase text-slate-500">Pattern</span>
                <span className="text-xs font-mono text-blue-400 font-semibold">{project.architecture.pattern}</span>
              </div>
              <p className="text-sm text-slate-300 mt-2.5 leading-relaxed">
                {project.architecture.overview}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">
                Architectural Layers & Boundaries
              </h4>
              <div className="space-y-3">
                {project.architecture.layers.map((layer, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-blue-900/60 text-blue-300 font-mono text-[11px] flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-100">{layer.name}</span>
                      </div>
                      <div className="flex gap-1">
                        {layer.technologies.map((t, tidx) => (
                          <span
                            key={tidx}
                            className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 font-mono text-[10px] border border-slate-800"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 font-medium mt-2">{layer.role}</p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{layer.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">
                Defensive Request Lifecycle Steps
              </h4>
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
                {project.architecture.requestFlowSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-slate-300">
                    <span className="w-5 h-5 rounded bg-slate-900 text-blue-400 font-mono text-[11px] flex items-center justify-center shrink-0 border border-slate-800">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5 leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. API DESIGN TAB */}
        {activeTab === 'api' && (
          <div className="space-y-6">
            {!project.apiDesign || project.apiDesign.length === 0 ? (
              <p className="text-xs text-slate-400">API endpoints not required or client-only project.</p>
            ) : (
              project.apiDesign.map((endpoint, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl border border-slate-800 bg-slate-950/70 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`px-2.5 py-0.5 rounded font-mono font-bold text-xs ${
                          endpoint.method === 'GET'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : endpoint.method === 'POST'
                            ? 'bg-blue-950 text-blue-400 border border-blue-800'
                            : endpoint.method === 'PUT'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : endpoint.method === 'PATCH'
                            ? 'bg-purple-950 text-purple-400 border border-purple-800'
                            : 'bg-red-950 text-red-400 border border-red-800'
                        }`}
                      >
                        {endpoint.method}
                      </span>
                      <span className="font-mono text-xs sm:text-sm text-slate-200 font-semibold">
                        {endpoint.path}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {endpoint.idempotent && (
                        <span className="px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/40 text-[10px] font-mono">
                          Idempotent
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300">{endpoint.summary}</p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {endpoint.requestBodySnippet && (
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                          Request Body (JSON)
                        </span>
                        <CodeSnippet
                          code={endpoint.requestBodySnippet}
                          language="json"
                          showLineNumbers={false}
                        />
                      </div>
                    )}
                    {endpoint.responseSnippet && (
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                          Expected Response (JSON)
                        </span>
                        <CodeSnippet
                          code={endpoint.responseSnippet}
                          language="json"
                          showLineNumbers={false}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    <span className="text-[11px] font-mono text-slate-500 mr-1">Status Codes:</span>
                    {endpoint.statusCodes.map((sc, scIdx) => (
                      <span
                        key={scIdx}
                        className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300"
                      >
                        {sc}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* 4. DATABASE TAB */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            {!project.databaseDesign ? (
              <p className="text-xs text-slate-400">Database design details not applicable.</p>
            ) : (
              <>
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-mono uppercase text-slate-500">Database Engine</span>
                    <span className="text-xs font-mono text-blue-400 font-bold">
                      {project.databaseDesign.engine}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    {project.databaseDesign.rationale}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">
                    Relational Tables & Constraints
                  </h4>
                  <div className="space-y-3">
                    {project.databaseDesign.tables.map((table, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-2"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
                          <span className="font-mono text-xs font-bold text-blue-300">
                            {table.tableName}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">
                            PK: {table.primaryKey}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300">{table.purpose}</p>

                        <div className="mt-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                            Key Columns & Types
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {table.keyColumns.map((col, cidx) => (
                              <span
                                key={cidx}
                                className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300"
                              >
                                {col}
                              </span>
                            ))}
                          </div>
                        </div>

                        {table.relationships && (
                          <div className="text-[11px] text-slate-400 font-mono mt-1 pt-1 border-t border-slate-900">
                            <span className="text-slate-500">Relations: </span>
                            {table.relationships}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {project.databaseDesign.indexingAndConstraints && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                      Engine-Level Indexes & Invariant Constraints
                    </h4>
                    <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1.5 font-mono text-xs text-slate-300">
                      {project.databaseDesign.indexingAndConstraints.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* 5. DECISIONS TAB */}
        {activeTab === 'decisions' && (
          <div className="space-y-4">
            {project.engineeringDecisions.map((decision, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-slate-800 bg-slate-950/70 space-y-3"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-blue-300 pb-2 border-b border-slate-800">
                  <Compass className="w-4 h-4 text-blue-400" />
                  <span>{decision.topic}</span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                    Chosen Solution & Rationale
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                    {decision.chosenApproach}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {decision.whyChosen}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                      Alternatives Rejected
                    </span>
                    <ul className="space-y-1 text-xs text-slate-400">
                      {decision.alternativesConsidered.map((alt, aidx) => (
                        <li key={aidx} className="flex items-start gap-1.5">
                          <span className="text-slate-600 font-bold">•</span>
                          <span>{alt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                      Architectural Trade-Offs
                    </span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {decision.tradeOffs}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 6. CHALLENGES TAB */}
        {activeTab === 'challenges' && (
          <div className="space-y-4">
            {project.challenges.map((challenge, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-slate-800 bg-slate-950/70 space-y-3"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 pb-2 border-b border-slate-800">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>{challenge.title}</span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-0.5">
                    Failure Scenario Observed
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed bg-red-950/20 p-3 rounded-lg border border-red-900/30">
                    {challenge.scenario}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-0.5">
                    Root Cause Analysis
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {challenge.rootCause}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-0.5">
                    Engineering Solution Implemented
                  </span>
                  <p className="text-xs text-emerald-300 leading-relaxed bg-emerald-950/20 p-3 rounded-lg border border-emerald-900/30">
                    {challenge.solutionImplemented}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 7. TESTING TAB */}
        {activeTab === 'testing' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/70">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                  Unit Testing (JUnit 5 & Mockito)
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.testing.unitTesting}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/70">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                  Integration & Slice Tests (@DataJpaTest)
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.testing.integrationTesting}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                Validated Failure & Business Scenarios
              </h4>
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
                {project.testing.validationScenarios.map((sc, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{sc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 8. DEPLOYMENT & LESSONS TAB */}
        {activeTab === 'deployment' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-800">
                Deployment & Build Lifecycle
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px] font-mono">Runtime:</span>
                  <span className="text-slate-200 font-mono">{project.deployment.runtimeEnvironment}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px] font-mono">Build System:</span>
                  <span className="text-slate-200 font-mono">{project.deployment.buildSystem}</span>
                </div>
                {project.deployment.containerization && (
                  <div>
                    <span className="text-slate-500 block text-[11px] font-mono">Container:</span>
                    <span className="text-slate-200 font-mono">{project.deployment.containerization}</span>
                  </div>
                )}
                {project.deployment.ciCdWorkflow && (
                  <div>
                    <span className="text-slate-500 block text-[11px] font-mono">CI/CD:</span>
                    <span className="text-slate-200 font-mono">{project.deployment.ciCdWorkflow}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                Engineering Lessons Learned
              </h4>
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
                {project.lessonsLearned.map((lesson, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{lesson}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                What I Would Improve Next (Engineering Maturity)
              </h4>
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
                {project.whatIWouldImproveNext.map((improvement, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                    <span className="leading-relaxed">{improvement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 9. INTERVIEWER Q&A TAB */}
        {activeTab === 'qa' && (
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-900/50 text-xs text-blue-300">
              These technical questions reflect actual architectural discussions a Java/Spring Boot interviewer or Senior Software Engineer might ask about this specific project.
            </div>

            {project.interviewerQuestions.map((q, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-slate-800 bg-slate-950/70 space-y-3"
              >
                <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-800">
                  <h4 className="text-sm font-semibold text-slate-100 flex items-start gap-2">
                    <span className="text-blue-400 font-mono">Q{idx + 1}:</span>
                    <span>{q.question}</span>
                  </h4>
                  <Badge variant="tech" size="sm">
                    {q.relevantConcept}
                  </Badge>
                </div>

                <div className="text-xs text-slate-400 italic">
                  <span className="font-semibold text-slate-400 not-italic">Interviewer intent: </span>
                  {q.whyInterviewersAskThis}
                </div>

                <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-semibold block mb-1">
                    Key Talking Points & Architectural Justification
                  </span>
                  {q.suggestedAnswerPoints.map((point, pidx) => (
                    <div key={pidx} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};
