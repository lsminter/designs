import Image from 'next/image'
import Link from 'next/link'
import client from '../client'
import groq from 'groq'


export default function Home({post}) {
  
  function reformatDate(fullDate) {
    const date = new Date(fullDate)
    return date.toDateString().slice(4)
  }

  return (
    <div className='min-h-screen mt-4'>
      <div className='grid grid-cols-1 sm:grid-cols-3 sm:items-center'>
        <div className='max-w-sm m-auto opacity-90 sm:hidden sm:bg-cover bg-gradient-to-r from-background to-opacity-0'> 
          <Image src='/images/cookingImage.png' width='250' height='250' alt="cooking image" className='rounded-md'/>
        </div>
        <div className='hidden sm:block col-start-3 min-w-sm max-w-sm opacity-90 bg-cover bg-gradient-to-r from-background to-opacity-0'> 
          <Image src={'/images/cookingImage.png'} alt="cooking image" width='250' height='250' className='object-cover mix-blend-overlay rounded-md'/>
        </div>
        <h1 className='max-w-lg m-auto sm:absolute sm:max-w-md sm:col-span-2 first-line:sm:max-w-lg text-center text-l sm:text-xl text-transparent bg-clip-text bg-gradient-to-br from-title-start to-title-end'>
          A blog for me to put my thoughts
        </h1>
      </div>
      <div className='grid sm:grid-cols-4 sm:items-center sm:mt-10 bg-gray-200 p-4 rounded-lg'>
        <div className='max-w-sm m-auto sm:hidden'> 
          <Image src={'/images/profilePicture.png'} alt="cooking image" width='250' height='325' className='rounded-md'/>
        </div>
        <div className='text-center items-center sm:text-left sm:col-span-3'>
          <h1 className='mb-4 no-underline text-l text-center align-top'>
            Bio
          </h1>
          <div className='text-m'>
            As a web developer residing in Washington State, I have accumulated 5 1/2 years of experience working for egghead.io. My primary areas of expertise include JavaScript, Next.js, TailwindCSS, and Sanity.io. I am particularly skilled in creating high-quality video content in the technology sector. During my tenure at egghead.io, I have demonstrated my proficiency by successfully managing social media accounts and creating image assets for upcoming courses. A couple of my major projects are this blog and creating my own egghead.io course on building your own bot using Discord.js.          
          </div>
        </div>
        <div className='max-w-md hidden sm:ml-4 sm:block col-start-4'>
          <Image src={'/images/profilePicture.png'} alt="cooking image" width='400' height='500' className='rounded-lg' />
        </div>
      </div>
      <div style={{ position: "relative", paddingBottom: "50px" }}>
        <a href="https://www.lucasminter.dev/posts/create-a-book-club-bot-using-discord-js-v14" className="hover:text-cyan-800">
          <div className="grid sm:grid-cols-4 mt-10 sm:items-center sm:mt-10 bg-gray-200 p-4 rounded-lg">
            <div className="max-w-sm m-auto sm:hidden">
              <Image
                src="/images/bookclubbotcourseimage.webp"
                alt="discord course image"
                width="200"
                height="200"
                className="rounded-lg"
              />
            </div>
            <div className="text-center items-center sm:text-left sm:col-span-3">
              <h1 className="my-4 no-underline text-l align-top">
                Create a Book Club Bot using Discord.js v14
              </h1>
              <div className="text-m">
                In this tutorial, I will guide you through creating your first Discord bot. We will begin by setting up our bot in the Discord developer portal, followed by setting up the bot locally. I will teach you how to develop a basic chatbot, and then we will dive into creating slash commands with more detail. Finally, we will deploy the bot to ensure it runs continuously. CLICK TO READ MORE ->
              </div>
            </div>
            <div className="max-w-md hidden sm:block sm:col-start-1 sm:row-start-1 sm:mr-4">
              <Image
                src="/images/bookclubbotcourseimage.webp"
                alt="discord course image"
                width="200"
                height="200"
                className="rounded-lg"
              />
            </div>
          </div>
        </a>
      </div>
      <div>
        <h2 className="text-l text-center">Latest Blog Posts</h2>
        <div className="sm:block md:grid md:grid-cols-3">
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
      <div className="py-5">
        <a 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          target="_blank"
          href='/files/Lucas-Minter-Resume.pdf' 
          rel="noopener noreferrer"
        >
        Download Resume
        </a>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const post = await client.fetch(groq`*[_type == "post"] | order(_createdAt desc)[0..2] {
    title,
    author->,
    category,
    publishedAt,
    slug
  }`);
  return {
    props: {
      post: post
    }
  }
}