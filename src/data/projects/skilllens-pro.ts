import type { Project } from '../../types/project';

export const skillLensProject: Project = {
  id: 'proj-skilllens-pro',
  slug: 'skilllens-pro',
  title: 'SkillLens Pro: Career & Skill Matrix Platform',
  tagline: 'Full-stack developer analytics platform providing structured skill-gap analysis and technical learning roadmaps using deterministic schema contracts.',
  role: 'Full Stack Developer',
  status: 'Completed',
  categories: ['Java', 'Spring Boot', 'Full Stack', 'AI'],
  technologies: [
    'Java 17',
    'Spring Boot 3',
    'PostgreSQL',
    'React 18',
    'TypeScript',
    'Tailwind CSS',
    'OpenAI REST API',
    'Docker'
  ],
  engineeringFocus: [
    'Full Stack Architecture',
    'Structured LLM Output Validation',
    'REST Contract Design',
    'Schema Enforcement',
    'API Rate Limiting'
  ],
  githubUrl: 'https://github.com/manohar-kunda/skilllens-pro',
  liveUrl: '',
  
  problemStatement: 'Engineers preparing for technical roles struggle to identify concrete competency gaps between their current skills and target job descriptions, receiving either unstructured advice or generic checklists.',
  targetUsers: [
    'Early-career and transitioning software engineers targeting backend/full-stack roles',
    'Technical mentors seeking objective skill matrices to guide candidates'
  ],
  solutionSummary: 'Built a full-stack platform featuring a Spring Boot backend and React frontend that parses candidate skills, benchmarks them against target tech stacks, and generates validated structured learning roadmaps via schema-constrained LLM API integration.',
  whyIBuiltThis: 'I wanted to combine Java backend robustness with modern React frontend UX, while exploring how to integrate Generative AI via strict JSON schema validation rather than unreliable freeform text.',

  architecture: {
    overview: 'Full-stack application where the Spring Boot backend acts as a secure, rate-limited proxy and schema validator between the React client and external AI inference APIs.',
    pattern: 'Full Stack Layered Architecture / Proxy Gateway',
    layers: [
      {
        name: 'Client Interface Layer',
        role: 'Interactive skill matrix dashboard, radar chart visualizations, and roadmap checklist.',
        technologies: ['React 18', 'TypeScript', 'Tailwind CSS'],
        description: 'Responsive user interface allowing candidates to input skills, paste target role requirements, and view structured gaps.'
      },
      {
        name: 'Backend API Gateway & Controller',
        role: 'Authentication, input sanitization, rate limiting, and contract routing.',
        technologies: ['Spring Boot 3', 'Spring MVC', 'Bucket4j Rate Limiting'],
        description: 'Protects backend resources and external API quotas from abuse with token-bucket rate limiting.'
      },
      {
        name: 'AI Integration & Schema Validator',
        role: 'Constructs deterministic prompts, enforces JSON schema mode, and validates response DTOs.',
        technologies: ['Spring RestClient', 'Jackson ObjectMapper', 'Jakarta Validation'],
        description: 'Prevents LLM hallucinations or unstructured text from breaking the UI by validating incoming JSON payloads against strict Java records.'
      },
      {
        name: 'Persistence Layer',
        role: 'Stores user profiles, saved roadmaps, and historical skill assessments.',
        technologies: ['Spring Data JPA', 'PostgreSQL'],
        description: 'Persists user progression and roadmap milestone completion states.'
      }
    ],
    requestFlowSteps: [
      'User selects target role (e.g. "Java Backend Developer") and submits current technical skills.',
      'React frontend performs client-side validation and sends POST /api/v1/analysis/skill-gap.',
      'Spring Boot controller validates input and checks user rate-limit bucket.',
      'Backend constructs a structured prompt enforcing strict JSON schema output format.',
      'External LLM API returns JSON response; Jackson parses into strongly-typed Java DTO.',
      'Backend validates required fields; saves roadmap to PostgreSQL; returns 200 OK to frontend.'
    ]
  },

  apiDesign: [
    {
      method: 'POST',
      path: '/api/v1/analysis/skill-gap',
      summary: 'Generate structured skill gap matrix between candidate profile and target role.',
      idempotent: false,
      requestBodySnippet: `{
  "targetRole": "Java Backend Developer",
  "experienceLevel": "Entry / Junior",
  "currentSkills": ["Java Basics", "OOP", "SQL", "Git"],
  "focusAreas": ["Spring Boot", "REST APIs", "Database Design"]
}`,
      responseSnippet: `{
  "assessmentId": "asm_90123",
  "matchPercentage": 65,
  "identifiedGaps": [
    {
      "skill": "Spring Data JPA & Transaction Management",
      "priority": "HIGH",
      "recommendedTopics": ["@Transactional boundaries", "N+1 query resolution", "Repository pattern"]
    },
    {
      "skill": "Unit & Integration Testing",
      "priority": "HIGH",
      "recommendedTopics": ["JUnit 5", "Mockito", "@WebMvcTest"]
    }
  ],
  "learningRoadmapWeeks": 4
}`,
      statusCodes: ['200 OK', '400 Bad Request', '429 Too Many Requests']
    }
  ],

  databaseDesign: {
    engine: 'PostgreSQL',
    rationale: 'PostgreSQL provides JSONB support for roadmap steps alongside relational tables for candidate credentials and profiles.',
    tables: [
      {
        tableName: 'candidate_profiles',
        purpose: 'Candidate details, current skill tags, and target career goals.',
        primaryKey: 'id BIGSERIAL',
        keyColumns: ['email VARCHAR(255) UNIQUE', 'current_title VARCHAR(128)', 'created_at TIMESTAMP'],
        relationships: 'One-to-many with skill_assessments.'
      },
      {
        tableName: 'skill_assessments',
        purpose: 'Historical skill gap reports and progress milestones.',
        primaryKey: 'id BIGSERIAL',
        keyColumns: ['candidate_id BIGINT (FK)', 'target_role VARCHAR(128)', 'gaps_json JSONB', 'match_score INT'],
        relationships: 'Many-to-one with candidate_profiles.'
      }
    ],
    indexingAndConstraints: [
      'INDEX idx_candidate_assessments ON skill_assessments(candidate_id, created_at DESC)'
    ]
  },

  engineeringDecisions: [
    {
      topic: 'API Key Protection: Backend Proxy vs Client Direct Call',
      chosenApproach: 'Spring Boot Backend Proxy securely storing AI API keys in environment variables.',
      whyChosen: 'Directly calling third-party AI APIs from the browser exposes private API keys to anyone opening browser DevTools, leading to rapid key theft and quota exhaustion.',
      alternativesConsidered: ['Direct client API invocation with ephemeral keys (complex and still vulnerable)'],
      tradeOffs: 'All client requests must transit the backend server, adding slight network hop latency (mitigated by asynchronous non-blocking HTTP).'
    },
    {
      topic: 'LLM Output Determinism: Strict JSON Schema Mode vs Freeform Text Prompting',
      chosenApproach: 'Enforce JSON schema mode with Jackson DTO validation.',
      whyChosen: 'Freeform text parsing is brittle and frequently breaks client rendering with unexpected formatting changes. Schema mode guarantees predictable fields.',
      alternativesConsidered: ['Regex parsing of markdown output (fragile and prone to silent failures)'],
      tradeOffs: 'Requires graceful handling if the model occasionally truncates tokens on very large responses.'
    }
  ],

  challenges: [
    {
      title: 'Handling AI API Latency and Intermittent Timeouts',
      scenario: 'LLM generation calls occasionally take 8–12 seconds, threatening browser request timeout thresholds.',
      rootCause: 'Heavy inference load on external model providers during peak hours.',
      solutionImplemented: 'Implemented a loading state pattern with clear UX indicators on the frontend, configured strict 15-second socket timeouts on Spring RestClient, and cached frequent roadmap templates in PostgreSQL to serve instant responses for identical target roles.'
    }
  ],

  testing: {
    unitTesting: 'JUnit 5 tests verifying Jackson JSON parsing, DTO schema validation, and prompt builder logic.',
    integrationTesting: 'Spring MockMvc testing controller status codes, rate limiter rejection (HTTP 429), and CORS configuration.',
    mockingAndSlices: 'Mocked external AI REST API responses using MockRestServiceServer to test resilient parsing without incurring API cost.',
    validationScenarios: [
      'Reject requests with empty currentSkills list with HTTP 400',
      'Rate limiter blocks more than 5 requests per minute per IP address',
      'Malformed LLM response triggers internal fallback error without leaking stack trace'
    ]
  },

  deployment: {
    runtimeEnvironment: 'Java 17 (OpenJDK) + React SPA',
    buildSystem: 'Maven for backend, Vite for frontend',
    containerization: 'Docker container with multi-stage build',
    cloudOrHosting: 'Containerized deployment on Linux VM / Cloud hosting',
    ciCdWorkflow: 'GitHub Actions running full-stack lint, build, and test steps'
  },

  lessonsLearned: [
    'Always treat external AI outputs as untrusted user input: validate with strict schemas before trusting data in domain logic.',
    'Never expose third-party API credentials on the client side.',
    'Rate limiting is an architectural requirement when wrapping paid external API resources.'
  ],

  whatIWouldImproveNext: [
    'Implement Server-Sent Events (SSE) to stream analysis progress in real time rather than waiting for full completion.',
    'Add an interactive coding exercise evaluation module for candidate practice.'
  ],

  interviewerQuestions: [
    {
      question: 'How do you prevent third-party API keys from being leaked in a full-stack application?',
      whyInterviewersAskThis: 'Tests security hygiene and basic application architecture.',
      suggestedAnswerPoints: [
        'The frontend client never has knowledge of or access to the external API key.',
        'The API key is stored as a secure environment variable on the server running the Spring Boot backend.',
        'The frontend communicates exclusively with authenticated Spring Boot endpoints, which proxy and rate-limit the requests.'
      ],
      relevantConcept: 'API Security & Secrets Management'
    },
    {
      question: 'How do you guarantee that an AI model does not break your frontend UI with unexpected formatting?',
      whyInterviewersAskThis: 'Evaluates real-world experience working with LLMs in software engineering.',
      suggestedAnswerPoints: [
        'Use JSON Schema / Structured Outputs mode in the API prompt contract.',
        'Deserialize the incoming response string with Jackson into a strict Java record/DTO.',
        'Apply Jakarta Bean Validation annotations (@NotNull, @NotEmpty) on the DTO.',
        'If validation fails, return a graceful error rather than passing corrupt data to the React UI.'
      ],
      relevantConcept: 'Contract Validation & Defensive Programming'
    }
  ]
};
