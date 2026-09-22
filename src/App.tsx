import { useState, useMemo } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CommandPalette } from './components/layout/CommandPalette';
import { Hero } from './components/hero/Hero';
import { ProjectFilters } from './components/projects/ProjectFilters';
import { ProjectCard } from './components/projects/ProjectCard';
import { TechnicalExplorerModal } from './components/projects/TechnicalExplorerModal';
import { InteractiveArchitecture } from './components/architecture/InteractiveArchitecture';
import { EngineeringMindset } from './components/engineering/EngineeringMindset';
import { SkillsMatrix } from './components/engineering/SkillsMatrix';
import { InterviewerModal } from './components/interviewer/InterviewerModal';
import { ResumeModal } from './components/resume/ResumeModal';
import { ContactSection } from './components/contact/ContactSection';

import { candidate } from './data/candidate';
import { projects } from './data/projects';
import type { Project, ProjectCategory } from './types/project';
import { Code2, GraduationCap, CheckCircle2 } from 'lucide-react';

export function App() {
  // Modal states
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<string>('overview');
  const [isTechnicalModalOpen, setIsTechnicalModalOpen] = useState(false);
  const [isInterviewerModalOpen, setIsInterviewerModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Search and filter states
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: ProjectCategory[] = [
    'All',
    'Java',
    'Spring Boot',
    'Backend',
    'Full Stack',
    'Database',
    'System Design',
    'AI'
  ];

  // Filtered projects memo
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Category match
      const matchesCategory =
        activeCategory === 'All' || p.categories.includes(activeCategory);

      // Search match across multiple fields
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.problemStatement.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q)) ||
        p.engineeringFocus.some((f) => f.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleOpenCaseStudy = (project: Project, tab = 'overview') => {
    setSelectedProject(project);
    setModalInitialTab(tab);
    setIsTechnicalModalOpen(true);
  };

  const handleOpenQuestions = (project: Project) => {
    handleOpenCaseStudy(project, 'qa');
  };

  const handleSelectProjectBySlug = (slug: string) => {
    const proj = projects.find((p) => p.slug === slug);
    if (proj) {
      handleOpenCaseStudy(proj, 'overview');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600/30 selection:text-blue-200">
      {/* Sticky Navigation */}
      <Navbar
        onOpenInterviewerModal={() => setIsInterviewerModalOpen(true)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Content Area */}
      <main className="grow">
        {/* 1. Hero Section & Interactive Stack */}
        <Hero
          onOpenInterviewerModal={() => setIsInterviewerModalOpen(true)}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
        />

        {/* 2. Projects Showcase (Centerpiece) */}
        <section id="projects" className="py-16 sm:py-24 border-t border-slate-800/80 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/50 text-xs font-mono text-blue-300">
                <Code2 className="w-3.5 h-3.5" />
                <span>Featured Technical Case Studies</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Architectural Projects & Real Implementations
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Each project is documented as an in-depth case study. Click any card to explore architecture diagrams, API contracts, schema models, and failure handling.
              </p>
            </div>

            {/* Filter and Instant Search */}
            <ProjectFilters
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              totalProjects={projects.length}
              filteredCount={filteredProjects.length}
            />

            {/* Projects Grid */}
            {filteredProjects.length === 0 ? (
              <div className="max-w-md mx-auto p-8 rounded-2xl border border-slate-800 bg-slate-900/60 text-center space-y-3">
                <p className="text-sm text-slate-400">
                  No projects match your filter "<span className="text-slate-200">{searchQuery}</span>".
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                  className="text-xs font-mono text-blue-400 hover:text-blue-300 underline cursor-pointer"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onOpenCaseStudy={(proj) => handleOpenCaseStudy(proj, 'overview')}
                    onOpenQuestions={(proj) => handleOpenQuestions(proj)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 3. Interactive Architecture Lifecycle */}
        <InteractiveArchitecture />

        {/* 4. Engineering Mindset (Failure Scenarios) */}
        <EngineeringMindset />

        {/* 5. How I Build Software (Skills Matrix) */}
        <SkillsMatrix />

        {/* 6. About Section: Academic Rigor & Journey */}
        <section id="about" className="py-16 sm:py-24 border-t border-slate-800/80 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/50 text-xs font-mono text-blue-300">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Background & Philosophy</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Academic Rigor & Engineering Journey
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-6 text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-slate-800">
              <p>
                I hold a <strong className="text-slate-100 font-semibold">{candidate.education.degree}</strong>, which instilled a deep respect for core Computer Science foundations—including Data Structures, Algorithms, Relational Database Theory (ACID, normal forms, indexing), and Operating Systems.
              </p>

              <p>
                Rather than treating software engineering as simply piecing together frameworks, I focus on <strong className="text-slate-100 font-semibold">what happens behind the abstractions</strong>: how HikariCP manages JDBC connection pools, how Spring scopes bean lifecycles and transactions via dynamic proxies, how JPA entity states map to relational tables, and how to defend against race conditions and network failures.
              </p>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold block">
                  Continuous Professional Direction
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Focusing on scalable Java/Spring Boot backend architecture and distributed reliability.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Writing automated unit and integration tests (JUnit 5, Mockito, @DataJpaTest).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Building full-stack capabilities with React & TypeScript for end-to-end user value.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals and Overlays */}
      <TechnicalExplorerModal
        project={selectedProject}
        isOpen={isTechnicalModalOpen}
        onClose={() => setIsTechnicalModalOpen(false)}
        initialTab={modalInitialTab}
      />

      <InterviewerModal
        isOpen={isInterviewerModalOpen}
        onClose={() => setIsInterviewerModalOpen(false)}
        onSelectProject={(slug) => handleSelectProjectBySlug(slug)}
        onOpenResumeModal={() => {
          setIsInterviewerModalOpen(false);
          setIsResumeModalOpen(true);
        }}
      />

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectProject={(slug) => handleSelectProjectBySlug(slug)}
        onOpenInterviewerModal={() => setIsInterviewerModalOpen(true)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />
    </div>
  );
}

export default App;

