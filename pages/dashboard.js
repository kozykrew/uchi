import Head from 'next/head'
import Layout from '../components/layout.js'
import {PageHeader, SectionHeader} from '../components/headers.js'
import {Calendar} from '../components/calendar.js'
import {Task} from '../components/task.js'

const user = 'KozyKrew'

export default function Dashboard() {
  return (
    <div>
      <Head>
        <title>UCHI | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className="pageContent">
          <PageHeader iconpath="/../public/icons/dashboard_gradient.png" headertext={"Welcome, " + user + "!"} />
          <SectionHeader iconpath="/../public/icons/calendar_duotone.png" headertext={"2022"} />
          <Calendar months={["Mar", "Apr", "May", "Jun", "Jul"]} />
          <SectionHeader iconpath="/../public/icons/tasks_duotone.png" headertext="March Tasks" />
          <Task taskTitle="Fertilize lawn" taskDifficulty="Easy" taskDesc="Feed lawn with nutrients" />
        </div>
      </Layout>
    </div>
  )
}
