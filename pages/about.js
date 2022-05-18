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

  var navbar = (
    <Navbar id="landing-nav" bg="#FFF8E6" expand="lg">
      <Container>
        <Navbar.Brand className={navStyles.brand} href="/">UCHI</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="/#features">Features</Nav.Link>
            <Nav.Link href="/#demo">Demo</Nav.Link>
            <Nav.Link href="/#team">Team</Nav.Link>
            <Nav.Link href="/#status">Status</Nav.Link>
            <Nav.Link href="/signin">Sign Up</Nav.Link>
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
          <h1 id="about" className={styles.title}><span className={styles.titleBrand}>UCHI</span></h1>
          <p className={styles.info}>First-time homeownership is abundant in resources on purchasing a
          home, but resources about caring for one’s home lack in comparison.
          Additionally, these resources lack organization and information applicable to
          individual needs. As a result, two-thirds of first-time American homeowners
          ignore home maintenance until parts of their home begin to malfunction,
          leading to unexpected expenses. To mitigate homebuyer’s regret caused by
          being unprepared for home maintenance, UCHI organizes maintenance tasks
          relevant to each home. With UCHI’s recommendations and reminders to stay
          up-to-date with home maintenance tasks, first-time homeowners are able to
          protect their investments and better care for their homes.
          </p>
          <hr className={styles.hr} />
          <h1>Behind the name</h1>
          <p><span className="brand">UCHI</span> is named after a word from the Japanese language,
          meaning &quot;one&apos;s home.&quot;
          </p>
          <p>The Japanese language uses the words うち <em>(uchi)</em> and いえ <em>(ie)</em> to refer to
          a &quot;home&quot; and a &quot;house,&quot; respectively. Similar to the connotation in English, うち <em>(uchi)</em> refers
          to a place where someone lives, whereas いえ <em>(ie)</em> refers to the actual building where someone lives.
          Additionally, the word うち <em>(uchi)</em> can also refer to the people living in the home themselves.
          </p>
          <p>In Japanese, both うち <em>(uchi)</em> and いえ <em>(ie)</em> are can also be written using
          the same <em>kanji</em> character: 家, which further ties the two meanings together.
          </p>
        </div>
        <div className={styles.backtomain}>
          <Link href="/">
            <a><img src="/icons/carrotbtn_left_line.svg" alt="Back to main" />Back to Main</a>
          </Link>
        </div>
        <div className={styles.visualContainer}>
          <div className={styles.visualMint80}>
            <h1 className="noMB">Try <span className="brand">UCHI</span> today!</h1>
          </div>
          <Link href="/signin"><a>
            <div className={styles.visualOrange60}>
              <h2 className={styles.signup}>Sign Up</h2>
              <img src="/icons/arrowcircle_right_line_dark.svg" alt="Sign Up Today" />
            </div>
          </a></Link>
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
