// import { useRouter } from 'next/router'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import Head from 'next/head'

export default function Post({ post }) {
  // const router = useRouter()
  // const { id } = router.query

  return (
    <div className="container pt-5">
      <Head>
        <title>{post.title}</title>
      </Head>
      <h1 className="text-center">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  )
}

export async function getServerSideProps(context) {
  const postId = context.query.id

  const client = new ApolloClient({
    uri: 'https://graphql.cosmicjs.com/v3',
    cache: new InMemoryCache()
  })

  const { data } = await client.query({
    query: gql`
      {
        getObject(
          bucket_slug: "dsc-mini-project-production",
          read_key: "ohztgdchBHihfDO4PcPpbpYLnwlFnnY5OfECw9xKXsEKtNc0S0",
          object_id: "${postId}"
        ) {
          title,
          content,
          published_at
        }
      }
    `
  })

  return {
    props: {
      post: data.getObject
    }
  }
}
