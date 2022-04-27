import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout.js'
import {PageHeader, SectionHeader} from '../components/headers.js'
import {Calendar} from '../components/calendar.js'
import {TaskList} from '../components/taskList.js'
import {Task} from '../components/task.js'

const user = 'Kai';

const tasks = [{title:"Clean gutter", difficulty:"Easy", description:"Remove leaves and other debris"},
                {title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"},
                {title:"Clean fireplace", difficulty:"Easy", description:"Remove ash and scrub tray"},
                {title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"},
                {title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"},
                {title:"Fertilize lawn", difficulty:"Easy", description:"Feed lawn with nutrients"}];

export default function Dashboard() {
  let additionalTaskLink;
  if (tasks.length > 3) {
    additionalTaskLink = (
      <Link href="/tasks">
        <a className="labelAdditional">+ {tasks.length - 3} more</a>
      </Link>
    );
  }
  return (
    <div>
      <Head>
        <title>UCHI | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className="pageContent">
          <PageHeader iconpath={"/icons/dashboard_gradient.png"} headertext={"Welcome, " + user + "!"} />
          <SectionHeader iconpath="/icons/calendar_duotone.png" headertext={"2022"} />
          <Calendar months={["Mar", "Apr", "May", "Jun", "Jul"]} />
          <SectionHeader iconpath="/icons/tasks_duotone.png" headertext="March Tasks" />
          <TaskList dashboard={true} tasks={tasks} />
          {additionalTaskLink}
        </div>
      </Layout>
    </div>
  )
}
