import type { CandidateProfile, SkillCategory } from '../types/candidate';

export const candidate: CandidateProfile = {
  name: 'KUNDA MANOHAR',
  role: 'Java Full Stack Developer',
  targetRoles: [
    'Java Full Stack Developer',
    'Java Backend Developer',
    'Spring Boot Software Engineer'
  ],
  location: 'Bengaluru, India',
  availability: 'Open to opportunities',
  positioningStatement: 'I build reliable web applications with Java, Spring Boot, SQL, and modern engineering practices. Focused on clean architecture, resilient APIs, and data integrity.',
  education: {
    degree: 'Master of Computer Applications (MCA)',
    field: 'Computer Science & Software Development',
    institution: 'MCA Graduate',
    duration: 'Graduate Program',
    coreSubjects: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming (Java)',
      'Database Management Systems (RDBMS & SQL)',
      'Operating Systems & Networking',
      'Web Application Architecture',
      'Software Engineering Methodologies'
    ]
  },
  links: {
    github: 'https://github.com/manohar-kunda',
    linkedin: 'https://linkedin.com/in/kunda-manohar',
    email: 'kunda.manohar.dev@gmail.com',
    resumePdfUrl: '#resume-viewer',
    leetcode: 'https://leetcode.com/kunda_manohar'
  }
};

