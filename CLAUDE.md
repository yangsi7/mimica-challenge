# **CLAUDE.md**

This file is the project‑specific entrypoint for Claude Code when working on the **Mimica Analytics Platform** prototype. It explains how to run, develop and retrieve documentation from this repository. The playbook aligns with **version 5.0** of the universal process (see @working\_files/CLAUDE\_PROCESS.md), which groups modules into high‑level categories and introduces context & knowledge‑graph management, performance optimisation, code review & peer review, design versioning & accessibility testing, security audits and CI/CD guidance. This project builds an interactive dashboard using **Next.js (App Router)** and synthetic data to visualise cross‑region metrics, variant distributions and bottleneck statistics for invoice‑approval processes.

## 🔰 Load‑order guarantee

1. **Read this file first.** It provides project context, rules and critical constraints.

2. **Then load the universal process file** – @working\_files/CLAUDE\_PROCESS.md. It defines the agent life‑cycle, modules (planning & memory management, safety & guidance, quality assurance, design & simulation, security & compliance, infrastructure & deployment, context & knowledge graph and CI/CD guidance) and all rules. Always follow the process.

3. **Then read all working files** listed in § 2 **Working‑file canon**. These files represent the current plan, tasks, conventions, log and documentation index for this project. **Always update them at the end of the agentic loop.**

\<\!-- Bug documentation is stored in docs/bugs/. Do not load bug files from the working\_files directory. Use docs/bugs/ to log, track and plan fixes. \--\>

## 1 Project snapshot & context

| Item | Value |
| :---- | :---- |
| **Project name** | *Mimica Analytics Platform* |
| **Primary goal** | Build a web application that helps enterprises standardise invoice‑approval processes across regions by visualising **cross‑region comparisons**, **variant distributions** and **bottlenecks** using synthetic task‑mining data. |
| **Current state** | **Phase 0** – Discovery & planning. Synthetic data has been generated and processed metrics are available, but no UI has been built. Documentation and process alignment are pending. |
| **Implementation approach** | **Research‑first & phased development**: Context gathering → Requirements definition → Architecture design → Component implementation → Testing & optimisation → Documentation & deployment. Use the universal process modules at each step. |
| **Architecture** | **Next.js 13+ (App Router) \+ TypeScript** for the front‑end. **21st.dev** component library (with shadcn/ui fallback) for UI primitives and charts. Synthetic data stored in public/data/raw/ and pre‑computed metrics in public/data/processed/. A context provider shares metrics and filters across components. |
| **Development environment** | Local dev: npm run dev (Next.js dev server). Build: npm run build. Test: npm run test. Lint: npm run lint. Type‑check: npm run typecheck. |
| **Key metrics** | Synthetic dataset: 500 transactions (\~4 153 rows) with region labels, variants and automata scores【110761823672482†L1-L44】. Processed metrics: region metrics, variant distribution, variant metrics, step‑level metrics and top bottlenecks【110761823672482†L89-L136】. These feed the dashboard components. |

## 2 Working‑file canon (never bypass, always keep up to date)

These files constitute the living state of the project. Always read them before starting work and update them after every agentic loop. Use memory.store and context7.add\_observations to persist important updates and relationships.

| File | Role | ALWAYS read… |
| :---- | :---- | :---- |
| **@working\_files/todo.md** | Task checklist / sprint board | first for “What next?” |
| **@working\_files/planning.md** | Technical blueprint & phase status | to know “Why?” and “How?” |
| **@working\_files/conventions.md** | Coding, naming, design & content rules | to stay consistent |
| **@working\_files/event-stream.md** | Chronological log of actions & reflections | to avoid duplicated effort |
| **@working\_files/doc-ref.md** | Index into deeper docs (docs/…) | for any deep dive |

One in/one out – If additional documentation is needed, create a file under docs/ and link to it from doc-ref.md. **Do not add extra files to working\_files/.** Bug discovery, tracking and fix planning live in docs/bugs/.

## 3 Critical principles & guard‑rails

1. **Research‑first methodology** – Always gather context (data schema, metrics, design guidelines) before writing code. Use the synthetic dataset specification【110761823672482†L1-L44】 and processed metrics【110761823672482†L89-L136】 to inform decisions. Record findings in RESEARCH.md and the knowledge graph.

