import React from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {TaskList} from './taskList.js'
import {StepList} from './stepList.js'
import {BtnTool} from './button.js'

import styles from './tabBar.module.css'

// PROPS
// type: string - type of tab bar (tasks or steps)
// tabs: array of strings
// tabContent: array of task/step objects arrays
// tools: array of strings (optional - only for steps tabbars) // TODO: tool object (opens dictionary on click)

// PROPS if props.type == "steps"
// stepsComplete: state variable - array holding complete status of all steps
// setStepsComplete: state function - sets stepsComplete state variable
// handleProgress: function handling progress bar value based on step completion
export function TabBar(props) {
  var tabContent;
  var diyTools = [];
  var tools;

  if (props.type == "tasks") {
    tabContent = props.tabContent.map((content, i) => (
      <TaskList key={i} dashboard={false} tasks={content} />
    ));
  } else if (props.type == "steps") {
    tabContent = props.tabContent.map((content, i) => (
      <StepList key={i} steps={content} stepsComplete={props.stepsComplete} setStepsComplete={props.setStepsComplete} handleProgress={props.handleProgress} />
    ));
    diyTools = props.tools.map((tool, i) => (
      <BtnTool key={i} name={tool} />
    ));
    tools = (
      <div>
        <h3>Major Tools</h3>
        <div className={styles.toolContainer}>
          {diyTools}
        </div>
      </div>
    );
  }

  var tabs = props.tabs.map((tab, i) => (
    <Tab key={i} eventKey={tab.replace(/\s+/g, '').toLowerCase()} title={tab}>
      {tools}
      {tabContent[i]}
    </Tab>
  ));

  var defaultActive = props.tabs[0].replace(/\s+/g, '').toLowerCase();

  return (
    <Tabs defaultActiveKey={defaultActive} id="tabbar" className="mb-3" variant="pills">
      {tabs}
    </Tabs>
  )
}

// PROPS
// tabs: array of strings
// tabContent: array of task/step objects arrays
export function CalendarTabs(props) {
  var tabContent;
  tabContent = props.tabContent.map((content, i) => (
    <TaskList key={i} dashboard={true} tasks={content} />
  ));

  var tabs = props.tabs.map((tab, i) => (
    <Tab key={i} eventKey={tab.replace(/\s+/g, '').toLowerCase()} title={tab}>
      {tabContent[i]}
    </Tab>
  ));

  var defaultActive = props.tabs[0].replace(/\s+/g, '').toLowerCase();

  return (
    <Tabs defaultActiveKey={defaultActive} id="tabbar" className="mb-3" variant="pills">
      {tabs}
    </Tabs>
  )
}