export const skillCategories: SkillCategory[] = [
  {
    title: 'Backend Engineering',
    description: 'Server-side architectures, business logic encapsulation, and secure RESTful services.',
    iconName: 'Server',
    skills: [
      {
        name: 'Java (Core & Modern)',
        subtopics: [
          'Object-Oriented Programming (OOP & Polymorphism)',
          'Java Collections Framework (Map, Set, List implementations & time complexity)',
          'Streams API & Functional Interfaces',
          'Exception Hierarchy & Custom Runtime Exceptions',
          'Multithreading basics & Concurrency primitives'
        ],
        practicalUse: 'Writing robust, type-safe business domain models and modular application services.'
      },
      {
        name: 'Spring Boot & Ecosystem',
        subtopics: [
          'Spring MVC & RESTful Controllers',
          'Inversion of Control (IoC) & Dependency Injection',
          'Spring Data JPA & Repository abstractions',
          'Spring Validation (JSR-380 / Bean Validation @Valid)',
          'Global Exception Handling (@RestControllerAdvice)',
          'Spring Security configuration & JWT authentication flow'
        ],
        practicalUse: 'Structuring layered backend applications with standardized error responses and request lifecycles.'
      },
      {
        name: 'REST API Design',
        subtopics: [
          'HTTP Semantics (GET, POST, PUT, PATCH, DELETE)',
          'Proper HTTP Status Codes (200, 201, 204, 400, 404, 409, 500)',
          'Idempotent API Design for critical mutation endpoints',
          'RFC 7807 Problem Details for HTTP APIs',
          'DTO pattern & strict Request/Response separation'
        ],
        practicalUse: 'Designing predictable, versionable, and secure contract-driven web APIs.'
      },
      {
        name: 'ORM & Data Persistence',
        subtopics: [
          'JPA / Hibernate Entity Lifecycles (Transient, Managed, Detached)',
          'Transaction Management (@Transactional boundaries & rollback rules)',
          'Relationship Mappings (@OneToMany, @ManyToOne, FetchType.LAZY)',
          'N+1 Query Detection & Mitigation (JOIN FETCH & EntityGraph)'
        ],
        practicalUse: 'Ensuring atomic database transactions and avoiding performance bottlenecks from unoptimized ORM queries.'
      }
    ]
  },
  {
    title: 'Databases & Storage',
    description: 'Relational data modeling, ACID transactions, data consistency, and schema migrations.',
    iconName: 'Database',
    skills: [
      {
        name: 'PostgreSQL & MySQL',
        subtopics: [
          'Relational Schema Design & 3NF Normalization',
          'Primary Keys, Foreign Keys & Unique Constraints',
          'B-Tree Indexing strategies & query execution plans (EXPLAIN ANALYZE)',
          'ACID properties & Transaction Isolation levels (READ COMMITTED, REPEATABLE READ)',
          'HikariCP Connection Pool configuration'
        ],
        practicalUse: 'Building normalized relational databases with strict integrity constraints and query optimization.'
      },
      {
        name: 'Database Migrations',
        subtopics: [
          'Version-controlled SQL scripts (Flyway)',
          'Repeatable vs Versioned migrations',
          'Zero-downtime column and table alterations'
        ],
        practicalUse: 'Maintaining deterministic and reproducible database schema states across environments.'
      }
    ]
  },
  {
    title: 'Frontend Development',
    description: 'Building responsive, accessible, and high-performance client interfaces.',
    iconName: 'Layout',
    skills: [
      {
        name: 'React & TypeScript',
        subtopics: [
          'Functional Components & Custom Hooks',
          'State Management (useState, useReducer, Context API)',
          'Lifecycle effects & clean-up patterns (useEffect)',
          'Strict TypeScript typings for Props, Events, and API DTOs'
        ],
        practicalUse: 'Building modular interactive UI components with predictable data flow.'
      },
      {
        name: 'Modern Web Standards',
        subtopics: [
          'Modern JavaScript (ES6+, Promises, Async/Await, Destructuring)',
          'Tailwind CSS & Responsive Grid/Flexbox Layouts',
          'Semantic HTML5 & WAI-ARIA Accessibility Standards',
          'Client-side Form Validation & UX State Handling'
        ],
        practicalUse: 'Crafting responsive, accessible interfaces that render cleanly on mobile, tablet, and desktop.'
      }
    ]
  },
  {
    title: 'Engineering Principles & Reliability',
    description: 'Software quality patterns, architectural discipline, and failure mitigation.',
    iconName: 'ShieldCheck',
    skills: [
      {
        name: 'Architecture & Design Patterns',
        subtopics: [
          'SOLID Principles & Clean Code practices',
          'Layered Monolith & Separation of Concerns (Controller -> Service -> Repository)',
          'Gang of Four Patterns (Factory, Strategy, Builder, Singleton)',
          'Idempotency Keys for at-least-once HTTP operations'
        ],
        practicalUse: 'Preventing tightly-coupled code and maintaining clear boundaries between business rules and transport layers.'
      },
      {
        name: 'Testing & Verification',
        subtopics: [
          'Unit Testing with JUnit 5 & AssertJ',
          'Mocking dependencies using Mockito (when, verify, doThrow)',
          'Slice Testing with @WebMvcTest & @DataJpaTest',
          'Boundary condition and exception verification'
        ],
        practicalUse: 'Writing isolated unit and slice tests to guarantee business logic correctness before deployment.'
      }
    ]
  },
  {
    title: 'DevOps, Cloud & Tooling',
    description: 'Local environment reproducibility, containerization, and source control workflows.',
    iconName: 'Cloud',
    skills: [
      {
        name: 'Version Control & Build Tools',
        subtopics: [
          'Git workflows (Branching, Merge, Rebase, Pull Requests)',
          'Maven & Gradle dependency management and build lifecycles',
          'GitHub repository governance & documentation'
        ],
        practicalUse: 'Collaborating cleanly through version control and deterministic project builds.'
      },
      {
        name: 'Containerization & Infrastructure',
        subtopics: [
          'Docker containerization (multi-stage Dockerfile for Spring Boot)',
          'Docker Compose for local multi-container setups (App + PostgreSQL)',
          'Linux CLI fundamentals & environment variables management',
          'AWS Fundamentals (EC2 deployment, S3 storage, RDS managed databases)'
        ],
        practicalUse: 'Packaging applications for reliable execution across development and production servers.'
      },
      {
        name: 'AI-Assisted Development',
        subtopics: [
          'AI-assisted coding, refactoring, and test case ideation',
          'LLM API integrations via REST (JSON parsing & prompt validation)',
          'Static code analysis assistance'
        ],
        practicalUse: 'Accelerating code authoring and exploring intelligent features without compromising engineering rigor.'
      }
    ]
  }
];
