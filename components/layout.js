import {UchiNavbar} from './UchiNavbar.js'

export default function Layout({ children }) {
  return (
    <div>
      <UchiNavbar />
      {children}
    </div>
  )
}
