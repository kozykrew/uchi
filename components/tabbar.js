import React from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {TaskList} from '../components/tasklist.js'
import {StepList} from '../components/steplist.js'

// PROPS
// type: string - type of tab bar (tasks or steps)
// tabs: array of strings
// tabContent: array of task/step objects arrays
export function TabBar(props) {
  var tabContent;

  if (props.type == "tasks") {
    tabContent = props.tabContent.map((content) => (
      <TaskList dashboard={false} tasks={content} />
    ));
  } else if (props.type == "steps") {
    tabContent = props.tabContent.map((content) => (
      <StepList steps={content} />
    ));
  }

  var tabs = props.tabs.map((tab, i) => (
    <Tab eventKey={tab.replace(/\s+/g, '').toLowerCase()} title={tab}>
      {tabContent[i]}
    </Tab>
  ));

  var defaultActive = props.tabs[0].replace(/\s+/g, '').toLowerCase();

  return (
    <Tabs defaultActiveKey={defaultActive} id="tabbar" className="mb-3" variant="pills">
      {tabs}
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
