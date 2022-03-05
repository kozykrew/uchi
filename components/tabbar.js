import React from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {TaskList} from '../components/tasklist.js'
import {StepList} from '../components/steplist.js'

export function TabBar(props) {
  var children;

  if (props.type == "tasks") {
    children = props.tabs.map(tab => (
      <Tab eventKey={tab.replace(/\s+/g, '').toLowerCase()} title={tab}>
        <TaskList dashboard={false} />
      </Tab>
    ));
  } else if (props.type == "steps") {
    children = props.tabs.map(tab => (
      <Tab eventKey={tab.replace(/\s+/g, '').toLowerCase()} title={tab}>
        <StepList />
      </Tab>
    ));
  }

  var defaultActive = props.tabs[0].replace(/\s+/g, '').toLowerCase();

  return (
    <Tabs defaultActiveKey={defaultActive} id="tabbar" className="mb-3" variant="pills">
      {children}
    </Tabs>
  )

  // return (
  //   <Tabs defaultActiveKey="inprogress" id="tabbar-tasks" className="mb-3" variant="pills">
  //     <Tab eventKey="inprogress" title="In Progress">
  //       <Task taskTitle="Fertilize lawn" taskDifficulty="Easy" taskDesc="Feed lawn with nutrients" />
  //     </Tab>
  //     <Tab eventKey="upcoming" title="Upcoming">
  //       <Task taskTitle="Fertilize lawn" taskDifficulty="Easy" taskDesc="Feed lawn with nutrients" />
  //     </Tab>
  //     <Tab eventKey="completed" title="Completed">
  //       <Task taskTitle="Fertilize lawn" taskDifficulty="Easy" taskDesc="Feed lawn with nutrients" />
  //     </Tab>
  //   </Tabs>
  // )
}
