import { useState, useContext, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import AppContext from '../AppContext.js'
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import {OnboardingLayout} from '../components/layout.js'

import styles from '../styles/Onboarding.module.css'
import btnStyles from '../components/button.module.css'

import SignIn from './signin.js'

export default function Onboarding() {
  const contextValue = useContext(AppContext);
  const router = useRouter();
  const username = contextValue.state.username;

  async function updateProfile({ username }) {
    try {
      const user = supabase.auth.user()

      const updates = {
        id: user.id,
        username,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    }
  }

  updateProfile({ username })

  // state for onboarding stages
  const [stage, setStage] = useState(0);
  // state for onboarding carousel index
  const [carouselIndex, setCarouselIndex] = useState(0);

  // function controlling carousel index (carousel indicators)
  const handleSelect = (selectedIndex, e) => {
    setCarouselIndex(selectedIndex);
  };

  if (contextValue.state.loggedIn) {
    var stage0 = (
      <div className={styles.start}>
        <h1>Hi {username}!</h1>
        <h2>Let&apos;s take a tour of <span className="brand">UCHI</span>!</h2>
        <Button
          variant="light"
          className={btnStyles.startTour}
          onClick={() => {
            setCarouselIndex(0)
            setStage(stage+1)
          }}
        >
          <img src="/icons/carrotbtn_right_line_dark.svg" alt="Start tour" />Start Tour
        </Button>
      </div>
    );

    var stage1 = (
      <Carousel variant="dark" interval={null} controls={false} activeIndex={carouselIndex} onSelect={handleSelect}>
        <Carousel.Item>
          <div className={styles.vanillaToastedbg}>
            <img className={styles.onboardingImgMobile} src="/onboarding/dashboard.png" alt="Onboarding: dashboard" />
            <div className={styles.vanillaOnboarding}>
              <div>
                <h1>The Dashboard</h1>
                <p className="smallHeader">See an overview of upcoming tasks in the month and your progress!</p>
              </div>
              <Button
                variant="light"
                className={btnStyles.onboarding}
                onClick={() => setCarouselIndex(carouselIndex+1)}
              >
                <img src="/icons/carrotbtn_right_line_dark.svg" alt="Onboarding: next" />Next
              </Button>
            </div>
            <div className={styles.desktopImgContainer}>
              <img className={styles.onboardingImgDesktop} src="/onboarding/dashboard_desktop.png" alt="Onboarding: dashboard" />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className={styles.vanillaToastedbg}>
            <img className={styles.onboardingImgMobile} src="/onboarding/tasks.png" alt="Onboarding: tasks" />
            <div className={styles.vanillaOnboarding}>
              <div>
                <h1>Tasks</h1>
                <p className="smallHeader">Read overview and “How To” steps about a task.</p>
                <p className="smallHeader">Check steps and task off as complete!</p>
              </div>
              <Button
                variant="light"
                className={btnStyles.onboarding}
                onClick={() => setCarouselIndex(carouselIndex+1)}
              >
                <img src="/icons/carrotbtn_right_line_dark.svg" alt="Onboarding: next" />Next
              </Button>
            </div>
            <div className={styles.desktopImgContainer}>
              <img className={styles.onboardingImgDesktop} src="/onboarding/tasks_desktop.png" alt="Onboarding: tasks" />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className={styles.vanillaToastedbg}>
            <img className={styles.onboardingImgMobile} src="/onboarding/profile.png" alt="Onboarding: profile" />
            <div className={styles.vanillaOnboarding}>
              <div>
                <h1>Profile</h1>
                <p className="smallHeader">See an overview of account information.</p>
                <p className="smallHeader">Access completed tasks by clicking on the “Total Tasks Completed” square!</p>
              </div>
              <Button
                variant="light"
                className={btnStyles.onboarding}
                onClick={() => setCarouselIndex(carouselIndex+1)}
              >
                <img src="/icons/carrotbtn_right_line_dark.svg" alt="Onboarding: next" />Next
              </Button>
            </div>
            <div className={styles.desktopImgContainer}>
              <img className={styles.onboardingImgDesktop} src="/onboarding/profile_desktop.png" alt="Onboarding: profile" />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className={styles.vanillaToastedbg}>
            <img className={styles.onboardingImgMobile} src="/onboarding/homefeatures.png" alt="Onboarding: home features" />
            <div className={styles.vanillaOnboarding}>
              <div>
                <h1>Home Features</h1>
                <p className="smallHeader">Add places around your home you would like to maintain.</p>
                <p className="smallHeader">Answer a few questions.</p>
                <p className="smallHeader">Sit back and relax while we build your maintenance guide!</p>
              </div>
              <Button
                variant="light"
                className={btnStyles.onboarding}
                onClick={() => setStage(stage+1)}
              >
                <img src="/icons/carrotbtn_right_line_dark.svg" alt="End tour" />End Tour
              </Button>
            </div>
            <div className={styles.desktopImgContainer}>
              <img className={styles.onboardingImgDesktop} src="/onboarding/homefeatures_desktop.png" alt="Onboarding: home features" />
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    );

    var stage2 = (
      <div className={styles.start}>
        <h1>Ready, {username}?</h1>
        <h2>Let&apos;s add a Home Feature!</h2>
        <Button
          variant="light"
          className={btnStyles.startTour}
          onClick={() => router.push('/dashboard')}
        >
          <img src="/icons/plus_line_dark.svg" alt="Add a home feature" />Add a Feature
        </Button>
      </div>
    );

    var stages = [stage0, stage1, stage2];

    return (
      <div>
        <Head>
          <title>UCHI | Onboarding</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <OnboardingLayout>
          {stages[stage]}
        </OnboardingLayout>
      </div>
    )
  } else {
    return(<SignIn/>)
  }
}
