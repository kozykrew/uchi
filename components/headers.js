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

export function PageHeader(props) {
  return (
    <div className={styles.header}>
      <div className="iconFirst iconSelected">
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
      <Image src={props.iconpath} width={32} height={32} alt="Section header icon" />
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
      <div className="iconLast iconRegular" onClick={handleShow}>
        <IconAdd_Line_Light />
      </div>
      <ModalAddHF show={show} handleClose={handleClose} headertext={props.headertext} />
    </div>
  )
}

export function DetailsHeader(props) {
  const router = useRouter();

  if (props.type == "task") {
    return (
      <div>
        <div className={styles.detailsRow}>
          <div className="iconRegular iconFirst" onClick={() => router.back()}>
            <IconCircleCarrot_Left_Line_Light />
          </div>
          <h1 className={styles.taskHeader}>{props.name}</h1>
          <CircularProgressbar className={styles.progressbar} progressValue={props.progressValue} maxValue={1} text={props.progressValue*100 + '%'} />
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
            <IconHFRefrigerator />
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
        <div className="iconRegular iconFirst" onClick={() => router.push(props.previous)}>
          <IconCircleCarrot_Left_Line_Light />
        </div>
        <div className="iconRegular iconFirst">
          <IconHFRefrigerator />
        </div>
        <h1 className={styles.pageHeader}>{props.name}</h1>
      </div>
    </div>
  )
}
