# How to Add a New Project (Zero-Redesign Workflow)

This developer portfolio is designed with a **data-driven component architecture**. Adding a new project requires **zero UI modifications**. The project showcase, live search index, technology badges, category filters, and in-depth Technical Explorer modal will update automatically.

---

## Step-by-Step Instructions

### Step 1: Create a Project Data File
Navigate to `src/data/projects/` and create a new TypeScript file matching your project's slug, for example:
```
src/data/projects/payment-gateway-webhook.ts
```

### Step 2: Implement the `Project` Interface
Import `Project` from `../../types/project` and export your project object adhering to the schema:

```typescript
import type { Project } from '../../types/project';

export const paymentGatewayWebhookProject: Project = {
  id: 'proj-payment-webhook',
  slug: 'payment-gateway-webhook',
  title: 'Payment Gateway Webhook Processor',
  tagline: 'High-throughput webhook ingestion engine handling signature verification, at-least-once delivery, and deduplication.',
  role: 'Backend Engineer',
  status: 'Completed', // 'Completed' | 'In Development' | 'Experimental' | 'Learning Project'
  categories: ['Java', 'Spring Boot', 'Backend', 'System Design'],
  technologies: [
    'Java 17',
    'Spring Boot 3',
    'PostgreSQL',
    'HMAC-SHA256',
    'Docker',
    'JUnit 5'
  ],
  engineeringFocus: [
    'HMAC Signature Verification',
    'Idempotent Processing',
    'Dead Letter Isolation',
    'Optimistic Concurrency'
  ],
  githubUrl: 'https://github.com/manohar-kunda/payment-webhook-processor',
  liveUrl: '', // Optional: leave empty string if not deployed

  // Technical Case Study Content
  problemStatement: 'Payment webhook providers (Stripe, Razorpay) guarantee at-least-once delivery, sending retries upon network delay. Naive handlers double-credit accounts or fail silently when signatures mismatch.',
  targetUsers: [
    'E-commerce merchants requiring 100% payment reconciliation',
    'Billing service backends consuming asynchronous payment events'
  ],
  solutionSummary: 'Built a Spring Boot webhook ingestion service that validates cryptographic HMAC signatures, records idempotent event keys, and updates order states atomically.',
  whyIBuiltThis: 'I built this project to master cryptographic request verification, prevent replay attacks, and handle distributed payment callbacks reliably.',

  // Architecture breakdown
  architecture: {
    overview: 'Event ingestion pipeline utilizing custom Spring HandlerInterceptor for HMAC validation and idempotent transactional service processing.',
    pattern: 'Hexagonal / Ports & Adapters',
    layers: [
      {
        name: 'Webhook Ingress Controller',
        role: 'Accepts raw payload and HTTP headers (X-Signature, X-Event-Id).',
        technologies: ['Spring MVC', 'Jakarta Validation'],
        description: 'Validates HMAC signature against shared secret before deserializing payload.'
      },
      {
        name: 'Idempotency & Processing Service',
        role: 'Verifies event deduplication in PostgreSQL before triggering side effects.',
        technologies: ['Spring Data JPA', '@Transactional'],
        description: 'Atomically writes to webhook_events ledger with UNIQUE constraint on event_id.'
      }
    ],
    requestFlowSteps: [
      'Webhook arrives at POST /api/v1/webhooks/payments with X-Signature.',
      'HMACValidator recomputes signature with shared secret; rejects invalid with 401 Unauthorized.',
      'EventProcessor queries webhook_events table within atomic transaction.',
      'If event_id already exists in COMPLETED state, returns 200 OK immediately.',
      'If new, updates customer balance, marks event PROCESSED, and commits transaction.'
    ]
  },

  // API Design (Optional but recommended)
  apiDesign: [
    {
      method: 'POST',
      path: '/api/v1/webhooks/payments',
      summary: 'Process incoming payment provider notification callback.',
      idempotent: true,
      requestBodySnippet: '{\n  "eventId": "evt_99214",\n  "type": "payment.succeeded",\n  "amount": 2500\n}',
      responseSnippet: '{\n  "status": "ACCEPTED",\n  "processedAt": "2026-09-22T12:00:00Z"\n}',
      statusCodes: ['200 OK', '401 Unauthorized', '409 Conflict']
    }
  ],

  // Relational Database Design
  databaseDesign: {
    engine: 'PostgreSQL',
    rationale: 'PostgreSQL guarantees ACID durability for financial webhook events and provides partial indexing.',
    tables: [
      {
        tableName: 'webhook_events',
        purpose: 'Immutable audit trail and deduplication registry.',
        primaryKey: 'id BIGSERIAL',
        keyColumns: ['event_id VARCHAR(128) UNIQUE', 'provider VARCHAR(32)', 'status VARCHAR(32)'],
        relationships: 'Standalone deduplication ledger.'
      }
    ],
    indexingAndConstraints: [
      'UNIQUE INDEX idx_event_provider ON webhook_events(event_id, provider)'
    ]
  },

  // Real Engineering Decisions & Trade-offs
  engineeringDecisions: [
    {
      topic: 'Signature Verification: Filter vs Controller Body',
      chosenApproach: 'Custom Spring OncePerRequestFilter with CachedBodyHttpServletRequest.',
      whyChosen: 'HTTP request input streams can only be read once. Wrapping in a ContentCachingRequestWrapper allows both HMAC verification and Jackson JSON parsing.',
      alternativesConsidered: ['Reading body directly in controller (too late to reject unauthenticated requests)'],
      tradeOffs: 'Adds a small memory allocation overhead to buffer the incoming request bytes.'
    }
  ],

  // Challenges Solved
  challenges: [
    {
      title: 'Stream Closed Exception During Signature Validation',
      scenario: 'Attempting to read request body in filter resulted in IOException when Controller later tried to deserialize JSON.',
      rootCause: 'ServletInputStream by default does not support mark/reset and can only be consumed once.',
      solutionImplemented: 'Implemented a ContentCachingRequestWrapper and passed it down the filter chain, allowing multiple reads.'
    }
  ],

  // Testing Breakdown
  testing: {
    unitTesting: 'JUnit 5 tests verifying HMAC SHA-256 hash generation and timing-attack-safe byte comparisons.',
    integrationTesting: 'MockMvc integration tests simulating invalid signatures (401) and replay attacks (idempotent 200).',
    mockingAndSlices: 'Mocking downstream notification adapters with Mockito.',
    validationScenarios: [
      'Reject request with tampered payload signature with HTTP 401',
      'Idempotently return 200 OK on duplicate event_id without re-crediting account'
    ]
  },

  // Deployment Lifecycle
  deployment: {
    runtimeEnvironment: 'Java 17 (OpenJDK) + Spring Boot 3',
    buildSystem: 'Maven',
    containerization: 'Multi-stage Dockerfile',
    ciCdWorkflow: 'GitHub Actions running test verification'
  },

  lessonsLearned: [
    'Always use MessageDigest.isEqual() to prevent timing attacks during HMAC signature comparisons.',
    'At-least-once delivery requires defensive idempotency at every consumer boundary.'
  ],

  whatIWouldImproveNext: [
    'Implement Redis cache for instant 5-minute idempotency lookups before hitting PostgreSQL.'
  ],

  // Technical Questions for Interviewers
  interviewerQuestions: [
    {
      question: 'How do you prevent timing attacks when comparing webhook signatures?',
      whyInterviewersAskThis: 'Evaluates cryptographic hygiene and defensive backend programming.',
      suggestedAnswerPoints: [
        'Standard String.equals() terminates early on the first mismatched character, leaking timing data.',
        'Always use MessageDigest.isEqual() which operates in constant time regardless of where bytes differ.'
      ],
      relevantConcept: 'Cryptographic Security & Constant-Time Comparisons'
    }
  ]
};
```

---

### Step 3: Register in the Project Aggregator
Open `src/data/projects/index.ts`, import your new project, and append it to the `projects` array:

```typescript
import { paymentGatewayWebhookProject } from './payment-gateway-webhook';

export const projects: Project[] = [
  enterpriseInventoryProject,
  orderProcessingProject,
  asyncEventProcessingProject,
  skillLensProject,
  paymentGatewayWebhookProject // <-- Your new project here
];
```

---

### Step 4: Verify Compilation & Live Reload
Run the TypeScript compiler to ensure all fields are valid:
```bash
npm run build
```

When successful, your project immediately appears in:
1. The **Projects Showcase Grid**
2. The **Category Filters** (e.g. Java, Spring Boot, Backend)
3. The **Live Search Index** (searches titles, technologies, and concepts)
4. The **Technical Explorer Modal** (all 9 technical tabs auto-render)
5. The **Command Palette** (`Ctrl+K` / `Cmd+K`)
6. The **"For Interviewers" lens**

No UI refactoring, CSS changes, or page routing adjustments required!
