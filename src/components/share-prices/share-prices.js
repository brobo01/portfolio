export default async function SharePrices() {
  // https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY

  // return (

  // )
  const data = await fetch(
    "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=UEE46UC67S3GBFCT",
  )
  const posts = await data.json()
  return (
    <section>
      <h1>Shareprices data here</h1>
      {/* <img src={posts.hdurl} /> */}
    </section>
  )
}
