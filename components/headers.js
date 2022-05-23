import {useState} from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import {BtnComplete, BtnPostpone, BtnDelete} from './button.js'
import {ModalAddHF} from './modalAddHF.js'
import {IconAdd_Line_Light, IconCircleCarrot_Left_Line_Light, IconHFRefrigerator} from './icons.js'

import styles from './headers.module.css'

// progress bar component from https://www.npmjs.com/package/react-circular-progressbar
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// PROPS
// page: string - page name
export function PageHeader(props) {
  if (props.page == "dashboard") {
    return (
      <div className={styles.header}>
        <div className="iconFirst">
          <img src="./icons/dashboard_gradient.svg" alt="Dashboard" />
        </div>
        <div>
          <h1 className={styles.pageHeader}>{props.headertext}</h1>
          <p className="callout page-tagline">Let&apos;s maintain your home sweet home.</p>
        </div>
      </div>
    )
  } else if (props.page == "homefeatures") {
    return (
      <div className={styles.header}>
        <div className="iconFirst">
          <img src="./icons/homefeatures_gradient.svg" alt="Home Features" />
        </div>
        <div>
          <h1 className={styles.pageHeader}>{props.headertext}</h1>
          <p className="callout page-tagline">Let&apos;s maintain your home sweet home.</p>
        </div>
      </div>
    )
  } else if (props.page == "tasks") {
    return (
      <div className={styles.header}>
        <div className="iconFirst">
          <img src="./icons/tasks_gradient.svg" alt="Tasks" />
        </div>
        <div>
          <h1 className={styles.pageHeader}>{props.headertext}</h1>
          <p className="callout page-tagline">Let&apos;s maintain your home sweet home.</p>
        </div>
      </div>
    )
  }
  return (
    <div className={styles.header}>
      <div className="iconFirst">
        <Image src={props.iconpath} width={45} height={45} alt="Page header icon" />
      </div>
      <h1 className={styles.pageHeader}>{props.headertext}</h1>
    </div>
  )
}

export function SectionHeader(props) {
  return (
    <div className={styles.header}>
    <div className="iconFirst iconRegular">
      <img src={props.iconpath} alt="Section header icon" />
    </div>
      <h2 className={styles.pageHeader}>{props.headertext}</h2>
    </div>
  )
}

export function SpaceHeader(props) {
  // Add HF Modal state
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={styles.header}>
      <h2 className={styles.pageHeader}>{props.headertext}</h2>
      <div className="iconLast iconRegular hfadd-icon" onClick={handleShow}>
        <img src="./icons/plus_line.svg" alt="Add Home Feature" />
      </div>
      <ModalAddHF show={show} handleClose={handleClose} headertext={props.headertext} />
    </div>
  )
}

export function DetailsHeader(props) {
  const router = useRouter();

  if (props.type == "task") {
    return (
      <div className={styles.sticky}>
        <div className={styles.detailsRow}>
          <div className="iconRegular iconFirst" onClick={() => router.back()}>
            <IconCircleCarrot_Left_Line_Light />
          </div>
          <h1 className={styles.taskHeader}>{props.name}</h1>
          <CircularProgressbar className={styles.progressbar} value={props.progressValue} maxValue={100} text={props.progressValue + '%'} />
        </div>
        <div className={styles.btnRow}>
          <BtnComplete handleComplete={props.handleComplete} />
          <BtnPostpone />
          <BtnDelete />
        </div>
      </div>
    )
  } else if (props.type == "hf") {
    return (
      <div>
        <div className={styles.detailsRow}>
          <div className="iconRegular iconFirst" onClick={() => router.push('/homefeatures')}>
            <IconCircleCarrot_Left_Line_Light />
          </div>
          <div className="iconRegular iconFirst">
            <img src={props.iconpath} alt={props.name} />
          </div>
          <h1 className={styles.pageHeader}>{props.name}</h1>
        </div>
        <p className="smallHeader lifespan">Average Lifespan: 10 years</p>
      </div>
    )
  }
}

export function AddHFHeader(props) {
  const router = useRouter();
  return (
    <div>
      <div className={styles.detailsRow}>
        <div className="iconRegular iconFirst" onClick={() => router.back()}>
          <IconCircleCarrot_Left_Line_Light />
        </div>
        <div className="iconRegular iconFirst">
          <img src={props.iconpath} alt={props.name} />
        </div>
        <h1 className={styles.pageHeader}>{props.name}</h1>
      </div>
    </div>
  )
}

// PROPS
// profileImg: string - src of profile image
// name: string - user's name
// home: string - home type and build month/year
export function ProfileHeader(props) {
  const router = useRouter();
  return (
    <div className={styles.profile}>
      <img className={styles.profileImg} src={props.profileImg} alt="Profile Image" />
      <div className={styles.profileInfo}>
        <h1 className={styles.pageHeader}>{props.name}</h1>
        <p className="callout">{props.home}</p>
      </div>
    </div>
  )
}
