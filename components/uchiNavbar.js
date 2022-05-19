import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

import Link from 'next/link'
import { useRouter } from "next/router";

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import styles from './uchiNavbar.module.css'

export function UchiNavbar() {
  const router = useRouter();
  // <Nav className="me-auto">
  //   <Nav.Link href="#features">Dashboard</Nav.Link>
  //   <Nav.Link href="#pricing">Home Features</Nav.Link>
  //   <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
  //     <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
  //     <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
  //     <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
  //     <NavDropdown.Divider />
  //     <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
  //   </NavDropdown>
  // </Nav>
  return (
    <div className={styles.topbar}>
      <Navbar collapseOnSelect expand="lg" bg="#FFF8E6" variant="light">
        <Container>
        <Navbar.Brand className={styles.brand} href="/dashboard">UCHI</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <ul>
              <li className={router.pathname == "/dashboard" ? "active" : ""}><Link href="/dashboard"><a>Dashboard</a></Link></li>
              <li className={router.pathname == "/homefeatures" ? "active" : ""}><Link href="/homefeatures"><a>Home Features</a></Link></li>
              <li className={router.pathname == "/tasks" ? "active" : ""}><Link href="/tasks"><a>Tasks</a></Link></li>
              <li className={router.pathname == "/profile" ? "active" : ""}><Link href="/profile"><a>Profile</a></Link></li>
              <li className={router.pathname == "/about" ? "active" : ""}><Link href="/about"><a>About <span className="brand">UCHI</span></a></Link></li>
            </ul>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export function UchiSideNavbar({session}) {
  const user = supabase.auth.user()
  const [username, setUsername] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {

      let { data} = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()
      setUsername(data.username);
  }

  const router = useRouter();

  return (
    <div className={styles.sidebar}>
      <div>
        <Link href="/dashboard"><a className={styles.brand}>UCHI</a></Link>
        <ul>
          <li className={router.pathname == "/dashboard" ? "active" : ""}>
            <Link href="/dashboard"><a>Dashboard</a></Link>
          </li>
          <li className={router.pathname == "/homefeatures" ? "active" : ""}>
            <Link href="/homefeatures"><a>Home Features</a></Link>
          </li>
          <li className={router.pathname == "/tasks" ? "active" : ""}>
            <Link href="/tasks"><a>Tasks</a></Link>
          </li>
        </ul>
      </div>
      <div className={styles.profileBtnContainer}>
        <Dropdown as={ButtonGroup}>
          <Button variant="light" onClick={() => router.push('/profile')}>
            <img className={styles.profileBtnImg} src="/profile.png" alt="Profile Image" />
            {username}
          </Button>

          <Dropdown.Toggle variant="light" split id="dropdown-split-basic" />

          <Dropdown.Menu>
            <Dropdown.Item href="/about">About <span className="brand">UCHI</span></Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="/" onClick={() => supabase.auth.signOut()}><img src="/icons/signout_dark.svg" alt="Sign out" />Sign Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  )
}
