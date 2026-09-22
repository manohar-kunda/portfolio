# Kunda Manohar — Developer Portfolio

A production-grade, engineering-first personal portfolio website for **Kunda Manohar** (Master of Computer Applications - MCA), targeting roles as a **Java Full Stack Developer / Java Backend Engineer / Software Engineer**.

Designed specifically to provide technical interviewers, senior engineers, engineering managers, and technical recruiters with immediate credibility, verifiable code patterns, and deep architectural case studies.

---

## Technical Highlights

- **Engineering-First Aesthetics**: Clean developer-product aesthetic inspired by GitHub, Linear, and modern engineering documentation. Zero flashy gimmicks, zero fake metrics, and zero arbitrary percentage bars.
- **6-Tier Interactive Engineering Stack**: Interactive panel breaking down technologies, architectural roles, and design patterns from Frontend through REST APIs, Business Logic, Persistence, Database, and DevOps.
- **Deep Technical Case Studies**: Every project is presented as an architectural case study with non-reloading technical tabs:
  1. *Overview* (Problem, Users, Solution, Motivation)
  2. *Architecture* (Layer diagrams, Request flow steps)
  3. *API Design* (REST endpoints, Idempotency flags, JSON request/response payloads)
  4. *Database Design* (PostgreSQL/MySQL rationale, Schema tables, Primary/Foreign keys, Check constraints, Indexes)
  5. *Engineering Decisions* (Why Spring Boot? Why PostgreSQL? Alternatives considered, Trade-offs)
  6. *Challenges & Failure Modes* (Real concurrency race conditions, timeouts, N+1 query resolutions)
  7. *Testing & Quality* (JUnit 5, Mockito, @DataJpaTest slice tests, validation scenarios)
  8. *Deployment & Lessons* (Docker, build pipeline, key takeaways, future improvements)
  9. *Interviewer Q&A Generator* (Specific architectural interview questions with candidate talking points)
- **Defensive Engineering Mindset**: Interactive matrix demonstrating how the candidate handles critical failure modes:
  - Duplicate requests → Idempotency keys & unique DB constraints
  - Payment succeeds but order fails → Transaction boundaries & reconciliation jobs
  - External service outage → Strict socket timeouts & graceful degradation
  - Concurrent writes → JPA Optimistic Locking (@Version)
  - Worker crashes → Manual ACK & Dead Letter Queues (DLQ)
  - Malformed data → Jakarta Bean Validation (@Valid) & RFC 7807 Problem Details
- **Interviewer Fast-Track Lens ("For Interviewers")**: A 60-second summary providing interviewers with discussion topics, key concepts demonstrated, and direct source code links.
- **Developer Command Palette (`Ctrl + K` / `Cmd + K`)**: Instant keyboard navigation to search projects by technology or concept (e.g. "kafka", "postgres", "idempotency"), jump to sections, or open links.
- **Zero-Redesign Project Extensibility**: Structured TypeScript project schema where adding a new project requires writing only a data file. See [docs/ADDING_A_PROJECT.md](docs/ADDING_A_PROJECT.md).

---

## Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Framework & Build** | React 19, TypeScript 5.8, Vite 8 |
| **Styling & Theme** | Tailwind CSS v4, Custom Dark/Slate Design Tokens |
| **Icons & UI** | Lucide React, Custom SVG Brand Icons |
| **Architecture** | Component-driven, Strict TypeScript Schemas, Zero Bloat |

---

## Featured Projects in Portfolio

1. **Enterprise Inventory, Warehouse & Procurement Management Platform**
   - *Stack*: Java 17, Spring Boot 3, Spring Data JPA, PostgreSQL, Flyway, React, TypeScript, Docker
   - *Key Concepts*: Multi-warehouse inventory tracking, non-negative stock invariants, JPA `@Version` optimistic locking, Flyway migrations, and immutable audit logs.
2. **Order Processing & Transaction Engine**
   - *Stack*: Java 17, Spring Boot 3, Spring Data JPA, PostgreSQL, HikariCP, JUnit 5, Mockito
   - *Key Concepts*: Idempotent API design via `Idempotency-Key` headers, intent-first persistence, payment failure compensation, and transaction scoping.
3. **Asynchronous Event Processing Pipeline**
   - *Stack*: Java 17, Spring Boot 3, RabbitMQ / Spring AMQP, PostgreSQL, Docker
   - *Key Concepts*: Decoupled queue workers, at-least-once delivery, exponential backoff retries, dead letter queue (DLQ) isolation, and poison pill quarantine.
4. **SkillLens Pro: Career & Skill Matrix Platform**
   - *Stack*: Java 17, Spring Boot 3, PostgreSQL, React 18, TypeScript, Tailwind CSS, OpenAI REST API
   - *Key Concepts*: Full-stack architecture, secure backend API key proxying, token-bucket rate limiting, and strict JSON Schema output parsing.

---

## Local Development & Setup

### Prerequisites
- Node.js `>= 20.x`
- npm `>= 10.x`

### Installation
```bash
# Clone the repository
git clone https://github.com/manohar-kunda/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start local development server
npm run dev
```
The application will be live at `http://localhost:5173`.

---

## Production Build & Verification

```bash
# Run TypeScript compilation and Vite production build
npm run build

# Preview production build locally
npm run preview
```

The production build generates an optimized static bundle in the `dist/` directory with zero runtime errors.

---

## Deployment Instructions

### Deploy to Vercel (Recommended)
1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the repository. Vercel automatically detects Vite:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.

### Deploy to Netlify
1. Connect repository in Netlify.
2. Set Build command to `npm run build` and Publish directory to `dist`.
3. Deploy site.

### Deploy to GitHub Pages
1. In `vite.config.ts`, set `base: '/<repository-name>/'` if deploying to a project subpath.
2. Use GitHub Actions with the standard `actions/deploy-pages` workflow.

---

## How to Add a New Project

Adding a new project requires **zero UI changes**.
Refer to the detailed guide:
👉 **[docs/ADDING_A_PROJECT.md](docs/ADDING_A_PROJECT.md)**

---

## Candidate Profile

- **Candidate**: Kunda Manohar
- **Target Roles**: Java Full Stack Developer / Java Backend Engineer / Software Engineer
- **Education**: Master of Computer Applications (MCA)
- **Location**: Bengaluru, India
- **Email**: [kunda.manohar.dev@gmail.com](mailto:kunda.manohar.dev@gmail.com)
- **GitHub**: [github.com/manohar-kunda](https://github.com/manohar-kunda)
- **LinkedIn**: [linkedin.com/in/kunda-manohar](https://linkedin.com/in/kunda-manohar)

---

## License
MIT License. Created by Kunda Manohar.
