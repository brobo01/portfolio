import CaseStudy from "./case-study"
import styles from "./styles.module.css"
import ColorHero from "@/components/color-hero/color-hero"

export default async function Page() {
  // const posts = await getPosts()

  return (
    <main className={styles.container}>
      <ColorHero title="Case Studies" />

      <CaseStudy
        title="Beefeater Gin Website"
        role="Front-End Developer"
        overview="Delivered a fully responsive, production-ready marketing website as part of a greenfield build for a global brand."
        tech="Vue.js, JavaScript, Tailwind CSS, PHP, REST APIs"
        challenge={[
          "Pixel-perfect implementation from detailed designs",
          "Maintaining performance across devices",
          "Meeting accessibility (WCAG) standards",
          "Tight delivery timelines",
        ]}
        actions={[
          "Built reusable component-based architecture",
          "Translated Figma designs into responsive UI",
          "Collaborated with cross-functional teams",
          "Integrated APIs and ensured compatibility",
        ]}
        outcome={[
          "Delivered on schedule",
          "High performance and accessibility",
          "Strong SEO foundation",
        ]}
        takeaway="Strengthened my ability to deliver high-quality builds balancing performance, accessibility, and design precision."
      />

      <CaseStudy
        title="Whisky Brand Portfolio"
        role="Front-End Developer"
        overview="Delivered multiple premium brand websites with consistent performance and scalable architecture."
        tech="Vue.js, Twig/Blade, Tailwind, JavaScript, PHP"
        challenge={[
          "Supporting multiple brand builds",
          "Maintaining consistency across components",
          "Optimising media-heavy content",
          "Ensuring SEO and accessibility",
        ]}
        actions={[
          "Developed reusable UI components",
          "Worked within a shared design system",
          "Optimised assets and performance",
          "Implemented semantic HTML and SEO best practices",
        ]}
        outcome={[
          "Multiple successful launches",
          "Improved dev efficiency",
          "Maintainable and scalable codebase",
        ]}
      />
    </main>
  )
}
