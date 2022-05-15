import 'bootstrap/dist/css/bootstrap.css'
// import '../styles/design_tokens.css'
import '../styles/globals.css'
import { supabase } from '../utils/supabaseClient'

import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.js");
  }, []);

  return <Component {...pageProps} />
}

export default MyApp
