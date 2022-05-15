import Link from 'next/link'
import Image from 'next/image'
import Carousel from 'react-bootstrap/Carousel'
import {HomeFeatureCard} from './homeFeatureCard.js'

import styles from './homeFeatureList.module.css'

// PROPS
// space: string - name of space
// hfs: array of home features
export function HomeFeatureList(props) {
  if (props.hfs.length > 0) {
    var hfcards = props.hfs.map((hf) => (
      <HomeFeatureCard key={hf.name.replace(/\s+/g, '')} space={props.space} hfName={hf.name} />
    ));
    return (
      <div className={styles.container}>
        <HomeFeatureCard space={props.space} hfName="Add a Feature" />
        {hfcards}
      </div>
    )
  } else {
    return (
      <div>
        <p className="smallHeader no-hfs-notice">Home Features added to the {props.space} Space will appear here</p>
        <HomeFeatureCard space={props.space} hfName="Add a Feature" />
      </div>
    )
  }


  // <div className={styles.controls}>
  //   <div className={styles.controlLeft}>
  //     <Image src="/../public/icons/circlearrow_left_line.png" width={32} height={32} />
  //   </div>
  //   <div className={styles.controlRight}>
  //     <Image src="/../public/icons/circlearrow_right_line.png" width={32} height={32} />
  //   </div>
  // </div>

  var carouselItems = [];
  // hfcards.forEach((hfc, i) => (
  //   if (i % hfcards == 0) {
  //     carouselItems.push(<Carousel.Item></Carousel.Item>);
  //   }
  // ))
  var itemCards = [];
  // for (let i = 0; i < hfcards.length; i++) {
  //   if (itemCards.length < 4) {
  //     itemCards.push(hfcards[i]);
  //   } else {
  //     carouselItems.push(
  //       <Carousel.Item>
  //         {itemCards}
  //       </Carousel.Item>
  //     );
  //     itemCards = [];
  //   }
  // }
  //
  // return (
  //   <Carousel interval={null}>
  //     <Carousel.Item>
  //       {hfcards[0]}
  //       <Carousel.Caption>
  //         <h3>First slide label</h3>
  //         <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
  //       </Carousel.Caption>
  //     </Carousel.Item>
  //   </Carousel>
  // )
}
