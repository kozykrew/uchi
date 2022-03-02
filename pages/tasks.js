import Head from 'next/head'
import Layout from '../components/layout.js'
import {PageHeader} from '../components/headers.js'
import {TabBar} from '../components/tabbar.js'

const user = 'KozyKrew'

export default function Dashboard() {
  return (
    <div>
      <Head>
        <title>UCHI | Tasks</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className="pageContent">
          <PageHeader iconpath="/../public/icons/todo_gradient.png" headertext={"Tasks"} />
          <TabBar tabs={["In Progress", "Upcoming", "Completed"]}/>
        </div>
      </Layout>
    </div>
  )
}
