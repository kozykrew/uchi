import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Button from 'react-bootstrap/Button'

import styles from './button.module.css'

export default function Account({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

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
        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            className="form-control"
            type="website"
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
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
        className={styles.signout}
        onClick={() => supabase.auth.signOut()}>
        <img src="/icons/signout_dark.svg" alt="Sign out" />
        Sign Out
      </Button>
    </div>
  )
  // <div className="form-widget">
  //   <div>
  //     <label htmlFor="email">Email</label>
  //     <input id="email" type="text" value={session.user.email} disabled />
  //   </div>
  //   <div>
  //     <label htmlFor="username">Name</label>
  //     <input
  //       id="username"
  //       type="text"
  //       value={username || ''}
  //       onChange={(e) => setUsername(e.target.value)}
  //     />
  //   </div>
  //   <div>
  //     <label htmlFor="website">Website</label>
  //     <input
  //       id="website"
  //       type="website"
  //       value={website || ''}
  //       onChange={(e) => setWebsite(e.target.value)}
  //     />
  //   </div>
  //
  //   <div>
  //
  //     <button
  //       className="button block primary"
  //       onClick={() => updateProfile({ username, website, avatar_url })}
  //       disabled={loading}
  //     >
  //       {loading ? 'Loading ...' : 'Update'}
  //     </button>
  //   </div>
  //
  //   <div>
  //     <button className="button block" onClick={() => supabase.auth.signOut()}>
  //       Sign Out
  //     </button>
  //   </div>
  // </div>
}
