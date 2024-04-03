import client from '../../client'
import Link from 'next/link'
import groq from 'groq'

import {marked} from 'marked'

export default function Blog({ post = [] }) {
  const html = marked(post?.body)
  return (
    <div className='prose mx-auto max-w-4x1'>
      <h1 className='text-center text-3xl'>
        {post.title}
      </h1>
      <h4 className='my-4 text-center'>by {post.author.name}</h4>
      <p className='my-4 text-center'>
        <Link href='/posts'>
          &larr; go back to all posts 
        </Link>
      </p>
      <article className="overflow-hidden" dangerouslySetInnerHTML={{__html: html}} />
    </div>
  )
}

export async function getStaticProps({params}) {
  const {slug} = params
  const post = await client.fetch(groq`*[_type == "post" && slug.current == "${slug}"] [0]{
    title,
    author->,
    body,
    publishedAt,
    slug
  }`);
  return {
    props: {
      post: post
    },
    revalidate: 60
  }
}


export async function getStaticPaths() {
  const paths = await client.fetch(groq`
    *[_type == "post" && defined(slug.current)][].slug.current
  `)
  return {
    paths: paths.map((slug) => ({params: {slug}})),
    fallback: false,
  }
}