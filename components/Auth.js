import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import Button from 'react-bootstrap/Button'

import styles from './button.module.css'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <p>Enter your email and receive a magic link to sign into <span className="brand">UCHI</span>.</p>
      <form>
        <div className="form-group">
          <label for="email" className="sr-only">Email</label>
          <input
            id="email"
            className="form-control"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button
          variant="light"
          onClick={(e) => {
            e.preventDefault()
            handleLogin(email)
          }}
          className={styles.signin}
          disabled={loading}
        >
          {loading ? 'Loading' : 'Send magic link'}
        </Button>
      </form>
    </div>
  )
}
