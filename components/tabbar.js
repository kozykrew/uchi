import React from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {TaskList} from '../components/tasklist.js'

export function TabBar(props) {
  var children = props.tabs.map(tab => (
    <Tab eventKey={tab.replace(/\s+/g, '').toLowerCase()} title={tab}>
      <TaskList dashboard={false} />
    </Tab>
  ));

  return (
    <Tabs defaultActiveKey="inprogress" id="tabbar-tasks" className="mb-3" variant="pills">
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

// this didn't work haha
// function createTabs(tabs) {
//   const tabs = ["In Progress", "Upcoming", "Completed"];
//   var children = [];
//
//   tabs.forEach((item, i) => {
//     var key = item.replace(/\s+/g, '');
//     var tab = React.createElement("Tab", {eventKey: key, title: item});
//     children.push(tab)
//   });
//
//   var tabContainer = React.createElement("Tabs", {defaultActiveKey:"inprogress", id:"tabbar-tasks", className:"mb-3", variant:"pills"}, children);
//
//   return tabContainer;
// }
