import React, { useState, useEffect } from 'react';
import { Terminal, FileText, UserCheck, Menu, X, Command } from 'lucide-react';
import { Button } from '../common/Button';

interface NavbarProps {
  onOpenInterviewerModal: () => void;
  onOpenResumeModal: () => void;
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenInterviewerModal,
  onOpenResumeModal,
  onOpenCommandPalette
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['projects', 'architecture', 'mindset', 'skills', 'about', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Architecture', href: '#architecture', id: 'architecture' },
    { label: 'Engineering Mindset', href: '#mindset', id: 'mindset' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' }
  ];

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-200 ${scrolled ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20' : 'bg-transparent border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 group-hover:border-blue-400 transition-colors">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-slate-100 group-hover:text-blue-400 transition-colors">
              KUNDA MANOHAR
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Java Full Stack Engineer
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${activeSection === link.id ? 'text-blue-400 bg-blue-950/40 border border-blue-800/40' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Command Palette Button */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/70 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs transition-colors"
            title="Search projects & jump (Ctrl+K)"
          >
            <Command className="w-3.5 h-3.5" />
            <span className="font-mono text-[11px]">⌘K</span>
          </button>

          {/* For Interviewers quick lens */}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenInterviewerModal}
            icon={<UserCheck className="w-3.5 h-3.5 text-blue-400" />}
            className="border-blue-800/60 text-blue-300 hover:bg-blue-950/40"
          >
            For Interviewers
          </Button>

          {/* Resume Modal Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenResumeModal}
            icon={<FileText className="w-3.5 h-3.5" />}
          >
            Resume
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenCommandPalette}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Open command palette"
          >
            <Command className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-3">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm text-slate-300 hover:text-white hover:bg-slate-900"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInterviewerModal();
              }}
              icon={<UserCheck className="w-4 h-4 text-blue-400" />}
              className="w-full justify-center border-blue-800 text-blue-300"
            >
              For Interviewers Mode
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              icon={<FileText className="w-4 h-4" />}
              className="w-full justify-center"
            >
              View & Download Resume
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
