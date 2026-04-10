import styles from "../styles.module.css"

export default function CreateReactApp() {
  return (
    <article class="blogWrap">
      <div class="tagRow">
        <span class="tag">React</span>
        <span class="tag">Next.js</span>
        <span class="tag">Tooling</span>
      </div>

      <h1>The End of Create React App — and What to Do About It</h1>
      <div class="meta">
        10 min read · April 2026 · On deprecated tools, migration paths, and
        knowing when to let go
      </div>

      <p class="lead">
        Create React App was the scaffolding tool that introduced a generation
        of developers to React. It served its purpose brilliantly. And it's time
        to move on — not because it's broken, but because the web has moved well
        past what it was designed for.
      </p>

      <p>
        If you've started a new React project in the last couple of years,
        you've probably noticed that <code>create-react-app</code> is no longer
        the first recommendation in the React docs. That's not an accident. In
        early 2023, the React team officially acknowledged that CRA was in
        maintenance mode — no new features, no active development, just security
        patches when absolutely necessary. By late 2024, it was formally
        deprecated.
      </p>

      <p>
        For a lot of developers, this felt like losing an old friend. CRA was
        the <em>first</em> command many of us ran when we started learning
        React. It removed an entire category of configuration anxiety. It just
        worked. But the web has changed enormously since 2016, and CRA's
        fundamental architecture hasn't changed with it. The question now is:
        what do you replace it with, and why?
      </p>

      <hr class="divider" />

      <h2>What CRA was, and why it mattered</h2>

      <p>
        To understand why CRA's deprecation matters, it helps to remember the
        problem it was solving. In 2016, setting up a React project from scratch
        meant wiring together Webpack, Babel, ESLint, Jest, and a handful of
        loaders — each with their own configuration files, their own breaking
        changes, and their own community of Stack Overflow questions. It was
        genuinely painful, especially for developers coming from simpler
        ecosystems.
      </p>

      <p>
        Create React App was a brilliant solution to that problem. It wrapped
        all of that complexity into a single command and a single dependency (
        <code>react-scripts</code>). You ran{" "}
        <code>npx create-react-app my-app</code>, and thirty seconds later you
        had a working React project with hot reloading, a test runner, a
        production build script, and zero configuration to manage. For teaching
        React, for prototyping, and for getting teams started quickly, it was
        transformative.
      </p>

      <p>
        The problem is that "zero configuration" has a hidden cost: zero
        flexibility. CRA was designed around a specific set of assumptions about
        how React apps should be built — assumptions that made a lot of sense in
        2016 and have aged poorly.
      </p>

      <div class="warnCallout">
        <p>
          CRA is a client-side only, single-page application framework.
          Everything renders in the browser. There's no server-side rendering,
          no static generation, no streaming, no React Server Components. In
          2016 that was fine. In 2026, it puts you at a structural disadvantage
          for performance, SEO, and user experience.
        </p>
      </div>

      <hr class="divider" />

      <h2>The fundamental problems with the CRA model</h2>

      <h3>Performance: the bundle problem</h3>

      <p>
        A CRA app ships a JavaScript bundle to the browser. The browser
        downloads it, parses it, executes it, and <em>then</em> renders the
        page. On a fast laptop with a good connection, this is imperceptible. On
        a mid-range Android phone on a 4G connection — the actual device and
        network conditions of a majority of global web users — it's a meaningful
        delay, and it compounds as your app grows.
      </p>

      <p>
        This isn't a CRA-specific problem exactly — it's a client-side rendering
        problem. But CRA gives you no easy escape hatch. The entire architecture
        pushes you toward a model where the browser does all the work, and
        restructuring that after the fact is expensive.
      </p>

      <h3>SEO: the empty HTML problem</h3>

      <p>
        When a search engine crawler or a social media link preview fetches a
        CRA app, it gets back an HTML file that looks roughly like this:
      </p>

      <pre>
        <code>
          &lt;div id="root"&gt;&lt;/div&gt; &lt;script
          src="/static/js/main.abc123.js"&gt;&lt;/script&gt;
        </code>
      </pre>

      <p>
        There's no content. The content only exists after JavaScript runs, and
        many crawlers either don't run JavaScript or don't wait for it. For
        marketing sites, blogs, e-commerce, or anything where discoverability
        matters, this is a serious structural problem. The workarounds —
        prerendering services, dynamic rendering, React Helmet — all feel like
        exactly what they are: patches on a model that wasn't designed for the
        job.
      </p>

      <h3>The slow build problem</h3>

      <p>
        CRA uses Webpack under the hood, which was the right choice in 2016. By
        2022, Webpack had accumulated enough configuration complexity and enough
        architectural overhead that cold starts and rebuild times on large
        projects had become a genuine productivity tax. Tools like Vite (powered
        by esbuild and Rollup) were demonstrably 10–100x faster for development
        server startup. CRA, locked to its Webpack foundation, couldn't adopt
        these improvements without a rewrite it was never going to get.
      </p>

      <hr class="divider" />

      <h2>Why Next.js is the right landing spot for most teams</h2>

      <p>
        The React docs now recommend several alternatives: Next.js, Remix,
        Gatsby, and Expo for native apps. For most web development teams coming
        from CRA, Next.js is the most natural transition — it's React with a
        structure layered on top, rather than a different paradigm entirely.
      </p>

      <p>Here's what Next.js gives you that CRA doesn't:</p>

      <div class="compareGrid">
        <div class="cmpCard">
          <h4>Create React App</h4>
          <ul>
            <li>Client-side rendering only</li>
            <li>Manual routing setup</li>
            <li>No built-in API layer</li>
            <li>Webpack (slow dev builds)</li>
            <li>One rendering strategy</li>
            <li>SEO requires workarounds</li>
            <li>Deprecated — no active development</li>
          </ul>
        </div>
        <div class="cmpCard">
          <h4>Next.js</h4>
          <ul>
            <li>SSR, SSG, ISR, and CSR — your choice</li>
            <li>File-based routing built in</li>
            <li>API routes and Server Actions</li>
            <li>Turbopack (fast dev builds)</li>
            <li>Per-page rendering strategy</li>
            <li>SEO-friendly by default</li>
            <li>Actively maintained by Vercel</li>
          </ul>
        </div>
      </div>

      <p>
        The most important shift isn't any individual feature — it's the
        rendering model. In Next.js, you decide per-page (or per-component, with
        the App Router) whether content should be rendered on the server,
        generated at build time, or hydrated on the client. This granularity is
        the thing that CRA fundamentally couldn't offer.
      </p>

      <hr class="divider" />

      <h2>Understanding Next.js rendering strategies</h2>

      <p>
        This is where developers migrating from CRA sometimes get confused,
        because Next.js gives you more choices than you're used to. Here's a
        plain-English breakdown of what each strategy is for:
      </p>

      <div class="scenarioGrid">
        <div class="scenario">
          <div class="scenarioLabel">Static Generation (SSG)</div>
          <p>
            Pages are rendered at build time and served as static HTML. Fastest
            possible load. Perfect for content that doesn't change often:
            marketing pages, blog posts, documentation.
          </p>
        </div>
        <div class="scenario">
          <div class="scenarioLabel">Server-Side Rendering (SSR)</div>
          <p>
            Pages are rendered on the server on each request. Great for pages
            that need fresh data on every load: dashboards, user-specific
            content, search results.
          </p>
        </div>
        <div class="scenario">
          <div class="scenarioLabel">Incremental Static Regeneration (ISR)</div>
          <p>
            Static pages that revalidate in the background on a schedule. The
            sweet spot for content that changes occasionally: product listings,
            news feeds, pricing pages.
          </p>
        </div>
        <div class="scenario">
          <div class="scenarioLabel">Client-Side Rendering (CSR)</div>
          <p>
            Just like CRA — rendered in the browser. Still useful for highly
            interactive, user-specific UIs that don't need SEO: admin panels,
            internal tools, complex editors.
          </p>
        </div>
      </div>

      <p>
        A real application typically uses all four. Your homepage is statically
        generated. Your product pages use ISR. Your checkout is server-rendered.
        Your rich text editor is client-side. CRA forced you to use one model
        for everything. Next.js lets the nature of each page determine the right
        approach.
      </p>

      <hr class="divider" />

      <h2>Migrating from CRA: what it actually involves</h2>

      <p>
        The good news: if your CRA app is a straightforward single-page
        application, migration to Next.js is mostly mechanical. Your components
        don't need to change. Your state management doesn't need to change. The
        bulk of the work is restructuring routing and adapting to the file-based
        system.
      </p>

      <h3>Step 1: set up the Next.js project</h3>

      <pre>
        <code>
          npx create-next-app@latest my-app \ --typescript \ --tailwind \
          --eslint \ --app
        </code>
      </pre>

      <p>
        The <code>--app</code> flag opts you into the App Router — the modern
        Next.js architecture introduced in v13. If you're migrating a large
        existing codebase and want a more gradual transition, you can omit this
        flag and start with the Pages Router, which is closer to what older
        Next.js tutorials describe.
      </p>

      <h3>Step 2: move your components</h3>

      <p>
        Copy your <code>src/components</code> directory across wholesale. React
        components are just React components — they don't care whether they're
        running in a CRA or Next.js project. The only caveat is hooks and
        browser APIs.
      </p>

      <div class="callout">
        <p>
          In the App Router, components are Server Components by default. If
          your component uses <code>useState</code>, <code>useEffect</code>,
          browser APIs like <code>window</code> or <code>localStorage</code>, or
          event handlers — add <code>'use client'</code> at the top of the file.
          This marks it as a Client Component and restores the behaviour you're
          used to from CRA.
        </p>
      </div>

      <h3>Step 3: migrate your routes</h3>

      <p>
        CRA apps typically use React Router for client-side routing. In Next.js,
        routing is filesystem-based. A file at <code>app/about/page.tsx</code>{" "}
        automatically becomes the <code>/about</code> route. Dynamic routes use
        bracket syntax: <code>app/blog/[slug]/page.tsx</code> maps to{" "}
        <code>/blog/anything</code>.
      </p>

      <p>
        For each React Router <code>&lt;Route&gt;</code> in your app, you're
        creating a corresponding directory and <code>page.tsx</code> file. It's
        a bit of upfront work, but you end up with a codebase where the URL
        structure is immediately legible from the file tree — something that
        always pays dividends later.
      </p>

      <h3>Step 4: replace your data fetching</h3>

      <p>
        This is typically the most substantial part of the migration. CRA apps
        usually fetch data in <code>useEffect</code> hooks or via React Query /
        SWR on the client. In Next.js, you have better options.
      </p>

      <p>
        For server-rendered or statically generated pages, you can fetch data
        directly in Server Components with a simple async function — no hooks
        needed, no loading states, no client-server waterfalls:
      </p>

      {/* <pre><code>// app/posts/page.tsx
"export default async function PostsPage() {
 const posts = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 } // ISR: revalidate every hour
  }).then(r => r.json())
 
  return (
    &lt;ul&gt;
      {posts.map(post =&gt; (
        &lt;li key={post.id}&gt;{post.title}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  )
}</code></pre> */}

      <p>
        For client-side data that's user-specific or highly dynamic, React Query
        and SWR still work perfectly — just use them inside Client Components as
        you normally would.
      </p>

      <h3>Step 5: environment variables</h3>

      <p>
        CRA used <code>REACT_APP_</code> prefixes for environment variables
        exposed to the browser. Next.js uses <code>NEXT_PUBLIC_</code>. A quick
        find-and-replace in your codebase, and update your <code>.env</code>{" "}
        files accordingly. Variables without the <code>NEXT_PUBLIC_</code>{" "}
        prefix are server-only — a nice security property that CRA couldn't
        offer.
      </p>

      <hr class="divider" />

      <h2>The App Router vs the Pages Router</h2>

      <p>
        If you've looked at Next.js tutorials recently, you've probably noticed
        that some use <code>pages/</code> and some use <code>app/</code>. This
        is a genuine source of confusion for developers coming in fresh, so it's
        worth addressing directly.
      </p>

      <p>
        The Pages Router is the original Next.js architecture — stable,
        well-documented, and still fully supported. The App Router was
        introduced in Next.js 13 and became stable in v14. It introduces React
        Server Components, Server Actions, nested layouts, and streaming as
        first-class primitives. The App Router is where all of Next.js's active
        development is happening, and it's what new projects should use.
      </p>

      <p>
        That said, the App Router has a steeper learning curve. The mental model
        around Server vs Client Components takes some getting used to. If you're
        migrating a large existing codebase, starting with the Pages Router and
        migrating incrementally to the App Router is a perfectly reasonable
        strategy — Next.js supports both in the same project during a transition
        period.
      </p>

      <div class="pullquote">
        <p>
          Don't let the App Router's learning curve put you off. The concepts —
          running code on the server, fetching data close to where it's used,
          not shipping unnecessary JavaScript to the browser — are good ideas
          that improve real applications. They're worth learning.
        </p>
      </div>

      <hr class="divider" />

      <h2>What if you don't need Next.js?</h2>

      <p>
        Next.js is the right choice for most projects, but it's worth
        acknowledging the cases where it might be overkill.
      </p>

      <p>
        If you're building a purely internal tool — an admin dashboard, a
        developer-facing app, something where SEO is irrelevant and your users
        are all on fast corporate networks — the CRA model (client-side
        rendering only) is still entirely valid. In this case,{" "}
        <strong>Vite</strong> is the modern replacement: same mental model as
        CRA, dramatically faster builds, no server-side complexity. Running{" "}
        <code>npm create vite@latest</code> gets you a project that feels
        familiar immediately.
      </p>

      <p>
        If you're building a content-heavy site where the content is managed
        externally and you want the absolute fastest static output,{" "}
        <strong>Astro</strong> is worth a look — it ships zero JavaScript by
        default and has excellent React integration for interactive components.
      </p>

      <p>
        But for the vast majority of projects — products with public-facing
        pages, marketing sites, e-commerce, SaaS dashboards, anything where you
        need a mix of static and dynamic content — Next.js is the right tool.
      </p>

      <hr class="divider" />

      <h2>A note on grieving your tooling</h2>

      <p>
        There's a genuine emotional component to tool deprecations that doesn't
        get talked about enough. CRA wasn't just a tool — for a lot of us, it's
        bound up with the memory of learning React, of first projects, of
        tutorials that clicked something into place. The{" "}
        <code>npx create-react-app</code> command has a kind of nostalgia
        attached to it.
      </p>

      <p>
        But tooling loyalty is a trap. The developers who thrive over long
        careers are the ones who hold their tools loosely — who use them because
        they're the best fit for the job today, not because they were the best
        fit for the job five years ago. CRA did its job. It introduced React to
        a generation of developers and removed friction that was genuinely
        discouraging people. That's a real legacy worth acknowledging.
      </p>

      <p>
        Now it's time to pick up the next tool, learn its idioms, and build
        better things with it.
      </p>

      <div class="verdictBox">
        <div class="verdictLabel">The verdict</div>
        <p>
          Create React App is deprecated and you should stop starting new
          projects with it. Not because it will stop working tomorrow — your
          existing CRA apps will run fine for a long time — but because every
          new project you start with it is inheriting a set of architectural
          constraints that will cost you later.
        </p>
        <p>
          For most web projects, migrate to Next.js. Start a new project with{" "}
          <code>create-next-app</code>, use the App Router, learn the Server
          Component model, and take advantage of the rendering flexibility it
          gives you. The learning curve is real but front-loaded — once the
          mental model clicks, you'll find it hard to go back.
        </p>
        <p>
          If you have an existing CRA app, you don't need to drop everything and
          migrate today. But put it on your roadmap. The longer you wait, the
          more your codebase will diverge from the patterns the ecosystem is
          moving toward, and the harder the eventual migration will become.
          Start with your next greenfield feature or your next new project. The
          path is well-worn at this point — you're far from the first person to
          make this journey.
        </p>
      </div>
    </article>
  )
}