2. **Context priming & persistence** – At the start of each session, read event-stream.md, todo.md, planning.md, conventions.md and doc-ref.md. Use memory.recall to retrieve past decisions. Create graph entities for processes, components, data files and design tokens, linking them appropriately.

3. **Iteration over creation** – Search the codebase and knowledge graph for existing components (e.g. 21st.dev charts) before creating new ones. Extend and parameterise instead of duplicating.

4. **Design-system fidelity** – Adopt a minimalistic, airy aesthetic with consistent typography and accessible colours as outlined in the technical plan. Use the 21st.dev design tokens by default; fall back to shadcn/ui primitives. Components should be ≤ 50 LOC and live in their own files.

5. **Variant & region awareness** – Implement components that react to region and variant filters. The RegionChart, VariantChart and BottleneckTable should update when a region is selected and provide clear feedback to the user (e.g. highlight selected bars).

6. **Documentation integrity** – Code is not “done” until event-stream.md, planning.md, todo.md and relevant docs are updated. Archive superseded docs in docs/archive/YYYY‑MM‑DD/ and update doc-ref.md.

7. **Performance & security audits** – Set budgets for load time, interaction latency and memory usage. Validate that all JSON data loads asynchronously and is cached appropriately. Do not expose local file paths or secrets; treat synthetic user IDs and roles as PII and ensure they are not stored in the client.

8. **Test‑driven & visual validation** – Write unit tests for data helpers and component logic. Use puppeteer or Playwright to capture snapshots of each chart and table, verifying against reference designs. All features must be responsive and accessible (ARIA labels, keyboard navigation, colour contrast).

9. **Bug management** – Log defects in docs/bugs/bugs.md with severity and context. Track active issues in docs/bugs/bugs\_todo.md and plan fixes in docs/bugs/bug\_fix\_planning.md. Integrate bug tasks into todo.md; do not proceed with new features until P0/P1 issues are resolved.

10. **Autonomy & self‑organisation** – The agent should plan, execute and iterate independently. Only ask the user clarifying questions if critical information is missing (e.g. unspecified design system). Use the planner module to reprioritise tasks based on new discoveries.

## 4 Development commands & tech stack

npm run dev        \# Start Next.js dev server (App Router)  
npm run build      \# Production build  
npm run preview    \# Preview production build locally  
npm run lint       \# Run ESLint  
npm run typecheck  \# Run TypeScript compiler  
npm run test       \# Run unit tests (Vitest or Jest)  
npm run test:e2e   \# Run end‑to‑end tests (Playwright or Puppeteer)

**Major libraries & tools**

* **Next.js 13+ \+ TypeScript** – App Router for page layouts and API routes.

* **21st.dev** and **shadcn/ui** – primary component libraries; charting via @21stdev/react-charts or react-chartjs-2.

* **React Context** – to store processed metrics and selected region. Use useMetrics custom hook for convenience.

* **React Query or SWR (optional)** – for data fetching if server API is added.

* **Tailwind CSS or CSS Modules** – for styling; follow minimalistic design and accessible colours.

* **Puppeteer/Playwright** – for visual and accessibility testing; use puppeteer\_navigate and puppeteer\_screenshot in tests.

* **Memory & context graph (MCP)** – persist research notes, planning decisions and context via memory.store; create entities and relationships via context7.create\_entities and context7.create\_relations.

## 5 Road‑map & success metrics

