import Head from 'next/head'
import Layout from '../components/layout.js'
import {PageHeader} from '../components/headers.js'
import {TabBar} from '../components/tabBar.js'

const tasksByStatus = [[{id: 1, title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"},
                {id: 2, title:"Clean fireplace", difficulty:"Easy", description:"Remove ash and scrub tray"},
                {id: 3, title:"Clean gutter", difficulty:"Easy", description:"Remove leaves and other debris"}],
                [],
                [{title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"},
                {title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"},
                {title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"}]];

export default function Tasks() {
  return (
    <div>
      <Head>
        <title>UCHI | Tasks</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className="pageContent">
          <PageHeader iconpath="/icons/todo_gradient.png" headertext={"Tasks"} />
          <TabBar type="tasks" tabs={["In Progress", "Upcoming", "Completed"]} tabContent={tasksByStatus} />
        </div>
      </Layout>
    </div>
  )
}
