import Head from 'next/head'
import Layout from '../../components/layout.js'
import {AddHFHeader} from '../../components/headers.js'
import {TypeCard} from '../../components/typeCard.js'

import styles from '../../components/details.module.css'
import addingStyles from '../../components/addingHomeFeature.module.css'

const types = [{type:"Top Freezer", imgpath:"/../public/images/refrigerator/topfreezer.jpg"},
                {type:"Bottom Freezer", imgpath:"/../public/images/refrigerator/topfreezer.jpg"},
                {type:"Side by Side", imgpath:"/../public/images/refrigerator/topfreezer.jpg"},
                {type:"French Door", imgpath:"/../public/images/refrigerator/topfreezer.jpg"},
                {type:"Built-in", imgpath:"/../public/images/refrigerator/topfreezer.jpg"}];

export default function Type() {
  return (
    <div className={styles.chocolate60bg}>
      <Head>
        <title>UCHI | Add a Home Feature</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className={styles.chocolate60filler}>
          <div className={styles.detailsContainer}>
            <div className="pageContent">
              <AddHFHeader name="Refrigerator" />
            </div>
          </div>
          <div className="pageContent">
            <h2 className={addingStyles.question}>What type of Refrigerator do you have?</h2>
            <div className={addingStyles.cardContainer}>
              {getTypeCards()}
            </div>
          </div>
        </div>
        <div className={styles.chocolate60filler}>
        </div>
      </Layout>
    </div>
  )
}

function getTypeCards() {
  var cards = [];
  for (let i = 0; i < types.length; i++) {
    cards.push(
      <TypeCard type={types[i].type} imgpath={types[i].imgpath} />
    );
  }
  return cards;
}
