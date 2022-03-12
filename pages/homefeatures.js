import Head from 'next/head'
import Layout from '../components/layout.js'
import {PageHeader} from '../components/headers.js'
import {Space} from '../components/space.js'

const kitchenHfs = [{name:"Dishwasher", iconpath:"/../public/icons/hf_window.png"},
            {name:"Garbage Disposal", iconpath:"/../public/icons/hf_microwave.svg"},
            {name:"Microwave", iconpath:"/../public/icons/hf_window.png"}];

const exteriorHfs = [{name:"Windows", iconpath:"/../public/icons/hf_window.png"}];

export default function HomeFeatures() {
  return (
    <div>
      <Head>
        <title>UCHI | Home Features</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className="pageContent">
          <PageHeader iconpath="/icons/homefeatures_gradient.png" headertext={"Home Features"} />
          <Space name={"Exterior"} hfs={exteriorHfs} />
          <Space name={"Kitchen"} hfs={kitchenHfs} />
          <Space name={"Bathroom"} hfs={[]} />
          <Space name={"Surfaces"} hfs={[]} />
          <Space name={"Systems"} hfs={[]} />
        </div>
      </Layout>
    </div>
  )
}
