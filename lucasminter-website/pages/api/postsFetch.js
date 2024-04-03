import groq from 'groq'

const postsFetch = groq`*[_type == "post"] | order(_createdAt desc,) {
  title,
  author->,
  category,
  publishedAt,
  slug,
  body,
  summary
}`

export default postsFetch;