| Phase | Objectives | Success criteria |
| :---- | :---- | :---- |
| **Phase A: Context & documentation cleanup** | Audit existing docs and working files; populate doc-ref.md; archive superseded documents; ensure conventions reflect Next.js App Router structure; initialise memory & graph. | All documents catalogued with statuses; working files match universal process; memory & graph updated. |
| **Phase B: Data loading & UI scaffolding** | Scaffold project structure with App Router; implement DataProvider context; build skeleton layout and placeholder charts/tables; load processed metrics from JSON; verify data types. | Project compiles and displays placeholder dashboards; data is fetched and stored in context; TypeScript types enforced. |
| **Phase C: Core components** | Implement RegionChart, VariantChart, BottleneckTable and optional SummaryCards using 21st.dev or fallback libraries; integrate interactivity (filtering by region). | Charts and table render correctly with real data; selecting a region updates other components; tests and snapshot comparisons pass. |
| **Phase D: Design & accessibility** | Apply minimalistic design tokens; ensure responsive layout; implement dark mode if feasible; run accessibility audits using axe‑core. | All components meet WCAG 2.1 AA; design tokens consistent; accessible interactions validated. |
| **Phase E: Optimisation & deployment** | Optimise performance (lazy loading, memoisation); set up CI/CD; prepare documentation and deployment instructions; gather feedback. | Dashboard loads within target times; CI/CD pipeline runs tests and audits; documentation up to date; ready for user testing. |

### Key success metrics

* **Data integrity** – Processed metrics match expected values from the synthetic dataset. All missing fields are handled gracefully.

* **Interactive filtering** – Selecting a region updates the variant distribution and bottleneck table within 200 ms.

* **Performance** – Largest Contentful Paint (LCP) \< 2.5 s on desktop; Time to Interactive (TTI) \< 3 s.

* **Accessibility** – All components achieve a score ≥ 90 % in automated audits; keyboard navigation fully supported.

* **Documentation completeness** – doc-ref.md reflects all docs with statuses; working files updated after every commit; memory & graph store summary of decisions.

## 6 Design system guidelines

The analytics dashboard should be **minimalistic and easy to scan**, mirroring the aesthetics of 21st.dev. Use the following principles:

* **Colour palette** – Pastel tones for bars and cards (blue, green, purple, orange) with high contrast for text. Avoid saturated colours that strain the eyes. Dark mode optional.

* **Typography** – Use a single font family (e.g. IBM Plex Sans or Inter) with fluid sizing: clamp(1rem, 1vw \+ 0.8rem, 1.25rem). Maintain clear hierarchy (h1, h2, h3) and consistent line height.

* **Spacing & layout** – Base unit 4 px. Use grids for charts and tables; add whitespace around cards and charts. On mobile, stack components vertically; on desktop, arrange charts and tables side‑by‑side.

* **Chart design** – Avoid 3‑D effects; label axes clearly; use tooltips for additional metrics (median, max, min). Provide a legend for stacked bars. Highlight selected regions via colour change or border.

* **Accessibility** – All interactive elements must be reachable by keyboard. Provide descriptive aria labels (e.g. “Bottleneck table column: Average Duration in seconds”). Use high colour contrast and support reduced motion preferences.

* **Design versioning** – Store design tokens and component styles in a versioned file (docs/design/version\_history.md). When updating tokens, increment the version and document the change in event-stream.md and the knowledge graph.

## 7 Protected artefacts & absolute DON’Ts

| Artefact | Why protected | Allowed? |
| :---- | :---- | :---- |
| **Synthetic dataset files** (new\_synthetic\_invoice\_data.json, processed JSONs) | Source of truth for analytics; must remain immutable. | Read only; do not modify directly. |
| **Data schema & types** (lib/types.ts) | Defines contract between data layer and components. | Extend via interfaces; do not change existing fields without updating all components and tests. |
| **Recorder logic** (if imported in future) | Proprietary technology not covered by this project. | Do not attempt to replicate; assume processed data is provided. |

**Absolute DON’Ts**

* Do not commit secrets, credentials or personal data. Treat synthetic IDs as anonymised; never persist them to logs.

* Do not bypass the design system; avoid inline colours or magic numbers. Use CSS variables or design tokens.

* Do not skip context gathering, testing or documentation updates. Each agentic loop must prime context and persist findings.

* Do not modify protected datasets or types; copy and extend only if necessary.

* Do not create ad‑hoc files in working\_files/. Use docs/ and update doc-ref.md accordingly.

## 8 File‑naming & archival conventions

* **Documentation naming** – New docs in docs/ must start with an ISO date (YYYY‑MM‑DD) and a concise slug (e.g. 2025-07-24-synthetic-data-analysis.md). Place them in docs/research/, docs/implementation/, docs/design/, etc. Link them in doc-ref.md with status (Active/Archived/Superseded).

