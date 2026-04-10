import styles from "../styles.module.css"

export default function FullStack() {
  return (
    <article className={styles.blogWrap}>
      <div className={styles.tagRow}>
        <span className={styles.tag}>Opinion</span>
        <span className={styles.tag}>Teams</span>
        <span className={styles.tag}>Career</span>
      </div>

      <h1>The Full Stack Developer Doesn't Exist</h1>
      <div className={styles.meta}>
        10 min read · April 2026 · A take on team structure, specialisation, and
        the myth of the unicorn hire
      </div>

      <p className={styles.lead}>
        We've been collectively pretending for about fifteen years that a single
        developer can be genuinely excellent at both frontend and backend work.
        I think it's time to have an honest conversation about why that's mostly
        not true — and what it means for how we build teams.
      </p>

      <p>
        Let me be clear about what I'm not saying. I'm not saying full stack
        developers don't exist as a job title. They obviously do — it's one of
        the most common roles advertised in tech. What I'm saying is that the{" "}
        <em>idea</em> of a developer who is equally skilled, equally passionate,
        and equally current across both frontend and backend is largely a
        convenient fiction that companies tell themselves when they want to hire
        one person instead of two.
      </p>

      <p>
        And after years of working in software, I've come to believe that this
        fiction costs teams more than it saves.
      </p>

      <hr className={styles.divider} />

      <h2>What "full stack" actually means in practice</h2>

      <p>
        Ask ten full stack developers to describe their work and you'll get ten
        variations of the same honest confession:{" "}
        <em>I can do both, but I'm stronger on one side.</em> Sometimes they
        know which side. Sometimes the preference is buried under years of job
        descriptions that called for everything.
      </p>

      <p>Here's the spectrum as it actually exists in the industry:</p>

      <div className={styles.spectrumWrap}>
        <div className={styles.spectrumLabels}>
          <span>Frontend-leaning</span>
          <span>"True" full stack</span>
          <span>Backend-leaning</span>
        </div>
        <div className={styles.spectrumBar}></div>
        <div className={styles.personaGrid}>
          <div className={styles.persona}>
            <div className={styles.personaTitle}>Frontend-first</div>
            <p>
              Thinks in components and state. Cares deeply about UX. Can write
              an API, but finds it less interesting. Their CSS is immaculate.
              Their database schemas are functional.
            </p>
          </div>
          <div className={styles.persona}>
            <div className={styles.personaTitle}>The "full stack" zone</div>
            <p>
              Can hold their own on both sides. Usually means: proficient, not
              expert. Comfortable shipping features end-to-end, but covering
              less ground on each side than a specialist would.
            </p>
          </div>
          <div className={styles.persona}>
            <div className={styles.personaTitle}>Backend-first</div>
            <p>
              Thinks in systems, data, and services. Can put together a React
              component when needed. Their APIs are elegant. Their UI is
              functional but rarely inspired.
            </p>
          </div>
        </div>
      </div>

      <p>
        The "true full stack" zone — genuine depth on both sides — is
        vanishingly rare. Not because developers aren't smart enough, but
        because{" "}
        <strong>
          frontend and backend development have each become enormous fields in
          their own right
        </strong>
        . Keeping up with one is a full-time job. Keeping up with both, deeply,
        at the same time, is not realistically possible for most people.
      </p>

      <hr className={styles.divider} />

      <h2>The breadth problem</h2>

      <p>
        Think about what genuine frontend expertise means in 2026. It means
        understanding React's rendering model deeply enough to optimise
        performance in large applications. It means knowing how the browser
        works — the event loop, the paint cycle, how layout is calculated. It
        means accessibility, not as a checklist but as a practice. It means
        design systems, animation, internationalisation, web performance
        metrics, Core Web Vitals. It means knowing when to reach for a CSS Grid
        and when to reach for a library. It means having opinions about state
        management that are based on real tradeoffs rather than blog post
        trends.
      </p>

      <p>
        Now think about what genuine backend expertise means. Deep understanding
        of database query planning and indexing strategies. Distributed systems
        concepts — consistency models, CAP theorem in practice, not just in
        theory. API design, auth flows, rate limiting, caching strategies.
        Message queues, event-driven architecture, observability, performance
        profiling. Security: not just "use HTTPS" but threat modelling,
        injection prevention, secrets management.
      </p>

      <blockquote className={styles.pullquote}>
        <p>
          Both of those paragraphs describe a full-time learning commitment.
          Expecting one person to be genuinely excellent at both is a bit like
          expecting a surgeon to also be an excellent anaesthetist. They
          overlap. They don't substitute.
        </p>
      </blockquote>

      <p>
        A developer who tries to stay current across all of this will,
        inevitably, be shallower in both. That's not a character flaw — it's
        just arithmetic. Time is finite.
      </p>

      <hr className={styles.divider} />

      <h2>Why companies keep hiring full stack anyway</h2>

      <p>
        The honest answer: it's cheaper, and for many situations, the tradeoff
        is worth it.
      </p>

      <p>
        A two-person frontend/backend specialist team costs more than one full
        stack developer. For an early-stage startup building an MVP, that
        matters enormously. When you need to move fast, build features
        end-to-end, and iterate quickly before you know what you're even
        building — one versatile developer is often the right call. Full stack
        is genuinely excellent for this phase.
      </p>

      <p>
        But there's a hidden cost that becomes visible later. Full stack
        developers often create a kind of technical debt that's harder to see
        than bad code: <em>capability debt</em>. The frontend is functional but
        not great. The backend works but isn't as robust as it should be. Nobody
        is deeply accountable for either because one person is doing both. When
        the product scales, these gaps become expensive problems.
      </p>

      <div className={styles.warnCallout}>
        <p>
          The most common pattern I've seen: a startup builds on a full stack
          developer, ships fast, gets traction — then spends twice as long
          fixing the frontend UX and rewriting the backend services once they
          have the budget to bring in specialists. The second rewrite often
          costs more than doing it right the first time would have.
        </p>
      </div>

      <hr className={styles.divider} />

      <h2>What specialists actually bring</h2>

      <p>
        When you hire a specialist frontend developer, you're not just getting
        someone who writes React faster. You're getting someone who has thought
        deeply about user experience as a discipline. Who notices when a loading
        state is wrong before a user complains. Who understands that performance
        is a feature, and knows how to measure and improve it. Who has strong
        opinions about component APIs because they've designed hundreds of them.
      </p>

      <p>
        When you hire a specialist backend developer, you're getting someone who
        thinks about failure modes as a habit. Who designs APIs for the
        consumers who'll use them, not just the business logic that powers them.
        Who knows that "it works" and "it works reliably at scale under adverse
        conditions" are completely different statements. Who loses sleep over
        database migrations in ways that are ultimately very good for your data.
      </p>

      <div className={styles.compareGrid}>
        <div className={styles.cmpCard}>
          <h4>What a frontend specialist owns</h4>
          <ul>
            <li>Interaction design and animation</li>
            <li>Accessibility as a genuine practice</li>
            <li>Performance: loading, rendering, runtime</li>
            <li>Design system consistency</li>
            <li>Cross-browser and device behaviour</li>
            <li>State architecture at scale</li>
          </ul>
        </div>
        <div className={styles.cmpCard}>
          <h4>What a backend specialist owns</h4>
          <ul>
            <li>Data modelling and query performance</li>
            <li>Service reliability and resilience</li>
            <li>Security and threat modelling</li>
            <li>Scalability under real load</li>
            <li>API design for long-term maintainability</li>
            <li>Observability and incident response</li>
          </ul>
        </div>
      </div>

      <p>
        These aren't just technical skills — they're mindsets. A frontend
        specialist thinks about the person sitting in front of the screen. A
        backend specialist thinks about what happens when a thousand of those
        people do something unexpected at the same time. Both perspectives are
        essential. They're also genuinely different ways of approaching
        software.
      </p>

      <hr className={styles.divider} />

      <h2>The preference question</h2>

      <p>
        Here's the thing I've noticed consistently across every team I've worked
        in or spoken to: developers always have a preference. Always. They might
        suppress it, especially if they've been hired as "full stack" and feel
        obligated to present themselves as equally comfortable everywhere. But
        ask them privately — or watch where they gravitate when nobody is
        assigning tickets — and the preference emerges.
      </p>

      <p>
        This matters because preference correlates strongly with the depth of
        investment people make in their skills. The developer who genuinely
        loves frontend work reads the CSS specification for fun. They follow
        browser release notes. They argue passionately about design tokens.
        They're not doing any of this out of obligation — they find it
        intrinsically interesting. The same is true of backend specialists and
        distributed systems papers, database internals, and API design patterns.
      </p>

      <p>
        When you hire someone as full stack and they have a clear preference,
        you typically get one excellent half and one adequate half. They'll do
        the work on both sides, but they'll shine on one and coast on the other.
        That coasting — done by someone who is otherwise talented and committed
        — is often not caught until it's become a real problem.
      </p>

      <div className={styles.callout}>
        <p>
          The best interview question I've ever heard for a "full stack" role:
          "If you had no constraints and could spend the next year working on
          anything in software, what would it be?" You learn more in the first
          thirty seconds of that answer than in an hour of technical questions.
        </p>
      </div>

      <hr className={styles.divider} />

      <h2>So when should you hire which?</h2>

      <div className={styles.scenarioGrid}>
        <div className={styles.scenario}>
          <div className={styles.scenarioLabel}>Hire full stack when...</div>
          <p>
            You're an early-stage startup. Speed to market matters more than
            depth. You need one person to own features end-to-end. Budget is
            tight. The product's direction is still being discovered.
          </p>
        </div>
        <div className={styles.scenario}>
          <div className={styles.scenarioLabel}>Hire specialists when...</div>
          <p>
            Your product has real users and real scale. UX quality is a
            competitive differentiator. Your backend needs to be genuinely
            robust. You're past MVP and building something meant to last.
          </p>
        </div>
        <div className={styles.scenario}>
          <div className={styles.scenarioLabel}>
            Frontend specialist first when...
          </div>
          <p>
            Your product is consumer-facing and the experience is the product.
            You're in a market where design and interaction quality is what
            users compare you on. Your backend is simple relative to your
            frontend complexity.
          </p>
        </div>
        <div className={styles.scenario}>
          <div className={styles.scenarioLabel}>
            Backend specialist first when...
          </div>
          <p>
            You're building an API product, a data platform, or infrastructure.
            Your core value is in what happens server-side. Your frontend is a
            dashboard or admin interface, not a consumer experience.
          </p>
        </div>
      </div>

      <p>
        The honest answer to "which specialist?" is: it depends on where your
        product's complexity actually lives. Most consumer apps are
        frontend-complex. Most B2B data tools are backend-complex. Most products
        that have scaled past a few thousand users discover they underinvested
        in whichever side they deprioritised early on.
      </p>

      <hr className={styles.divider} />

      <h2>A word in defence of the "full stack" developer</h2>

      <p>
        I've spent most of this post arguing against the fiction, but I want to
        be fair. There are developers who genuinely thrive in a full stack role
        — not because they're equally expert at everything, but because they're
        excellent at the thing that full stack actually requires:{" "}
        <em>
          context switching, end-to-end ownership, and knowing enough about both
          sides to make good decisions at the seams.
        </em>
      </p>

      <p>
        The seam — the interface between frontend and backend — is genuinely
        important. Someone who deeply understands API design from both the
        producer's and consumer's perspective is valuable in ways that pure
        specialists sometimes aren't. Someone who can own a feature from the
        database migration through to the UI and feel accountable for all of it
        brings a kind of coherence that handoffs between specialists sometimes
        lose.
      </p>

      <p>
        The problem isn't full stack developers. The problem is job descriptions
        that use "full stack" to mean "we want a frontend developer, a backend
        developer, and a DevOps engineer, but we're only going to hire one
        person." That's not a full stack role — that's an unrealistic
        expectation packaged in a palatable label.
      </p>

      <div className={styles.verdictBox}>
        <div className={styles.verdictLabel}>The verdict</div>
        <p>
          The full stack developer, as typically advertised, is a myth — not
          because the title is fraudulent, but because the expectation of equal
          depth across both disciplines sets developers up to be adequate at two
          things rather than excellent at one. Every developer you've ever
          worked with who called themselves full stack has a side they love
          more. That preference is information worth acting on.
        </p>
        <p>
          For most products past the MVP stage, two specialists — one frontend,
          one backend — will outperform one full stack hire. They'll produce
          better work, catch each other's blind spots, and each have someone
          they can learn from on their side of the stack. The collaboration
          overhead is real, but it's worth it.
        </p>
        <p>
          If budget forces the choice, hire based on where your product's real
          complexity lives — and be honest about what you're trading off on the
          other side. That honesty is better than pretending one person can do
          it all equally well. Because in fifteen years of working with
          developers, I've never actually seen that be true.
        </p>
      </div>
    </article>
  )
}
