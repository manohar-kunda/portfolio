import React from 'react';
import { ExternalLink, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import type { Project } from '../../types/project';
import { Badge } from '../common/Badge';

interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy: (project: Project) => void;
  onOpenQuestions: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenCaseStudy,
  onOpenQuestions
}) => {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-6 hover:border-slate-700 hover:bg-slate-900/90 transition-all duration-200 group shadow-md hover:shadow-xl hover:shadow-black/30">
      <div>
        {/* Header: Role & Status */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
          <span className="text-xs font-mono text-blue-400 font-medium">
            {project.role}
          </span>
          <Badge
            variant={
              project.status === 'Completed'
                ? 'emerald'
                : project.status === 'In Development'
                ? 'blue'
                : 'amber'
            }
            size="sm"
          >
            {project.status}
          </Badge>
        </div>

        {/* Title & Tagline */}
        <div className="mt-3.5 space-y-2">
          <h3 className="text-lg font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Engineering Focus Badges */}
        <div className="mt-4">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">
            Engineering Focus
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.engineeringFocus.map((focus, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-blue-950/40 text-blue-300 border border-blue-800/40"
              >
                <ShieldCheck className="w-3 h-3 text-blue-400" />
                {focus}
              </span>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="mt-4">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">
            Technologies
          </div>
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 6).map((tech, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 6 && (
              <span className="text-[11px] font-mono px-1.5 py-0.5 text-slate-500">
                +{project.technologies.length - 6} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <button
          onClick={() => onOpenCaseStudy(project)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 group/btn transition-colors cursor-pointer"
        >
          <span>Explore Case Study</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </button>

        <div className="flex items-center gap-1.5">
          {/* Interviewer Questions trigger */}
          <button
            onClick={() => onOpenQuestions(project)}
            title="What could an interviewer ask about this project?"
            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-300 hover:bg-slate-800 border border-slate-800 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* GitHub Link */}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View Source on GitHub"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}

          {/* Live Link if available */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Live Demo"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
