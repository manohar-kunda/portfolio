import type { EngineeringScenario } from '../types/candidate';

export const engineeringScenarios: EngineeringScenario[] = [
  {
    id: 'idempotency-duplicate-requests',
    question: 'What happens if the same mutation request arrives twice?',
    scenario: 'A user clicks "Submit Order" twice, or a mobile client experiences a network glitch and automatically resends a POST request.',
    engineeringConcept: 'Idempotency Key & Unique DB Constraints',
    howIHandleIt: 'I enforce an Idempotency-Key header on critical mutating endpoints (e.g. POST /api/v1/orders). The backend checks an idempotency table within an atomic transaction. If the key exists and processing is complete, the cached response is returned immediately. A database unique constraint on the key column guarantees that concurrent duplicate requests fail fast with an HTTP 409 or return the existing resource.',
    snippetLanguage: 'java',
    codeSnippet: `@PostMapping("/orders")
public ResponseEntity<OrderResponse> placeOrder(
    @RequestHeader("Idempotency-Key") String idempotencyKey,
    @Valid @RequestBody CreateOrderRequest request) {
    
    return idempotencyService.execute(idempotencyKey, () -> {
        return orderService.createOrder(request);
    });
}`
  },
  {
    id: 'partial-failure-distributed-actions',
    question: 'What happens if payment succeeds but subsequent order recording fails?',
    scenario: 'An external payment gateway charges the customer credit card successfully, but the local database transaction fails or crashes before saving the order record.',
    engineeringConcept: 'Transaction Boundaries & Compensating Actions',
    howIHandleIt: 'External API network calls must never be executed inside a local database @Transactional boundary to avoid holding database connections hostage. Instead, the order is first saved in a PENDING_PAYMENT status. Only after the external payment gateway returns success is the order transitioned to PAID. If the local update fails, an automated reconciliation job reconciles orphaned charges using payment reference IDs.',
    snippetLanguage: 'java',
    codeSnippet: `// 1. Save intent in DB first
Order order = orderRepository.save(new Order(request, OrderStatus.PENDING_PAYMENT));

// 2. Call external gateway OUTSIDE @Transactional
PaymentResult result = paymentGateway.charge(order.getId(), request.getPaymentDetails());

// 3. Update status or trigger compensation
if (result.isSuccess()) {
    orderService.markAsPaid(order.getId(), result.getTransactionId());
} else {
    orderService.markAsFailed(order.getId(), result.getFailureReason());
}`
  },
  {
    id: 'external-service-outage',
    question: 'What happens if an external service or downstream API hangs or fails?',
    scenario: 'A third-party shipping rate API or notification service takes 30 seconds to respond or throws HTTP 503 errors during traffic spikes.',
    engineeringConcept: 'Strict Timeouts, Circuit Breakers & Graceful Degradation',
    howIHandleIt: 'I configure strict connect (2s) and read (3s) timeouts on HTTP clients so downstream delays do not exhaust Tomcat servlet worker threads. For non-critical dependencies like email alerts, notifications are pushed to an asynchronous queue rather than blocking the user response.',
    snippetLanguage: 'java',
    codeSnippet: `@Bean
public RestTemplate externalServiceClient() {
    HttpComponentsClientHttpRequestFactory factory = 
        new HttpComponentsClientHttpRequestFactory();
    factory.setConnectTimeout(2000); // 2s connection timeout
    factory.setConnectionRequestTimeout(2000);
    return new RestTemplate(factory);
}`
  },
  {
    id: 'concurrent-updates-race-condition',
    question: 'What happens if two users update the same record at the exact same millisecond?',
    scenario: 'Two warehouse staff update inventory stock for the same SKU at the same time, or two customers attempt to reserve the final remaining item in stock.',
    engineeringConcept: 'Optimistic Locking with @Version Column',
    howIHandleIt: 'I utilize JPA Optimistic Locking with a @Version column on mutable entity tables. When a concurrent write occurs, Hibernate verifies that the entity version matches before executing the UPDATE. The second update detects a version mismatch and throws an OptimisticLockException, which is caught and returned as an HTTP 409 Conflict with guidance to refresh.',
    snippetLanguage: 'java',
    codeSnippet: `@Entity
@Table(name = "product_inventory")
public class InventoryItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Integer availableStock;

    @Version
    private Long version; // Incremented automatically on every update
}`
  },
  {
    id: 'asynchronous-worker-crash',
    question: 'What happens if a background worker or consumer crashes halfway through an event?',
    scenario: 'A message queue consumer receives an order fulfillment message, parses the payload, but crashes right before acknowledging the message.',
    engineeringConcept: 'At-Least-Once Delivery & Dead Letter Queue (DLQ)',
    howIHandleIt: 'Consumers use manual message acknowledgement (ACK) only after the processing transaction commits successfully. If the worker crashes, the unacknowledged message is requeued. Consumer logic is designed to be idempotent. After a configured retry threshold (e.g., 3 retries with exponential backoff), poison messages are routed to a Dead Letter Queue (DLQ) to prevent blocking the pipeline.',
    snippetLanguage: 'java',
    codeSnippet: `@RabbitListener(queues = "order.events.queue")
public void handleOrderEvent(OrderEvent event, Channel channel, @Header(AmqpHeaders.DELIVERY_TAG) long tag) {
    try {
        orderFulfillmentService.process(event);
        channel.basicAck(tag, false); // ACK only upon successful commit
    } catch (Exception ex) {
        // Reject and send to Dead Letter Exchange after retries
        channel.basicNack(tag, false, false);
    }
}`
  },
  {
    id: 'poison-data-input',
    question: 'What happens when malformed, incomplete, or malicious data hits the API?',
    scenario: 'A client submits an order with negative item quantities, missing required shipping fields, or unexpected null attributes.',
    engineeringConcept: 'Strict Bean Validation & Centralized Problem Details',
    howIHandleIt: 'Controllers enforce strict DTO validation using Jakarta Bean Validation (@NotNull, @Positive, @Size). Field validation failures never trigger generic HTTP 500 errors. Instead, a global @RestControllerAdvice intercepts MethodArgumentNotValidException and converts it into a standardized RFC 7807 error payload listing each field violation and remediation.',
    snippetLanguage: 'java',
    codeSnippet: `@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ProblemDetail> handleValidation(MethodArgumentNotValidException ex) {
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        problem.setTitle("Validation Failed");
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(e -> 
            errors.put(e.getField(), e.getDefaultMessage()));
        problem.setProperty("invalidFields", errors);
        return ResponseEntity.badRequest().body(problem);
    }
}`
  }
];
