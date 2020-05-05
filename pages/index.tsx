import fetch from 'node-fetch'
import Head from 'next/head'
import Link from 'next/link'

import { GetStaticProps, GetStaticPaths, GetServerSideProps, NextPage } from 'next'

console.log("ENV", process.env.BLOGGABLE_CONTENT_URL)

export interface IStubbedPost{
  id: string
  type: "posts"
  attributes: {
      "blogId": string
      "title": string
      "author": string
  }
}

export interface IPageProps {
  posts: Array<IStubbedPost>
}

const Page: NextPage<IPageProps> = ({ posts}) => {
  return (
    <div className="container">
      <Head>
        <title>Bloggable Test Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href="/posts/[id]" as={`/posts/${post.id}`}><a href={`/posts/${post.id}`}>{post.attributes.title}</a></Link>
            </li>
        ))}
        </ul>

      </main>


      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
   
        }

        main {
          padding: 5rem 0;
        }

     
       
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}


export const getStaticProps: GetStaticProps<IPageProps> = async context => {

  const res = await fetch(`${process.env.BLOGGABLE_CONTENT_URL}/posts`)
  const responseJson = await res.json() as { data: Array<IStubbedPost> }

  return { props: {posts: responseJson.data }}
}

export default Page