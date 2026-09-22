export interface CandidateProfile {
  name: string;
  role: string;
  targetRoles: string[];
  location: string;
  availability: string;
  positioningStatement: string;
  education: {
    degree: string;
    field: string;
    institution: string;
    duration: string;
    coreSubjects: string[];
  };
  links: {
    github: string;
    linkedin: string;
    email: string;
    resumePdfUrl?: string;
    leetcode?: string;
  };
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: {
    name: string;
    subtopics: string[];
    practicalUse: string;
  }[];
}

export interface EngineeringScenario {
  id: string;
  question: string;
  scenario: string;
  engineeringConcept: string;
  howIHandleIt: string;
  codeSnippet?: string;
  snippetLanguage?: string;
}
