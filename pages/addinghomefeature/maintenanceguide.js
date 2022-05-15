import {useState} from 'react'
// import Form from 'react-bootstrap/Form'
// import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import Head from 'next/head'
import Layout, {AddHFFooter} from '../../components/layout.js'
import {AddHFHeader} from '../../components/headers.js'
import {MainDetailsTable} from '../../components/mainDetailsTable.js'
import {IconArrowRight_Dark, IconCalendar_Line_Dark} from '../../components/icons.js'


import styles from '../../components/details.module.css'
import addingStyles from '../../components/addingHomeFeature.module.css'

const mgTasks = [{title:"Fill Refrigerator", difficulty:"Easy", frequency:"Occasionally"},
                {title:"Refresh ice maker", difficulty:"Easy", frequency:"Quarterly"},
                {title:"Clean coils", difficulty:"Easy", frequency:"Annually"}];

export default function MaintenanceGuide() {
  var taskList = mgTasks.map((task) => (
    <MaintenanceTask key={task.title.replace(/\s+/g, '')} title={task.title} frequency={task.frequency} />
  ));

  return (
    <div className={styles.chocolate60bg}>
      <Head>
        <title>UCHI | Add a Home Feature</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className={styles.chocolate60bg}>
          <div className={styles.detailsContainer}>
            <div className="pageContent">
              <AddHFHeader name="Refrigerator" previous="/homefeatures" />
            </div>
          </div>
          <div className="pageContent">
            <div className={styles.detailsContainerDesktop}>
              <img className="btn-back" src="../icons/carrotbtn_left_line.svg" alt="Back" onClick={() => router.back()} />
              <div className={styles.addHFHeaderDesktop}>
                <img className={styles.addHFHeaderDesktopIcon} src="../icons/hf_refrigerator_lg.svg" alt="Refrigerator" />
                <h1>Add a Refrigerator</h1>
              </div>
            </div>
            <div className={addingStyles.prompt}>
              <h2 className="textDark">Creating a customized Maintenance Guide for your Refrigerator...</h2>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          </div>
        </div>
        <div className={styles.chocolate60filler}>
        </div>
        <AddHFFooter cancel="/homefeatures" toHF="/homefeaturedetails" />
      </Layout>
    </div>
  )

  // return (
  //   <div className={styles.chocolate60bg}>
  //     <Head>
  //       <title>UCHI | Add a Home Feature</title>
  //       <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  //     </Head>
  //     <Layout>
  //       <div className={styles.chocolate60bg}>
  //         <div className={styles.detailsContainer}>
  //           <div className="pageContent">
  //             <AddHFHeader name="Refrigerator" previous="/homefeatures" />
  //           </div>
  //         </div>
  //         <div className="pageContent">
  //           <div className={addingStyles.prompt}>
  //             <h2 className="textDark">Creating a customized Maintenance Guide for your Refrigerator...</h2>
  //           </div>
  //           <div>
  //             <p className="smallHeader textDark">{mgTasks.length} maintenance tasks</p>
  //             <div className={addingStyles.maintenanceGuideContainer}>
  //               <Table>
  //                 {taskList}
  //               </Table>
  //             </div>
  //             <p>have been recommended by <span className="brand">UCHI</span> for your Refrigerator!</p>
  //           </div>
  //         </div>
  //       </div>
  //       <div className={styles.chocolate60filler}>
  //       </div>
  //       <AddHFFooter cancel="/homefeatures" toHF="/homefeaturedetails" />
  //     </Layout>
  //   </div>
  // )
}

function MaintenanceTask(props) {
  return (
    <tr>
      <td>
        <div className={addingStyles.maintenanceTaskPiece}>
          <span className="iconFirst iconRegular">
            <IconArrowRight_Dark />
          </span>
          <p className="textDark noMB">{props.title}</p>
        </div>
      </td>
      <td>
        <div className={addingStyles.maintenanceTaskPiece}>
          <span className="iconFirst iconRegular">
            <IconCalendar_Line_Dark />
          </span>
          <p className="textDark noMB">{props.frequency}</p>
        </div>
      </td>
    </tr>
  )
}

// function MaintenanceTask(props) {
//   return (
//     <div className={addingStyles.maintenanceTask}>
//       <div className={addingStyles.maintenanceTaskPiece}>
//         <span className="iconFirst iconRegular">
//           <IconArrowRight_Dark />
//         </span>
//         <p className="textDark noMB">{props.title}</p>
//       </div>
//       <div className={addingStyles.maintenanceTaskPiece}>
//         <span className="iconFirst iconRegular">
//           <IconCalendar_Line_Dark />
//         </span>
//         <p className="textDark noMB">{props.frequency}</p>
//       </div>
//     </div>
//   )
// }
