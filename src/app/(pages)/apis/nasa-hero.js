export default async function NasaHero() {
  // https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY

  // return (

  // )
  const data = await fetch(
    "https://api.nasa.gov/planetary/apod?api_key=n5uKp41QktFBWic0tpnsWhlOOHKXqeUqq7faVxOY",
  )

  const posts = await data.json()
  console.log(posts)
  return (
    <section>
      <h1>NASA data here</h1>
      <img src={posts.hdurl} />
    </section>
  )
}
