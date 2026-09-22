import type { Project } from '../../types/project';
import { enterpriseInventoryProject } from './enterprise-inventory';
import { orderProcessingProject } from './order-processing';
import { asyncEventProcessingProject } from './async-event-processing';
import { skillLensProject } from './skilllens-pro';

/**
 * Centralized Project Registry
 * 
 * To add a new project in the future:
 * 1. Create a new file in src/data/projects/<project-slug>.ts conforming to the Project interface.
 * 2. Import it here and add it to the projects array.
 * 3. The entire UI (cards, filters, search, technical explorer, architecture diagrams, Q&A) updates automatically!
 */
export const projects: Project[] = [
  enterpriseInventoryProject,
  orderProcessingProject,
  asyncEventProcessingProject,
  skillLensProject
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}
