import Link from 'next/link'
import styles from '../styles/Home.module.css'

const BlogList = ({ allBlogs }) => {

  function reformatDate(fullDate) {
    const date = new Date(fullDate)
    return date.toDateString().slice(4)
  }

  console.log(allBlogs)

  return (
    <>
      <div className="flex items-center justify-center flex-wrap">
        {allBlogs.data.map(post => (
          <div key={post.attributes.slug}>
            <Link href={{ pathname: `/posts/${post.attributes.slug}` }} passHref>
              <h2 className="grid border-solid border border-cyan-400 m-4 p-6 text-left no-underline hover:border-cyan-800 hover:text-cyan-800 rounded-xl">
                  {post.attributes.title}
                <p>
                  by {post.attributes.author} on {reformatDate(post.attributes.date)}
                </p>
              </h2>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default BlogList