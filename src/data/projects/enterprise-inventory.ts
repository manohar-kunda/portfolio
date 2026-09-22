import type { Project } from '../../types/project';

export const enterpriseInventoryProject: Project = {
  id: 'proj-enterprise-inventory',
  slug: 'enterprise-inventory-procurement',
  title: 'Enterprise Inventory & Procurement Platform',
  tagline: 'Multi-warehouse inventory tracking and procurement workflows designed around strict transactional consistency and immutable audit logs.',
  role: 'Full Stack Developer',
  status: 'Completed',
  categories: ['Java', 'Spring Boot', 'Backend', 'Full Stack', 'Database'],
  technologies: [
    'Java 17',
    'Spring Boot 3',
    'Spring Data JPA',
    'PostgreSQL',
    'Flyway',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Docker',
    'JUnit 5',
    'Mockito'
  ],
  engineeringFocus: [
    'Transaction Consistency',
    'Stock Invariant Enforcement',
    'Optimistic Locking',
    'Flyway Migrations',
    'Clean Architecture',
    'Audit Trails'
  ],
  githubUrl: 'https://github.com/manohar-kunda/enterprise-inventory-platform',
  liveUrl: '',
  
  problemStatement: 'Multi-location inventory systems frequently suffer from negative inventory balances, concurrency race conditions during simultaneous batch receipts, and untracked manual stock adjustments.',
  targetUsers: [
    'Warehouse Operations Managers tracking stock across locations',
    'Procurement Officers managing supplier purchase orders and receipts',
    'System Auditors requiring immutable logs of all stock adjustments'
  ],
  solutionSummary: 'Engineered a modular Spring Boot & React platform enforcing strict transactional consistency, automated stock reserve/release workflows, and immutable audit logs with zero negative inventory anomalies.',
  whyIBuiltThis: 'I built this project to master real-world transactional integrity, explore how optimistic locking behaves under concurrent inventory writes, and practice clean layered domain architecture in Spring Boot.',
  
  architecture: {
    overview: 'Structured as a Clean Layered Monolith with strict unidirectional dependency flow from Web Transport -> Application Services -> Domain Entities -> Persistence Repositories.',
    pattern: 'Layered Monolith / Clean Architecture',
    layers: [
      {
        name: 'Client Presentation Layer',
        role: 'Interactive UI with immediate feedback, responsive tables, and validation feedback.',
        technologies: ['React 18', 'TypeScript', 'Tailwind CSS'],
        description: 'Single-page interface managing warehouse inventory views, purchase order creation wizards, and stock adjustment logs.'
      },
      {
        name: 'REST Controller & DTO Layer',
        role: 'HTTP semantics enforcement, request routing, and payload validation.',
        technologies: ['Spring MVC', 'Jakarta Validation (@Valid)', 'RFC 7807 ProblemDetails'],
        description: 'Translates incoming JSON requests to validated command DTOs and maps domain models to response representations.'
      },
      {
        name: 'Application Service & Business Logic',
        role: 'Orchestrates business workflows, transaction boundaries, and domain invariant checks.',
        technologies: ['Spring Service', '@Transactional(rollbackFor = Exception.class)'],
        description: 'Coordinates inventory allocations, checks quantity thresholds, and records audit ledger entries atomically.'
      },
      {
        name: 'Domain & Persistence Layer',
        role: 'Relational mapping, database constraints, and atomic queries.',
        technologies: ['Spring Data JPA', 'Hibernate 6', 'PostgreSQL 15', 'HikariCP'],
        description: 'Encapsulates data persistence with optimistic locking (@Version) and composite foreign key integrity.'
      }
    ],
    requestFlowSteps: [
      'Client submits POST /api/v1/inventory/adjustments with stock delta and audit reason.',
      'Spring MVC validates request body using Jakarta Bean Validation (@NotNull, @Min).',
      'InventoryAdjustmentService initiates @Transactional boundary with READ_COMMITTED isolation.',
      'Service loads WarehouseInventory entity; verifies that (currentStock + delta >= 0).',
      'Hibernate increments entity @Version and persists InventoryAuditLog within the same atomic commit.',
      'If another worker updated the row concurrently, OptimisticLockException triggers an HTTP 409 Conflict.'
    ]
  },

  apiDesign: [
    {
      method: 'POST',
      path: '/api/v1/inventory/adjustments',
      summary: 'Adjust warehouse stock level with mandatory audit reason and idempotency key.',
      idempotent: true,
      requestBodySnippet: `{
  "warehouseId": 104,
  "productId": 5021,
  "quantityDelta": -25,
  "reasonCode": "DISPATCH_ORDER_482",
  "notes": "Verified pallet count at Bay 4"
}`,
      responseSnippet: `{
  "adjustmentId": "adj_8849201",
  "productId": 5021,
  "warehouseId": 104,
  "previousStock": 100,
  "newStock": 75,
  "timestamp": "2026-09-22T10:15:30Z"
}`,
      statusCodes: ['200 OK', '400 Bad Request', '409 Conflict', '422 Unprocessable Entity']
    },
    {
      method: 'GET',
      path: '/api/v1/products/{id}/stock-levels',
      summary: 'Retrieve real-time available and reserved stock breakdown across all warehouses.',
      idempotent: true,
      responseSnippet: `{
  "productId": 5021,
  "totalAvailable": 320,
  "totalReserved": 45,
  "warehouseBreakdown": [
    { "warehouseId": 101, "name": "Bengaluru Central", "available": 200, "reserved": 30 },
    { "warehouseId": 104, "name": "Whitefield Hub", "available": 120, "reserved": 15 }
  ]
}`,
      statusCodes: ['200 OK', '404 Not Found']
    },
    {
      method: 'POST',
      path: '/api/v1/procurement/purchase-orders',
      summary: 'Draft and submit a multi-item supplier purchase order.',
      idempotent: false,
      requestBodySnippet: `{
  "supplierId": 98,
  "expectedDeliveryDate": "2026-10-05",
  "lineItems": [
    { "productId": 5021, "orderedQuantity": 500, "unitPrice": 14.50 },
    { "productId": 3012, "orderedQuantity": 150, "unitPrice": 42.00 }
  ]
}`,
      responseSnippet: `{
  "poNumber": "PO-2026-00492",
  "status": "SUBMITTED",
  "totalAmount": 13550.00,
  "itemCount": 2
}`,
      statusCodes: ['201 Created', '400 Bad Request']
    }
  ],

  databaseDesign: {
    engine: 'PostgreSQL',
    rationale: 'PostgreSQL provides robust ACID guarantees, table-level CHECK constraints for non-negative inventory balances, and reliable row versioning.',
    tables: [
      {
        tableName: 'warehouses',
        purpose: 'Physical storage facility records and geo-location metadata.',
        primaryKey: 'id BIGSERIAL',
        keyColumns: ['code VARCHAR(32) UNIQUE', 'name VARCHAR(128)', 'is_active BOOLEAN'],
        relationships: 'One-to-many with warehouse_inventory.'
      },
      {
        tableName: 'products',
        purpose: 'Master SKU catalog and physical dimensions.',
        primaryKey: 'id BIGSERIAL',
        keyColumns: ['sku VARCHAR(64) UNIQUE', 'name VARCHAR(255)', 'category VARCHAR(64)'],
        relationships: 'One-to-many with warehouse_inventory and purchase_order_items.'
      },
      {
        tableName: 'warehouse_inventory',
        purpose: 'Current physical stock levels per SKU and warehouse with optimistic lock counter.',
        primaryKey: 'id BIGSERIAL',
        keyColumns: [
          'warehouse_id BIGINT (FK)',
          'product_id BIGINT (FK)',
          'available_quantity INT CHECK (available_quantity >= 0)',
          'reserved_quantity INT CHECK (reserved_quantity >= 0)',
          'version BIGINT NOT NULL'
        ],
        relationships: 'Composite unique index on (warehouse_id, product_id).'
      },
      {
        tableName: 'inventory_audit_log',
        purpose: 'Append-only ledger of every stock modification for regulatory compliance.',
        primaryKey: 'id BIGSERIAL',
        keyColumns: ['product_id BIGINT', 'warehouse_id BIGINT', 'delta INT', 'reason VARCHAR(64)', 'created_at TIMESTAMP'],
        relationships: 'Foreign keys to products and warehouses.'
      }
    ],
    indexingAndConstraints: [
      'UNIQUE INDEX idx_wh_prod ON warehouse_inventory(warehouse_id, product_id)',
      'INDEX idx_audit_prod_wh ON inventory_audit_log(product_id, warehouse_id, created_at DESC)',
      'CHECK constraint (available_quantity >= 0) directly on PostgreSQL engine level'
    ]
  },

  engineeringDecisions: [
    {
      topic: 'Database Selection: PostgreSQL vs NoSQL / Document Store',
      chosenApproach: 'PostgreSQL relational database with strict foreign keys and check constraints.',
      whyChosen: 'Inventory balances cannot tolerate eventual consistency. In an e-commerce or warehouse environment, selling non-existent inventory leads to expensive cancellations and broken SLAs.',
      alternativesConsidered: ['MongoDB (rejected due to lack of cross-document transaction safety for ledger logs)', 'MySQL (viable, but PostgreSQL offered superior check constraint support and JSONB flexibility)'],
      tradeOffs: 'Requires careful connection pool sizing (HikariCP) and indexing discipline compared to schemaless document stores.'
    },
    {
      topic: 'Concurrency Control: Optimistic Locking (@Version) vs Pessimistic (PESSIMISTIC_WRITE)',
      chosenApproach: 'JPA Optimistic Locking using an entity @Version column.',
      whyChosen: 'Warehouse item lookups and reads vastly outnumber simultaneous write collisions (over 15:1 ratio). Pessimistic locking (SELECT FOR UPDATE) holds database row locks across API execution times, creating contention bottlenecks.',
      alternativesConsidered: ['Pessimistic Locking (SELECT ... FOR UPDATE)', 'Distributed locks via Redis'],
      tradeOffs: 'Under high write contention, transactions may throw OptimisticLockException, requiring client retry or application-level retry logic.'
    },
    {
      topic: 'Schema Versioning: Flyway vs Hibernate auto-ddl (ddl-auto=update)',
      chosenApproach: 'Flyway version-controlled SQL migration scripts (V1__init.sql, V2__indexes.sql).',
      whyChosen: 'Automated ddl-auto=update in production risks unverified column drops, unexpected table locks, and untracked changes across staging and production.',
      alternativesConsidered: ['Hibernate ddl-auto=validate', 'Liquibase XML/YAML changelogs'],
      tradeOffs: 'Requires developers to write deterministic raw SQL migration scripts for every schema alteration.'
    }
  ],

  challenges: [
    {
      title: 'Race Condition During Simultaneous Order Allocations',
      scenario: 'When two concurrent orders attempted to allocate the remaining 5 units of a high-demand SKU at the exact same millisecond, stock initially fell to -5.',
      rootCause: 'Read-then-write pattern without row concurrency control allowed both transactions to see available_stock = 5, both pass validation, and both decrement.',
      solutionImplemented: 'Introduced JPA @Version on the inventory entity combined with an engine-level PostgreSQL CHECK (available_quantity >= 0). Caught OptimisticLockException in Spring @RestControllerAdvice and returned an informative HTTP 409 Conflict.'
    },
    {
      title: 'N+1 Query Explosion on Multi-Warehouse Inventory Lookups',
      scenario: 'Fetching product stock across 8 regional warehouses generated 1 + 8 separate SQL SELECT queries per product.',
      rootCause: 'Spring Data JPA default lazy loading on @OneToMany warehouse relationships inside a loop.',
      solutionImplemented: 'Replaced standard findById with a custom JPQL query utilizing JOIN FETCH (or @EntityGraph) to load the product and its warehouse inventory records in a single optimized SQL query.'
    }
  ],

  testing: {
    unitTesting: 'JUnit 5 and AssertJ verifying inventory domain rules, stock allocation calculations, and state transition logic.',
    integrationTesting: 'Spring Boot @DataJpaTest verifying repository queries, unique constraint violations, and Flyway migration execution.',
    mockingAndSlices: 'Mockito used to mock external supplier notification services while keeping the core transactional service under test.',
    validationScenarios: [
      'Reject negative stock adjustment when available stock is insufficient',
      'Verify automatic creation of inventory_audit_log entry on every stock adjustment',
      'Verify OptimisticLockException thrown when version numbers mismatch',
      'Verify purchase order status transition from SUBMITTED -> RECEIVED'
    ]
  },

  deployment: {
    runtimeEnvironment: 'Java 17 (OpenJDK) + Spring Boot 3 embedded Tomcat',
    buildSystem: 'Apache Maven (mvn clean package)',
    containerization: 'Multi-stage Dockerfile packaging production JAR with minimal JRE base image',
    cloudOrHosting: 'Containerized deployment with PostgreSQL managed service',
    ciCdWorkflow: 'GitHub Actions running mvn verify, SpotBugs static analysis, and automated tests on pull requests'
  },

  lessonsLearned: [
    'Database constraints are the ultimate safety net: application-level validation alone is insufficient under high concurrency.',
    'Clear separation of read and write models prevents unnecessary ORM complexity.',
    'Always use JOIN FETCH when eager loading is required for a specific business use case instead of changing entity-wide FetchType.'
  ],

  whatIWouldImproveNext: [
    'Implement Redis caching for high-read catalog items with cache invalidation on inventory changes.',
    'Introduce an asynchronous event bus for warehouse notifications to decouple order fulfillment from procurement alerts.'
  ],

  interviewerQuestions: [
    {
      question: 'How do you guarantee that inventory counts never fall below zero under concurrent access?',
      whyInterviewersAskThis: 'Tests candidate understanding of database concurrency, ACID properties, and race condition handling.',
      suggestedAnswerPoints: [
        'Defense-in-depth: Application-level check (currentStock + delta >= 0) inside a @Transactional boundary.',
        'JPA Optimistic Locking (@Version) prevents lost updates by rejecting writes with stale versions.',
        'PostgreSQL CHECK constraint (available_quantity >= 0) acts as an unbreakable guarantee at the storage layer.'
      ],
      relevantConcept: 'Concurrency Control & ACID Transactions'
    },
    {
      question: 'Why did you choose Flyway instead of letting Hibernate manage database tables?',
      whyInterviewersAskThis: 'Evaluates production readiness and discipline regarding database schema management.',
      suggestedAnswerPoints: [
        'Hibernate ddl-auto=update is dangerous for production: it can cause silent schema mutations or lock tables during startup.',
        'Flyway ensures deterministic, reproducible migrations tracked in Git and applied predictably across dev, staging, and prod.',
        'Schema versioning allows rolling forward with reviewed SQL scripts.'
      ],
      relevantConcept: 'Database Migrations & Infrastructure Discipline'
    },
    {
      question: 'What happens if the inventory adjustment succeeds but the audit log insert fails?',
      whyInterviewersAskThis: 'Tests understanding of Spring transaction rollback and atomic boundaries.',
      suggestedAnswerPoints: [
        'Both operations are executed within the same @Transactional method.',
        'Spring manages the JDBC transaction; if the audit insert fails with a RuntimeException, Spring triggers a rollback of the entire transaction.',
        'Neither the stock modification nor the audit row is committed, preserving audit ledger consistency.'
      ],
      relevantConcept: 'Spring Transaction Management (@Transactional)'
    }
  ]
};
