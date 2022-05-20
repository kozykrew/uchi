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

export default function Landing() {
  const router = useRouter();

  var navbar = (
    <Navbar id="landing-nav" bg="#FFF8E6" expand="lg">
      <Container>
        <Navbar.Brand className={navStyles.brand} href="#">UCHI</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#demo">Demo</Nav.Link>
            <Nav.Link href="#team">Team</Nav.Link>
            <Nav.Link href="#status">Status</Nav.Link>
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
        <h2 id="features" className={styles.heading}><span className={styles.headingText}>Key Features</span></h2>
        <div className={styles.keyFeaturesContainer}>
          <KeyFeature name="Education" desc="Provide guidance for home maintenance tasks." img="/images/key-features/education.png" />
          <KeyFeature name="Task Tracker" desc="Track and organize maintenance tasks." img="/images/key-features/task-tracker.png" />
          <KeyFeature name="Customizability" desc="Personalize a one-stop home maintenance experience." img="/images/key-features/customizability.png" />
        </div>
        <h2 id="demo" className={styles.heading}><span className={styles.headingText}>Demonstration Video</span></h2>
        <iframe className={styles.demo} width="894" height="783" src="https://youtu.be/eOnztFnFFAg" title="UCHI Demonstration" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <h2 id="team" className={styles.heading}><span className={styles.headingText}>Team KozyKrew</span></h2>
        <div className={styles.profilesContainer}>
          <TeamProfile name="Ariane Apigo" roles="UX Designer, Front-end Developer" img="/images/team/ariane.png" linkedin="https://www.linkedin.com/in/ariane-apigo/" />
          <TeamProfile name="Rachel Chung" roles="UX Designer, Researcher" img="/images/team/rachel.png" linkedin="https://www.linkedin.com/in/rclrachelchung/" />
          <TeamProfile name="John-Luke Dokupil" roles="Data Scientist, Researcher" img="/images/team/johnluke.png" linkedin="https://www.linkedin.com/in/jldokupil/" />
          <TeamProfile name="Ratul Jain" roles="Data Scientist, Back-end Developer" img="/images/team/ratul.png" linkedin="https://www.linkedin.com/in/ratul-jain-9ab1762b/" />
        </div>
        <h2 id="status" className={styles.heading}><span className={styles.headingText}>Project Status</span></h2>
        <p className={styles.info}>UCHI started as a student-driven Capstone project
         for the Information School at the University of Washington, Winter/Spring 2022.
         As of May 25, 2022, UCHI will transition to be an <span className={styles.bodybold}>open source project</span> for future
         iSchool Capstone teams to further develop.
        </p>
        <div className="text-center"><a className={styles.githubLink} href="https://github.com/ari-apigo/uchi" target="_blank" rel="noreferrer">UCHI on GitHub<img className={styles.github} src="/icons/github_dark.svg" alt={"UCHI on GitHub"} /></a></div>
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
  // MVP below
  // return (
  //   <div className={styles.container}>
  //     <Head>
  //       <title>UCHI</title>
  //       <meta name="description" content="Generated by create next app" />
  //       <link rel="icon" href="/favicon.ico" />
  //     </Head>
  //
  //     <main className={styles.main}>
  //       <h1 className={styles.title}>
  //         Welcome to <span className="brand">UCHI</span>!
  //       </h1>
  //
  //       <p className={styles.description}>
  //         View our MVP at {' '}
  //         <code className={styles.code}><Link href="/dashboard">pages/dashboard.js</Link></code>
  //       </p>
  //
  //       <p>We currently have only developed a mobile version of <span className="brand">UCHI</span>.</p>
  //       <p>Please resize your window to a width of 375 pixels to view <span className="brand">UCHI</span> properly.</p>
  //
  //     </main>
  //
  //     <footer className={styles.footer}>
  //       <a
  //         href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Powered by{' '}
  //         <span className={styles.logo}>
  //           <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
  //         </span>
  //       </a>
  //     </footer>
  //   </div>
  // )
}

function KeyFeature(props) {
  var id = props.name.replace(/\s+/g, '').toLowerCase()

  return (
    <div id={id} className={styles.keyFeatureContainer}>
      <div className={styles.bubbleContainer}>
        <div className={styles.keyFeatureBubble}>
          <div>
            <img className={styles.keyFeatureImg} src={props.img} alt={props.name} />
          </div>
        </div>
      </div>
      <div className={styles.keyFeatureText}>
        <h3>{props.name}</h3>
        <p>{props.desc}</p>
      </div>
    </div>
  )
}

function TeamProfile(props) {
  return (
    <div className={styles.profileContainer}>
      <img className={styles.memberProfileImg} src={props.img} alt={props.name} />
      <div className={styles.profileDetailsContainer}>
        <h3>{props.name}</h3>
        <p>{props.roles}</p>
        <a href={props.linkedin}>
          <img className={styles.linkedIn} src="/icons/linkedin_dark.svg" alt={props.name + "&#39;s LinkedIn Profile"} />
        </a>
      </div>
    </div>

  )
}



// export default function Home() {
//   const [session, setSession] = useState(null)

//   useEffect(() => {
//     setSession(supabase.auth.session())

//     supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session)
//     })
//   }, [])

//   return (
//     <div className="container" style={{ padding: '50px 0 100px 0' }}>
//       {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
//     </div>
//   )
// }

// ---------- some resources that came with default next.js app ----------
// <div className={styles.grid}>
//   <a href="https://nextjs.org/docs" className={styles.card}>
//     <h2>Documentation &rarr;</h2>
//     <p>Find in-depth information about Next.js features and API.</p>
//   </a>
//
//   <a href="https://nextjs.org/learn" className={styles.card}>
//     <h2>Learn &rarr;</h2>
//     <p>Learn about Next.js in an interactive course with quizzes!</p>
//   </a>
//
//   <a
//     href="https://github.com/vercel/next.js/tree/canary/examples"
//     className={styles.card}
//   >
//     <h2>Examples &rarr;</h2>
//     <p>Discover and deploy boilerplate example Next.js projects.</p>
//   </a>
//
//   <a
//     href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//     className={styles.card}
//   >
//     <h2>Deploy &rarr;</h2>
//     <p>
//       Instantly deploy your Next.js site to a public URL with Vercel.
//     </p>
//   </a>
// </div>
