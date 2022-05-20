import { useState, useContext, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import AppContext from '../AppContext.js'
import { useRouter } from 'next/router'
import Button from 'react-bootstrap/Button'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import styles from './button.module.css'

export default function Auth() {
  const contextValue = useContext(AppContext);

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter();

  const handleLogin = async (type, email, password) => {
    try {
      setLoading(true)
      const { error, user } =
        type === 'LOGIN'
          ? await supabase.auth.signIn({ email, password })
          : await supabase.auth.signUp({ email, password })
      contextValue.setLoggedIn(true)
      if (!error && !user) alert('Check your email for the login link!')
      if (error) alert(error.message)
      else if (type == "LOGIN") {
        router.push('/dashboard')
      } else if (type == "SIGNUP") {
        router.push('/onboarding')
      }
    } catch (error) {
      console.log('Error thrown:', error.message)
      alert(error.error_description || error)
    } finally {
      setLoading(false)
    }
  }

  const [key, setKey] = useState('signup');

  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} variant="pills">
        <Tab eventKey="signup" title="Sign Up">
          <form>
            <div className="form-group">
              <label htmlFor="username">Name</label>
              <input
                id="username"
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={username || ''}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className="form-control"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              variant="light"
              onClick={(e) => {
                e.preventDefault()
                handleLogin('SIGNUP', email, password)
                contextValue.setUsername(username)
              }}
              className={styles.signin}
              disabled={loading}
            >
              {loading ? 'Loading' : 'Sign Up'}
            </Button>
            <p className="text-center mt-3">Already have an account? <span className="signLink" onClick={() => setKey('signin')}>Sign In</span></p>
          </form>
        </Tab>
        <Tab eventKey="signin" title="Sign In">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="form-control"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            variant="light"
            onClick={(e) => {
              e.preventDefault()
              handleLogin('LOGIN', email, password)
            }}
            className={styles.signin}
            disabled={loading}
          >
            {loading ? 'Loading' : 'Sign In'}
          </Button>
          <p className="text-center mt-3">Don&apos;t have an account? <span className="signLink" onClick={() => setKey('signup')}>Sign Up</span></p>
        </Tab>
      </Tabs>
    </div>
  )
}

// export default function Auth({}) {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const handleLogin = async (type, email, password) => {
//     try {
//       const { error, user } =
//         type === 'LOGIN'
//           ? await supabase.auth.signIn({ email, password })
//           : await supabase.auth.signUp({ email, password })
//       if (!error && !user) alert('Check your email for the login link!')
//       if (error) console.log('Error returned:', error.message)
//     } catch (error) {
//       console.log('Error thrown:', error.message)
//       alert(error.error_description || error)
//     }
//   }

//   async function forgotPassword(e) {
//     e.preventDefault()
//     var email = prompt('Please enter your email:')
//     if (email === null || email === '') {
//       window.alert('You must enter your email.')
//     } else {
//       let { error } = await supabase.auth.api.resetPasswordForEmail(email)
//       if (error) {
//         console.log('Error: ', error.message)
//       } else {
//         alert('Password recovery email has been sent.')
//       }
//     }
//   }

//   return (
//     <div className="w-full sm:w-1/2 xl:w-1/3">
//       <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg bg-white">
//         <div className="mb-4">
//           <label className="font-bold text-grey-darker block mb-2">Email</label>
//           <input
//             type="text"
//             className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
//             placeholder="Your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="font-bold text-grey-darker block mb-2">Password</label>
//           <input
//             type="password"
//             className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
//             placeholder="Your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         <div className="flex flex-col gap-2">
//           <a
//             onClick={(e) => {
//               e.preventDefault()
//               handleLogin('SIGNUP', email, password)
//             }}
//             href={'/channels'}
//             className="btn-black"
//           >
//             Sign up
//           </a>
//           <a
//             onClick={(e) => {
//               e.preventDefault()
//               handleLogin('LOGIN', email, password)
//             }}
//             href={'/channels'}
//             className="btn-black-outline"
//           >
//             {password.length ? 'Sign in' : 'Send magic link'}
//           </a>
//         </div>

//         <div className="mt-2 text-sm leading-5">
//           {/* eslint-disable-next-line */}
//           <a
//             onClick={forgotPassword}
//             href="/"
//             className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
//           >
//             Forgot your password?
//           </a>
//         </div>

//         <div className="mt-4">
//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300"></div>
//             </div>
//             <div className="relative flex justify-center text-sm leading-5">
//               <span className="px-2 bg-white text-gray-500">Or continue with</span>
//             </div>
//           </div>

//           <div className="mt-6">
//             <div className="mt-6">
//               <span className="block w-full rounded-md shadow-sm">
//                 <button
//                   onClick={() => handleOAuthLogin('github')}
//                   type="button"
//                   className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
//                 >
//                   GitHub
//                 </button>
//               </span>
//             </div>
//             <div className="mt-6">
//               <span className="block w-full rounded-md shadow-sm">
//                 <button
//                   onClick={() => handleOAuthLogin('google')}
//                   type="button"
//                   className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
//                 >
//                   Google
//                 </button>
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
