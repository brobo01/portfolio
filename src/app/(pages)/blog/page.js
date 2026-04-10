import LikeButton from "@/components/like-button"
import ColorHero from "@/components/color-hero/color-hero"
import FullStack from "./posts/full-stack"
import CreateReactApp from "./posts/create-react-app"

export default async function Page() {
  // const posts = await getPosts()

  return (
    <main>
      <ColorHero title="Blog" />
      {/* <FullStack /> */}
      {/* <CreateReactApp /> */}
    </main>
    // <ul>
    //   {posts.map((post) => (
    //     <Post key={post.id} post={post} />
    //   ))}
    // </ul>
  )
}
