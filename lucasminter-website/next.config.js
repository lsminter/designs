/**
 * @type {import('next').NextConfig}
*/

const client = require('./client.js')

module.exports = {
  distDir: 'build',
  images: {
    loader: 'akamai',
    path: ''
  },
  // Make sure that your node enviroment supports async/await
  exportPathMap: async function (defaultPathMap) {
  
    const path = await client
      // get all the posts and return those with slugs
      .fetch('*[_type == "post"].slug.current')
      .then(data =>
        // use reduce to build an object with routes
        // and select the blog.js file, and send in the
        // correct query paramater.
        data.reduce(
          (acc, slug) => ({
            '/': { page: '/' },
            ...acc,
            [`/posts/${slug}`]: { page: '/posts', query: { slug } }
          }),
          {}
        )
      )
      .catch(console.error)
    return path
  }
}