import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import Link from 'next/link'

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <div className={styles.grid}>
        {
          posts.map((post) => (
            <Link key={post.id} href={`/post/${post.id}`}>
              <a className={styles.card}>
                <img 
                  className='mb-4'
                  src={post.metadata.thumbnail.url} 
                  alt={post.title} 
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover',
                    borderRadius: '10px 10px 0 0'
                  }}
                />
                <div className='p-2 px-3'>
                  <h3>{post.title}</h3>
                  <p>
                    Posted on {new Date(post.published_at).toLocaleDateString()}
                  </p>
                </div>
              </a>
            </Link>
          ))
        }
        </div>
      </main>
    </div>

    
  )
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'https://graphql.cosmicjs.com/v3',
    cache: new InMemoryCache()
  })

  const { data } = await client.query({
    query: gql`
      {
        getObjects(
          bucket_slug: "dsc-mini-project-production",
          read_key: "ohztgdchBHihfDO4PcPpbpYLnwlFnnY5OfECw9xKXsEKtNc0S0",
          input: {
            query: {
              type: "posts"
            }
          }
        ) {
          objects {
            id,
            title,
            published_at,
            metadata,
          }
        }
      }
    `
  })

  console.log(data.getObjects.objects)
  
  return {
    props: {
      posts: data.getObjects.objects
    }
  }
}