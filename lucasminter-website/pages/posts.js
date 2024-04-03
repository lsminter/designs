import client from '../client'
import Link from 'next/link'
import postsFetch from './api/postsFetch'

export default function Posts({
  post
}) {

  function reformatDate(fullDate) {
    const date = new Date(fullDate)
    return date.toDateString().slice(4)
  }

  return (
    <div className="min-h-screen">
      <div className="grid content-center justify-center">
        <h1 className="text-xl text-center">
          All Posts
        </h1>
        <div>
          {post.map(post => (
            <div key={post.slug}>
              <Link href={{ pathname: `/posts/${post.slug.current}` }} passHref>
                <h2 className="border-solid border bg-gray-200 m-4 p-4 text-left no-underline hover:border-cyan-800 hover:text-cyan-800 rounded-xl">
                  <p className="font-bold">
                    {post.title}
                  </p>
                  <p>
                    {reformatDate(post.publishedAt)}
                  </p>
                  <p>
                  {post.summary}
                  </p>
                </h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const post = await client.fetch(postsFetch);
  return {
    props: {
      post: post
    }
  }
}
