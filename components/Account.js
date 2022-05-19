import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Button from 'react-bootstrap/Button'
import {ProfileHeader} from '../components/headers.js'
import {ProfileCard} from '../components/profileCard.js'

import styles from './button.module.css'

export default function Account({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const router = useRouter();

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
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
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="form-control"
            type="email"
            placeholder="Enter your email"
            value={session.user.email}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Name</label>
          <input
            id="username"
            className="form-control"
            type="text"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <Button
          variant="light"
          className={styles.signin}
          onClick={() => updateProfile({ username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </Button>
      </form>
      <Button
        variant="light"
        className={styles.signin}
        onClick={() => router.push('/dashboard')}
        disabled={loading}
      >
        {loading ? 'Loading ...' : 'Dashboard'}
      </Button>
      <Button
        variant="light"
        className={styles.signout}
        onClick={() => supabase.auth.signOut()}>
        <img src="/icons/signout_dark.svg" alt="Sign out" />
        Sign Out
      </Button>
    </div>
  )
}
