import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../components/layout.js'
import {ProfileHeader} from '../components/headers.js'
import {ProfileCard} from '../components/profileCard.js'

import styles from '../components/details.module.css'
import profileCardStyles from '../components/profileCard.module.css'

export default function Profile() {
  const router = useRouter();

  return (
    <div className={styles.vanillaToastedbg}>
      <Head>
        <title>UCHI | Profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className={styles.vanillaToastedFiller}>
          <div className={styles.detailsContainer}>
            <div className="pageContent">
              <ProfileHeader profileImg="/profile.png" name={"Kai Ong"} home={"New build (December 2021)"} />
            </div>
          </div>
          <div className={styles.detailsContainerDetailsPagesDesktop}>
            <div className="pageContent">
              <div className={styles.addHFHeaderDesktop}>
                <ProfileHeader profileImg="/profile.png" name={"Kai Ong"} home={"New build (December 2021)"} />
              </div>
            </div>
          </div>
          <div className="pageContent">
            <div className={profileCardStyles.profileCardContainer}>
              <ProfileCard title={"Spaces"} data={"3"} outof={"of 8"} />
              <ProfileCard title={"Home Features"} data={"4"} outof={"of 23"} />
            </div>
            <div className={profileCardStyles.profileCardContainer}>
              <ProfileCard title={"Total Tasks Completed"} data={"8"} />
              <ProfileCard title={"Months on UCHI"} data={"3"} />
            </div>
          </div>
        </div>
        <div className={styles.vanillaToastedFiller}>
        </div>
      </Layout>
    </div>
  )
}
