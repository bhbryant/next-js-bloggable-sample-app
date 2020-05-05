import fetch from 'node-fetch'
import Head from 'next/head'
import { GetStaticProps, GetStaticPaths, GetServerSideProps, NextPage } from 'next'
import { IStubbedPost } from '..'
import Link from 'next/link'

export interface IPost {
    id: string
    type: "posts"
    attributes: {
        blogId: string
        title: string
        author: string
        html: string
    }
}
export interface IPageProps {
    post: IPost
}

const Page: NextPage<IPageProps> = ({ post }) => {
    return (
        <div className="container">
            <Head>
                <title>Bloggable Test Blog -- {post.attributes.title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <section className="head">
                <Link href="/"><a href="/">All Posts</a></Link>
                <h1>{post.attributes.title}</h1>
                <h2>by {post.attributes.author}</h2>
                </section>
                <section dangerouslySetInnerHTML={{
                    __html: post.attributes.html
                }} />


            </main>

       

            <style jsx>{`
           .container {
            padding: 0 0.5rem;
          
     
          }
  
          main {
            padding: 5rem 0;
          }
  
          .head {
              padding-top: 2em;
              padding-bottom: 2em
              background-color: #eee;
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



export const getStaticProps: GetStaticProps<IPageProps, {id: string}> = async ({ params }) => {

    if(!params) {
        throw new Error("not found")
    }
    
    const res = await fetch(`${process.env.BLOGGABLE_CONTENT_URL}/posts/${params.id}`)
    const responseJson = await res.json() as { data: IPost }

    return { props: { post: responseJson.data } }
}



// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
console.log("ENV", process.env.BLOGGABLE_CONTENT_URL)

  const res = await fetch(`${process.env.BLOGGABLE_CONTENT_URL}/posts`)
  const responseJson = await res.json() as { data: Array<IStubbedPost> }

  // Get the paths we want to pre-render based on posts
  const paths = responseJson.data.map(post => `/posts/${post.id}`)

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export default Page