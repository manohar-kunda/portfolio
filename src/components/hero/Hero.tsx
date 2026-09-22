import React from 'react';
import { ArrowDown, FileText, Mail, UserCheck, ShieldCheck, MapPin, CheckCircle, Database } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { candidate } from '../../data/candidate';
import { Button } from '../common/Button';
import { InteractiveStack } from './InteractiveStack';

interface HeroProps {
  onOpenInterviewerModal: () => void;
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInterviewerModal, onOpenResumeModal }) => {
  return (
    <section id="hero" className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
      {/* Subtle technical background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Status & Direction pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-slate-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open to Software Engineering Opportunities</span>
            <span className="text-slate-600">•</span>
            <span className="text-blue-400 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Bengaluru, India
            </span>
          </div>

          {/* Name & Title */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              {candidate.name}
            </h1>
            <p className="text-lg sm:text-xl font-medium text-blue-400 font-mono tracking-tight">
              Java Full Stack Developer • Spring Boot & Backend Focus
            </p>
          </div>

          {/* Positioning Statement */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {candidate.positioningStatement}
          </p>

          {/* Credentials Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              {candidate.education.degree}
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Production Architecture Discipline
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800">
              <Database className="w-3.5 h-3.5 text-purple-400" />
              PostgreSQL & ACID Transactions
            </span>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a href="#projects">
              <Button
                variant="primary"
                size="md"
                icon={<ArrowDown className="w-4 h-4" />}
                iconPosition="right"
              >
                View Technical Projects
              </Button>
            </a>

            <Button
              variant="outline"
              size="md"
              onClick={onOpenInterviewerModal}
              icon={<UserCheck className="w-4 h-4 text-blue-400" />}
              className="border-blue-700/80 text-blue-300 hover:bg-blue-950/40"
            >
              For Interviewers
            </Button>

            <Button
              variant="secondary"
              size="md"
              onClick={onOpenResumeModal}
              icon={<FileText className="w-4 h-4" />}
            >
              Resume
            </Button>

            <a href={candidate.links.github} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="md"
                icon={<GithubIcon className="w-4 h-4" />}
              >
                GitHub
              </Button>
            </a>

            <a href="#contact">
              <Button
                variant="ghost"
                size="md"
                icon={<Mail className="w-4 h-4" />}
              >
                Contact
              </Button>
            </a>
          </div>
        </div>

        {/* Hero Interactive Stack Panel */}
        <div className="mt-14 max-w-4xl mx-auto">
          <InteractiveStack />
        </div>
      </div>
    </section>
  );
};
