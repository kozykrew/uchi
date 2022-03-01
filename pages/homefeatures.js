import Head from 'next/head'
import Layout from '../components/layout.js'
import {PageHeader} from '../components/headers.js'
import {Space} from '../components/space.js'

export default function HomeFeatures() {
  return (
    <div>
      <Head>
        <title>UCHI | Home Features</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className="pageContent">
          <PageHeader iconpath="/../public/icons/homefeatures_gradient.png" headertext={"Home Features"} />
          <Space headertext={"Kitchen"} />
        </div>
      </Layout>
    </div>
  )
}
