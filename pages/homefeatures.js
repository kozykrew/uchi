import Head from 'next/head'
import Layout from '../components/layout.js'
import {PageHeader} from '../components/headers.js'
import {Space} from '../components/space.js'

const hfs = [{name:"Windows", iconpath:"/../public/icons/hf_window.png"},
            {name:"Windows", iconpath:"/../public/icons/hf_window.png"},
            {name:"Windows", iconpath:"/../public/icons/hf_window.png"},
            {name:"Windows", iconpath:"/../public/icons/hf_window.png"}]

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
          <Space name={"Kitchen"} hfs={hfs} />
          <Space name={"Exterior"} hfs={[]} />
          <Space name={"Bathroom"} hfs={[]} />
          <Space name={"Surfaces"} hfs={[]} />
          <Space name={"Systems"} hfs={[]} />
        </div>
      </Layout>
    </div>
  )
}
