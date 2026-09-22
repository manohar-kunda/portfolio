import type { Project } from '../../types/project';

export const orderProcessingProject: Project = {
  id: 'proj-order-processing',
  slug: 'order-processing-system',
  title: 'Order Processing & Transaction Engine',
  tagline: 'High-reliability e-commerce order state engine featuring idempotency keys, atomic transaction boundaries, and resilient payment failure handling.',
  role: 'Backend Developer',
  status: 'Completed',
  categories: ['Java', 'Spring Boot', 'Backend', 'Database', 'System Design'],
  technologies: [
    'Java 17',
    'Spring Boot 3',
    'Spring Data JPA',
    'PostgreSQL',
    'HikariCP',
    'JUnit 5',
    'Mockito',
    'Docker'
  ],
  engineeringFocus: [
    'Idempotent API Design',
    'Transaction Boundaries',
    'Payment Failure Compensation',
    'State Machine Workflows',
    'Centralized Error Handling'
  ],
  githubUrl: 'https://github.com/manohar-kunda/order-processing-engine',
  liveUrl: '',
  
  problemStatement: 'In distributed e-commerce transactions, network timeouts between customer clients, payment gateways, and databases cause duplicate order charges, orphaned payment records, and inconsistent order states.',
  targetUsers: [
    'E-commerce platforms requiring fault-tolerant checkout pipelines',
    'Finance & billing teams requiring 100% reconciliation between payment gateways and order records'
  ],
  solutionSummary: 'Architected a resilient order engine implementing an Idempotency-Key validation filter, explicit state machine transitions (PENDING -> CHARGING -> CONFIRMED / FAILED), and automated compensation routines.',
  whyIBuiltThis: 'I wanted to deeply understand how professional backend systems avoid the classic "charged card but order not created" bug and how to implement proper idempotency without relying on third-party black-box tools.',

  architecture: {
    overview: 'Event-informed state machine architecture where every order state transition is logged immutably and financial operations execute outside database transaction locks.',
    pattern: 'State Machine & Intent-First Architecture',
    layers: [
      {
        name: 'Idempotency & Filter Layer',
        role: 'Intercepts incoming mutation requests before controller execution.',
        technologies: ['Spring OncePerRequestFilter', 'Idempotency Key Table'],
        description: 'Verifies whether the client provided an Idempotency-Key. If already processed, returns cached response immediately.'
      },
      {
        name: 'Order Orchestration Service',
        role: 'Drives the order lifecycle state transitions and coordinates payment gateway calls.',
        technologies: ['Spring Service', '@Transactional boundaries'],
        description: 'Separates database state persistence from external network calls to prevent holding DB connections during network I/O.'
      },
      {
        name: 'Payment Integration Adapter',
        role: 'Integrates with payment gateway simulator with strict timeouts and error classification.',
        technologies: ['RestTemplate / HttpComponents', 'Custom Timeout Factory'],
        description: 'Handles transient network failures with controlled retries while mapping gateway errors to clean business outcomes.'
      },
      {
        name: 'Persistence & Lock Layer',
        role: 'Stores orders, line items, and payment transactions.',
        technologies: ['Spring Data JPA', 'PostgreSQL', '@Version optimistic locking'],
        description: 'Maintains state consistency with strict foreign keys and pessimistic/optimistic concurrency controls.'
      }
    ],
    requestFlowSteps: [
      'Client issues POST /api/v1/orders with header "Idempotency-Key: <UUID>".',
      'IdempotencyFilter checks if key exists in PostgreSQL idempotency_records.',
      'If key exists and status is COMPLETED, cached HTTP 200 payload is returned immediately.',
      'If key is new, order is inserted in status PENDING_PAYMENT within Transaction #1 and committed.',
      'PaymentAdapter calls external payment gateway OUTSIDE of any database transaction.',
      'If payment succeeds, Transaction #2 commits order status CONFIRMED and records payment reference.',
      'If payment fails, Transaction #2 commits order status PAYMENT_FAILED with error reason.'
    ]
  },

  apiDesign: [
    {
      method: 'POST',
      path: '/api/v1/orders',
      summary: 'Place order with mandatory idempotency key to prevent double charging.',
      idempotent: true,
      requestBodySnippet: `{
  "customerId": 8021,
  "items": [
    { "productId": 102, "quantity": 2, "unitPrice": 49.99 }
  ],
  "shippingAddress": {
    "street": "12 Tech Boulevard",
    "city": "Bengaluru",
    "postalCode": "560001"
  },
  "paymentMethod": "CARD_TOKEN_xyz981"
}`,
      responseSnippet: `{
  "orderId": "ord_91823102",
  "status": "CONFIRMED",
  "totalAmount": 99.98,
  "paymentReference": "pay_tx_772194",
  "createdAt": "2026-09-22T14:20:00Z"
}`,
      statusCodes: ['201 Created', '200 OK (Idempotent replay)', '400 Bad Request', '409 Conflict']
    },
    {
      method: 'GET',
      path: '/api/v1/orders/{id}',
      summary: 'Fetch full order state history and line items.',
      idempotent: true,
      responseSnippet: `{
  "orderId": "ord_91823102",
  "status": "CONFIRMED",
  "stateHistory": [
    { "state": "PENDING_PAYMENT", "timestamp": "2026-09-22T14:20:00Z" },
    { "state": "CONFIRMED", "timestamp": "2026-09-22T14:20:02Z" }
  ]
}`,
      statusCodes: ['200 OK', '404 Not Found']
    }
  ],

  databaseDesign: {
    engine: 'PostgreSQL',
    rationale: 'Transactional durability is critical for financial ledger and order transitions.',
    tables: [
      {
        tableName: 'orders',
        purpose: 'Primary order header and current lifecycle status.',
        primaryKey: 'id BIGSERIAL',
        keyColumns: ['order_number VARCHAR(64) UNIQUE', 'customer_id BIGINT', 'status VARCHAR(32)', 'total_amount DECIMAL(12,2)', 'version BIGINT'],
        relationships: 'One-to-many with order_items and order_events.'
      },
      {
        tableName: 'order_items',
        purpose: 'Specific product line items, quantities, and frozen prices.',
        primaryKey: 'id BIGSERIAL',
        keyColumns: ['order_id BIGINT (FK)', 'product_id BIGINT', 'quantity INT', 'unit_price DECIMAL(10,2)'],
        relationships: 'Many-to-one with orders.'
      },
      {
        tableName: 'idempotency_keys',
        purpose: 'Deduplication ledger storing processed client request hashes and cached response bodies.',
        primaryKey: 'key_hash VARCHAR(128)',
        keyColumns: ['status VARCHAR(32)', 'response_body TEXT', 'created_at TIMESTAMP', 'expires_at TIMESTAMP'],
        relationships: 'Standalone deduplication lookup table.'
      }
    ],
    indexingAndConstraints: [
      'UNIQUE INDEX idx_idempotency_key ON idempotency_keys(key_hash)',
      'INDEX idx_orders_customer ON orders(customer_id, created_at DESC)'
    ]
  },

  engineeringDecisions: [
    {
      topic: 'Intent-First Persistence: Save PENDING before Payment Gateway call',
      chosenApproach: 'Persist the order in status PENDING_PAYMENT in database Transaction 1, commit, then invoke payment API.',
      whyChosen: 'If the app called the payment gateway first without saving an order record, a server crash immediately after payment would charge the customer without any trace in the database.',
      alternativesConsidered: ['Keep single long @Transactional method wrapping payment call (dangerous: holds DB connection open during network call)'],
      tradeOffs: 'Leaves records in PENDING_PAYMENT if customer abandons or if network cuts out; solved with a scheduled 15-minute expiration job.'
    },
    {
      topic: 'Idempotency Storage: Database Table vs In-Memory Cache (Redis)',
      chosenApproach: 'Relational table with unique constraint and atomic insert.',
      whyChosen: 'Ensures transactional atomicity with the order creation workflow and avoids cache eviction risks.',
      alternativesConsidered: ['Redis SETNX with TTL (excellent for scale, but adds external infrastructure dependency)'],
      tradeOffs: 'Adds a small database write on mutating requests; mitigated by indexing and daily cleanup of expired keys.'
    }
  ],

  challenges: [
    {
      title: 'Payment Gateway Timeout Handling',
      scenario: 'Payment gateway API times out after 10 seconds. The gateway may or may not have processed the charge.',
      rootCause: 'HTTP socket timeout does not distinguish between request loss, processing delay, or response drop.',
      solutionImplemented: 'Configured a 4-second read timeout. Upon SocketTimeoutException, marked the order status as PAYMENT_UNCONFIRMED and enqueued an asynchronous verification job that polls the payment gateway status API using the merchant order ID before initiating any refund.'
    }
  ],

  testing: {
    unitTesting: 'State machine transition unit tests ensuring invalid transitions (e.g. FAILED -> CONFIRMED) are strictly rejected.',
    integrationTesting: '@SpringBootTest verifying idempotency key deduplication and transactional rollback on simulated payment errors.',
    mockingAndSlices: 'Mocking HTTP payment gateway using MockRestServiceServer to simulate network timeouts, HTTP 500s, and card declines.',
    validationScenarios: [
      'Duplicate request with same idempotency key returns exact same response without re-executing payment',
      'Order total matches sum of (quantity * unit_price) exactly',
      'Database transaction rolls back cleanly if line item insert fails'
    ]
  },

  deployment: {
    runtimeEnvironment: 'Java 17 (OpenJDK) + Spring Boot 3',
    buildSystem: 'Maven',
    containerization: 'Docker container with health checks (/actuator/health)',
    cloudOrHosting: 'Linux VM / AWS EC2 with systemd process supervision',
    ciCdWorkflow: 'GitHub Actions automated build and test pipeline'
  },

  lessonsLearned: [
    'Never execute third-party network I/O inside a database transaction boundary.',
    'Designing for failure upfront (idempotency, timeouts, retries) makes systems vastly easier to reason about in production.',
    'Clear enum-driven state transitions eliminate entire categories of invalid state bugs.'
  ],

  whatIWouldImproveNext: [
    'Introduce the Outbox Pattern with a message broker for publishing OrderConfirmed events to downstream fulfillment services.',
    'Implement Redis-based distributed locking for multi-instance deployments.'
  ],

  interviewerQuestions: [
    {
      question: 'What happens if the payment succeeds but the server crashes before updating the order status in the database?',
      whyInterviewersAskThis: 'Classic distributed systems question evaluating understanding of dual-write problems.',
      suggestedAnswerPoints: [
        'Because the order was already saved as PENDING_PAYMENT before calling the payment gateway with the merchant order ID, the payment gateway record and local DB record share the same correlation ID.',
        'A scheduled reconciliation job inspects orders stuck in PENDING_PAYMENT for > 10 minutes, queries the payment gateway API with the correlation ID, and updates the local state accordingly or initiates a refund.'
      ],
      relevantConcept: 'Dual-Write Problem & Reconciliation Jobs'
    },
    {
      question: 'Why should you NOT wrap external HTTP calls inside a Spring @Transactional method?',
      whyInterviewersAskThis: 'Tests practical understanding of connection pooling and transaction lifecycle.',
      suggestedAnswerPoints: [
        'A @Transactional method borrows a database connection from the HikariCP pool at method start.',
        'If an external API call takes 3–5 seconds to respond or hangs, that database connection remains locked and idle.',
        'Under moderate traffic, this rapidly exhausts the entire database connection pool, taking down the entire application.'
      ],
      relevantConcept: 'Connection Pool Starvation & Transaction Scoping'
    }
  ]
};
