import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/Auth'
import Account from '../components/Account'
import { useRouter } from 'next/router'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/layout.js'

import styles from '../styles/Landing.module.css'
import navStyles from '../components/uchiNavbar.module.css'

export default function SignIn() {
  const router = useRouter();
  
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  var navbar = (
    <Navbar id="landing-nav" bg="#FFF8E6" expand="lg">
      <Container>
        <Navbar.Brand className={navStyles.brand} href="/">UCHI</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/#features">Features</Nav.Link>
            <Nav.Link href="/#demo">Demo</Nav.Link>
            <Nav.Link href="/#team">Team</Nav.Link>
            <Nav.Link href="/#status">Status</Nav.Link>
            <Nav.Link href="#">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )

  return (
    <div className={styles.bg}>
      <Head>
        <title>UCHI</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.displayTop}>
        {navbar}
      </div>
        <div className={styles.visualContainer}>
          <div className={styles.visualChocolate80}>
            <img src="/landing-visual.png" alt="A person cheers next to their home." />
          </div>
          <div className={styles.visualVanillaToasted}>
            <div className={styles.dictionaryContainer}>
              <p className="brand noMB">U&#8226;CHI</p>
              <p className={styles.phonetic}>/ <span className={styles.overline}>oo</span>CH<span className={styles.overline}>e</span> /</p>
              <p className={styles.definition}>make a house your home</p>
            </div>
          </div>
        </div>
        <div className={styles.pageContent}>
          <h1 className={styles.title}><span className={styles.titleBrand}>Sign In to UCHI</span></h1>
          {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
          <hr className={styles.hr} />
        </div>
        <div className={styles.backtomain}>
          <Link href="/">
            <a><img src="/icons/carrotbtn_left_line.svg" alt="Back to main" />Back to Main</a>
          </Link>
        </div>
        <div className={styles.footer}>
          <div>
            <p className={styles.brand}>UCHI</p>
            <p>&copy; 2022 UCHI. All rights reserved.</p>
          </div>
          <img className={styles.ischool} src="/iSchoolLogo_UCHI_TextLight.png" alt="University of Washington Information School" />
        </div>
    </div>
  )
}
