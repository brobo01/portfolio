import ColorHero from "@/components/color-hero/color-hero"
import ContactForm from "@/components/contact-form/contact-form"

export default async function Page() {
  return (
    <main>
      <ColorHero title="Contact" />
      <ContactForm />
    </main>
  )
}
