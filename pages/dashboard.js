import Head from 'next/head'
import {UchiNavbar} from '../components/navbar.js'
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
      <UchiNavbar />
      <div className="pageContent">
        <PageHeader iconpath="/../public/icons/dashboard_selected.png" headertext={"Welcome, " + user + "!"} />
        <SectionHeader iconpath="/../public/icons/calendar_duotone.png" headertext={"2022"} />
        <Calendar months={["Feb", "Mar", "Apr", "May", "Jun"]} />
        <SectionHeader iconpath="/../public/icons/tasks_duotone.png" headertext="February Tasks" />
        <Task taskTitle="Fertilize lawn" taskDifficulty="Easy" taskDesc="Feed lawn with nutrients" />
      </div>
    </div>
  )
}
