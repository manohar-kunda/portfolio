export type ProjectCategory = 
  | 'All'
  | 'Java'
  | 'Spring Boot'
  | 'Backend'
  | 'Full Stack'
  | 'Database'
  | 'System Design'
  | 'AI';

export type ProjectStatus = 
  | 'Completed'
  | 'In Development'
  | 'Experimental'
  | 'Learning Project';

export interface ArchitectureLayer {
  name: string;
  role: string;
  technologies: string[];
  description: string;
}

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  summary: string;
  idempotent: boolean;
  requestBodySnippet?: string;
  responseSnippet?: string;
  statusCodes: string[];
}

export interface DatabaseTable {
  tableName: string;
  purpose: string;
  primaryKey: string;
  keyColumns: string[];
  relationships: string;
}

export interface EngineeringDecision {
  topic: string;
  chosenApproach: string;
  whyChosen: string;
  alternativesConsidered: string[];
  tradeOffs: string;
}

export interface EngineeringChallenge {
  title: string;
  scenario: string;
  rootCause: string;
  solutionImplemented: string;
}

export interface TestingBreakdown {
  unitTesting: string;
  integrationTesting: string;
  mockingAndSlices: string;
  validationScenarios: string[];
}

export interface DeploymentDetails {
  runtimeEnvironment: string;
  buildSystem: string;
  containerization?: string;
  cloudOrHosting?: string;
  ciCdWorkflow?: string;
}

export interface InterviewerQuestion {
  question: string;
  whyInterviewersAskThis: string;
  suggestedAnswerPoints: string[];
  relevantConcept: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  role: string;
  status: ProjectStatus;
  categories: ProjectCategory[];
  technologies: string[];
  engineeringFocus: string[];
  githubUrl?: string;
  liveUrl?: string;
  
  // Case Study Content
  problemStatement: string;
  targetUsers: string[];
  solutionSummary: string;
  whyIBuiltThis: string;
  
  // Technical Explorer Panes
  architecture: {
    overview: string;
    pattern: string;
    layers: ArchitectureLayer[];
    requestFlowSteps: string[];
  };
  apiDesign?: ApiEndpoint[];
  databaseDesign?: {
    engine: 'PostgreSQL' | 'MySQL';
    rationale: string;
    tables: DatabaseTable[];
    indexingAndConstraints: string[];
  };
  engineeringDecisions: EngineeringDecision[];
  challenges: EngineeringChallenge[];
  testing: TestingBreakdown;
  deployment: DeploymentDetails;
  lessonsLearned: string[];
  whatIWouldImproveNext: string[];
  interviewerQuestions: InterviewerQuestion[];
}
