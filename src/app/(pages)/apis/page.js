import styles from "./styles.module.css"
import NasaHero from "./nasa-hero"
import ColorHero from "@/components/color-hero/color-hero"
import CentralText from "@/components/central-text/central-text"
import SharePrices from "@/components/share-prices/share-prices"

export default async function Page() {
  return (
    <main>
      <ColorHero title="RESTful APIs" />
      <CentralText subheading="A selection of example third party APIs" />
      <SharePrices />
      {/* <NasaHero /> */}
    </main>
  )
}

// n5uKp41QktFBWic0tpnsWhlOOHKXqeUqq7faVxOY