* **Archiving** – Once a document or implementation is superseded and unused for 7 days, move it to docs/archive/YYYY‑MM‑DD/ with a README pointer explaining the reason for archival. Update doc-ref.md and the knowledge graph.

* **Root directory** – Keep the root lean: source code, configuration files, README.md and this playbook. All documentation and data belong in docs/ or public/data.

* **Working files** – Only todo.md, planning.md, conventions.md, event-stream.md and doc-ref.md live in working\_files/. Do not create other files here. Bug docs live in docs/bugs/.

## 9 Documentation & copy synchronisation

The analytics dashboard does not yet require multilingual copy. However, documentation must remain synchronised:

* **Update triggers** – After implementing a feature, write a summary in docs/ explaining the approach (e.g. 2025-07-30-region-chart-implementation.md). Add a bullet to event-stream.md and update doc-ref.md.

* **Version tracking** – When data schema or component props change, increment the version in lib/types.ts and update docs/design/version\_history.md.

* **Review cycle** – Conduct bi-weekly documentation reviews to ensure doc-ref.md accurately reflects the repository’s documents. Archive outdated files promptly.

## 10 Glossary

| Term | Meaning |
| :---- | :---- |
| **Synthetic dataset** | Mock data representing invoice‑approval tasks, with \~4k step records across 500 transactions【110761823672482†L1-L44】. |
| **Variant** | Structural variation in a process path (A–E) modelling extra approval, local logging, early termination or summary report【110761823672482†L89-L136】. |
| **Region** | Geographic grouping for transactions (Americas, EMEA, APAC, LATAM, North America). |
| **Region metrics** | Aggregated statistics per region: average, median, max, min transaction duration; average step count; transaction count【110761823672482†L89-L136】. |
| **Variant distribution** | Pivot table of transaction counts by region and variant【110761823672482†L89-L136】. |
| **Bottleneck** | Step with high average duration and frequency, e.g. manager approval or send for review【110761823672482†L89-L136】. |
| **21st.dev** | Component library providing ready‑made UI primitives and charts; used as primary UI toolkit. |
| **Context provider** | React context storing processed metrics and selected filters, accessible by all components. |
| **Memory MCP** | Modular capability provider for storing and retrieving vectorised information; used to persist research notes, plans and decisions across sessions. |
| **Context7** | Graph MCP for representing entities (components, datasets, metrics) and their relationships (e.g. component uses metric). |

## 11 New modules & workflow summary (project application)

This project utilises several modules from the universal process. Below is a summary of how they apply:

* **Planning & memory management** – Use the planner module to draft and update plans in planning.md. Persist plans via memory.store and represent tasks and features as entities in the knowledge graph. Use the reprioritisation mechanism to adapt the plan when new requirements or issues arise.

* **Safety & guidance** – Apply guardrails for tool usage and prompt design. When uncertain about design decisions, consult the design system guidelines or ask targeted questions. Use the prompt design module to frame complex tasks clearly before planning.

* **Quality assurance** – Follow test‑driven development; create tests for data helpers and UI components. Use the performance module to set budgets and monitor metrics. Conduct code reviews and peer reviews; log findings via the bug tracking module.

* **Design & simulation** – Adhere to the minimalistic design and accessibility guidelines defined above. Use the design versioning module to track token changes and link components to design tokens in the knowledge graph.

* **Security & compliance** – Ensure that synthetic data does not expose real PII. Validate user inputs and avoid exposing internals. Document any security issues in docs/bugs/bugs.md and plan fixes.

* **Infrastructure & deployment** – Use the architecture templates from the universal process (Next.js \+ Supabase). Manage dependencies via npm audit and the package‑version MCP. Keep the repository clean and archive superseded files. Configure CI/CD pipelines to run tests and audits on each commit.

* **Context & knowledge graph** – Represent datasets, metrics, components, pages and design tokens as graph entities. Link them using context7.create\_relations (e.g. component:RegionChart uses metric:RegionMetric). Store observations and decisions via memory.store and update edges when relationships change.

By following this playbook alongside the universal process, Claude Code can autonomously plan, implement and validate the Mimica Analytics Platform while maintaining high standards for design, performance, documentation and maintainability.

---

