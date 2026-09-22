import type { Project } from '../../types/project';

export const asyncEventProcessingProject: Project = {
  id: 'proj-async-event-processing',
  slug: 'async-event-processing-pipeline',
  title: 'Asynchronous Event Processing Pipeline',
  tagline: 'Fault-tolerant event ingestion and background worker pipeline featuring at-least-once delivery, exponential backoff retries, and dead letter queue isolation.',
  role: 'Backend Engineer',
  status: 'Completed',
  categories: ['Java', 'Spring Boot', 'Backend', 'System Design'],
  technologies: [
    'Java 17',
    'Spring Boot 3',
    'Spring AMQP / RabbitMQ',
    'PostgreSQL',
    'Docker',
    'Jackson',
    'JUnit 5'
  ],
  engineeringFocus: [
    'Asynchronous Messaging',
    'Dead Letter Queue (DLQ)',
    'Exponential Backoff Retries',
    'At-Least-Once Delivery',
    'Poison Pill Isolation'
  ],
  githubUrl: 'https://github.com/manohar-kunda/async-event-pipeline',
  liveUrl: '',
  
  problemStatement: 'Synchronous REST request chains block worker threads during long-running tasks (notifications, analytics generation, batch imports), leading to cascading timeouts when downstream consumers slow down.',
  targetUsers: [
    'Microservice systems requiring decoupled background execution',
    'Operations teams needing visibility and isolation for failing messages'
  ],
  solutionSummary: 'Engineered an asynchronous message broker consumer pipeline in Spring Boot with manual acknowledgement, configurable dead-letter exchange (DLX) routing, and poison-pill message quarantine.',
  whyIBuiltThis: 'I built this project to master event-driven architecture fundamentals, understand message acknowledgment lifecycles, and implement self-healing failure patterns when background workers crash.',

  architecture: {
    overview: 'Publisher-Subscriber decoupled pipeline with distinct exchange bindings, retry delay queues using TTL + Dead Letter Exchanges, and permanent quarantine DLQs.',
    pattern: 'Event-Driven / Queue-Worker Architecture',
    layers: [
      {
        name: 'Event Ingestion / Publisher API',
        role: 'Accepts client events via REST, validates schema, and publishes to message exchange.',
        technologies: ['Spring MVC', 'RabbitTemplate'],
        description: 'Returns HTTP 202 Accepted immediately with an event tracking UUID, freeing the client connection.'
      },
      {
        name: 'Queue & Retry Topology',
        role: 'Buffers messages and handles retry delays without blocking main processing threads.',
        technologies: ['RabbitMQ / Message Broker', 'Exchange-Queue Bindings'],
        description: 'Implements three queues: primary processing queue, retry delay queue (TTL), and terminal dead-letter queue (DLQ).'
      },
      {
        name: 'Worker Consumer Service',
        role: 'Consumes messages with manual ACK/NACK and idempotent processing safeguards.',
        technologies: ['@RabbitListener', 'Spring Transactional'],
        description: 'Processes event payloads, updates persistent operational states, and acknowledges messages only on commit.'
      },
      {
        name: 'Dead Letter Quarantine & Inspector',
        role: 'Captures permanently failed events with error headers for debugging and replay.',
        technologies: ['DLQ Listener', 'PostgreSQL failure_archive'],
        description: 'Stores failed payloads with stack traces and allows manual or automated re-queuing.'
      }
    ],
    requestFlowSteps: [
      'Client posts event payload to POST /api/v1/events/ingest.',
      'Publisher publishes JSON message to "app.events.exchange" with routing key.',
      'Message arrives at "events.process.queue".',
      'Worker listener receives message with autoAck = false.',
      'If worker succeeds, channel.basicAck is issued; message removed from queue.',
      'If transient error occurs, message is rejected and routed to "events.retry.queue" with exponential TTL.',
      'When retry count exceeds threshold (3 attempts), message is routed to "events.dlq" for investigation.'
    ]
  },

  apiDesign: [
    {
      method: 'POST',
      path: '/api/v1/events/ingest',
      summary: 'Publish high-volume event asynchronously.',
      idempotent: false,
      requestBodySnippet: `{
  "eventType": "USER_NOTIFICATION_DISPATCH",
  "payload": {
    "userId": 9012,
    "channel": "EMAIL",
    "templateId": "WELCOME_SERIES_01"
  }
}`,
      responseSnippet: `{
  "eventId": "evt_4492019a",
  "status": "QUEUED",
  "timestamp": "2026-09-22T16:00:00Z"
}`,
      statusCodes: ['202 Accepted', '400 Bad Request']
    },
    {
      method: 'GET',
      path: '/api/v1/events/{eventId}/status',
      summary: 'Check processing status of asynchronous event.',
      idempotent: true,
      responseSnippet: `{
  "eventId": "evt_4492019a",
  "status": "PROCESSED",
  "retryCount": 0,
  "completedAt": "2026-09-22T16:00:02Z"
}`,
      statusCodes: ['200 OK', '404 Not Found']
    }
  ],

  databaseDesign: {
    engine: 'PostgreSQL',
    rationale: 'PostgreSQL stores event audit logs and dead letter archives for inspection.',
    tables: [
      {
        tableName: 'processed_events',
        purpose: 'Tracks unique event UUIDs to ensure idempotent consumer execution.',
        primaryKey: 'event_id VARCHAR(64)',
        keyColumns: ['status VARCHAR(32)', 'processed_at TIMESTAMP', 'retry_attempts INT'],
        relationships: 'Standalone deduplication ledger.'
      },
      {
        tableName: 'dead_letter_archive',
        purpose: 'Records permanently failed events with stack traces for engineering debugging.',
        primaryKey: 'id BIGSERIAL',
        keyColumns: ['event_id VARCHAR(64)', 'payload TEXT', 'exception_message TEXT', 'failed_at TIMESTAMP'],
        relationships: 'Audit repository.'
      }
    ],
    indexingAndConstraints: [
      'UNIQUE INDEX idx_event_id ON processed_events(event_id)',
      'INDEX idx_failed_at ON dead_letter_archive(failed_at DESC)'
    ]
  },

  engineeringDecisions: [
    {
      topic: 'Message Acknowledgment: Manual (basicAck) vs Automatic (autoAck)',
      chosenApproach: 'Explicit Manual Acknowledgement (AcknowledgeMode.MANUAL).',
      whyChosen: 'Automatic acknowledgment deletes the message as soon as the broker delivers it to the worker TCP socket. If the worker crashes or runs out of memory mid-processing, the message is permanently lost.',
      alternativesConsidered: ['Automatic ACK (only safe for throwaway metric counters)'],
      tradeOffs: 'Requires strict try/catch/finally handling in consumer code to ensure unhandled exceptions do not leave messages stuck in unacked state.'
    },
    {
      topic: 'Handling Poison Pill Messages: Infinite Retries vs Dead Letter Queue',
      chosenApproach: 'Dead Letter Queue (DLQ) with maximum retry threshold (3 retries).',
      whyChosen: 'A malformed payload or corrupt data (poison pill) will fail forever. Without a retry cap and DLQ, it repeatedly consumes 100% of worker CPU and blocks all subsequent legitimate messages.',
      alternativesConsidered: ['Infinite retries with fixed delay (catastrophic for throughput)', 'Immediate discard on first error (risks losing valid messages during transient network blips)'],
      tradeOffs: 'Requires an operator process or dashboard to monitor and replay DLQ messages.'
    }
  ],

  challenges: [
    {
      title: 'Consumer Duplicate Processing Under High Worker Load',
      scenario: 'When a worker takes longer to process an event than the broker acknowledgment timeout, the broker considers the worker dead and delivers the message to a second worker.',
      rootCause: 'At-least-once delivery semantics in distributed message queues guarantee delivery, but not uniqueness.',
      solutionImplemented: 'Implemented an Idempotent Consumer pattern using an atomic INSERT ON CONFLICT DO NOTHING in PostgreSQL on the processed_events table before initiating side-effects.'
    }
  ],

  testing: {
    unitTesting: 'Unit tests for event deserialization, retry policy calculation, and routing key resolution.',
    integrationTesting: 'Embedded RabbitMQ / Testcontainers tests verifying dead letter exchange routing and message replay.',
    mockingAndSlices: 'Simulated network dropouts to verify that unacknowledged messages are successfully re-queued to active workers.',
    validationScenarios: [
      'Poison payload moves to dead letter queue after exactly 3 failed attempts',
      'Successful message triggers manual ACK and removes message from processing queue',
      'Duplicate event message ID is skipped safely without duplicate processing'
    ]
  },

  deployment: {
    runtimeEnvironment: 'Java 17 (OpenJDK) + Spring Boot 3 + RabbitMQ Docker container',
    buildSystem: 'Maven',
    containerization: 'Multi-container Docker Compose setup with health check dependencies',
    cloudOrHosting: 'Containerized Linux server',
    ciCdWorkflow: 'GitHub Actions running integration test suite'
  },

  lessonsLearned: [
    'Distributed messaging guarantees at-least-once delivery, never exactly-once; idempotency is mandatory for every consumer.',
    'Dead letter queues are not just an error dump—they are an essential architectural quarantine for system resilience.',
    'Always set prefetch counts on consumers (e.g. basicQos(10)) to avoid a single fast worker hoarding messages.'
  ],

  whatIWouldImproveNext: [
    'Implement the Outbox Pattern with a database CDC pipeline (Debezium) to ensure transactional atomicity between DB writes and event publishing.',
    'Build a lightweight DLQ replay API with dry-run verification.'
  ],

  interviewerQuestions: [
    {
      question: 'What is the difference between at-least-once and exactly-once delivery in message brokers?',
      whyInterviewersAskThis: 'Evaluates understanding of distributed system constraints and CAP theorem implications.',
      suggestedAnswerPoints: [
        'At-least-once delivery guarantees that a message will not be lost; however, due to network re-transmissions and worker timeouts, a message may be delivered more than once.',
        'True end-to-end "exactly-once" processing is achieved by pairing at-least-once delivery with idempotent consumer design (e.g., tracking message IDs with unique DB constraints).',
        'Brokers alone cannot provide end-to-end exactly-once without distributed state coordination.'
      ],
      relevantConcept: 'Message Broker Delivery Semantics & Idempotency'
    },
    {
      question: 'How do you prevent a poison pill message from taking down your worker fleet?',
      whyInterviewersAskThis: 'Assesses practical resilience and defense-against-failure thinking.',
      suggestedAnswerPoints: [
        'A poison pill message has corrupt formatting or causes a deterministic NPE/crash.',
        'Implement an error handler that tracks delivery attempts via headers (x-death / retry-count).',
        'When retries exceed the limit (e.g. 3), reject with basicNack(requeue=false), routing the message to a Dead Letter Exchange (DLX) and Dead Letter Queue (DLQ).',
        'This frees the worker to process healthy backlog items while archiving the poison message for analysis.'
      ],
      relevantConcept: 'Dead Letter Queues & Failure Isolation'
    }
  ]
};
