import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from './headers.module.css'

// progress bar component from https://www.npmjs.com/package/react-circular-progressbar
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import {BtnComplete, BtnPostpone, BtnDelete} from './button.js'

export function PageHeader(props) {
  return (
    <div className={styles.header}>
      <div className="iconFirst iconSelected">
        <Image src={props.iconpath} width={45} height={45} />
      </div>
      <h1 className={styles.pageHeader}>{props.headertext}</h1>
    </div>
  )
}

export function SectionHeader(props) {
  return (
    <div className={styles.header}>
    <div className="iconFirst iconRegular">
      <Image src={props.iconpath} width={32} height={32} />
    </div>
      <h2 className={styles.pageHeader}>{props.headertext}</h2>
    </div>
  )
}

export function SpaceHeader(props) {
  return (
    <div className={styles.header}>
      <h2 className={styles.pageHeader}>{props.headertext}</h2>
      <div className="iconLast iconRegular">
        <Image src="/../public/icons/add.png" width={32} height={32} />
      </div>
    </div>
  )
}

export function DetailsHeader(props) {
  const router = useRouter();

  var content;
  if (props.type == "task") {
    var value = 0;
    return (
      <div>
        <div className={styles.detailsRow}>
          <div className="iconRegular">
            <Image src="/../public/icons/circlecarrot_left_line.png" layout="fixed" width={32} height={32} onClick={() => router.push('/tasks')} />
          </div>
          <h1 className={styles.taskHeader}>{props.name}</h1>
          <CircularProgressbar className={styles.progressbar} value={value} maxValue={1} text={value*100 + '%'} />
        </div>
        <div className={styles.btnRow}>
          <BtnComplete />
          <BtnPostpone />
          <BtnDelete />
        </div>
      </div>
    )
  } else if (props.type == "hf") {
    return (
      <div>
      </div>
    )
  }

  // return (
  //   <div className={styles.detailsRow}>
  //     <div className="iconRegular">
  //       <Image src="/../public/icons/circlecarrot_left_line.png" layout="fixed" width={32} height={32} onClick={() => router.push('/tasks')} />
  //     </div>
  //     {content}
  //   </div>
  // )
}
