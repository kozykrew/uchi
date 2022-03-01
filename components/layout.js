import {UchiNavbar} from './navbar.js'

export default function Layout({ children }) {
  return (
    <div>
      <UchiNavbar />
      {children}
    </div>
  )
}
