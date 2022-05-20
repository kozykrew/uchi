import { useContext, useState, useEffect } from 'react'
import AppContext from '../AppContext.js'
import Head from 'next/head'
import Layout from '../components/layout.js'
import {PageHeader} from '../components/headers.js'
import {Space} from '../components/space.js'
import { supabase } from '../utils/supabaseClient'


import SignIn from './signin.js'

const kitchenHfs = [{featureName:"Dishwasher"},
            {featureName:"Garbage Disposal"},
            {featureName:"Range"}];

const exteriorHfs = [{name:"Windows"}];

export default function HomeFeatures() {
  const user = supabase.auth.user();
  const contextValue = useContext(AppContext);
  const [exterior, setExterior] = useState([]);
  const [kitchen, setKitchen] = useState([]);
  const [bathroom, setBathroom] = useState([]);
  const [outdoors, setOutdoors] = useState([]);
  const [surfaces, setSurfaces] = useState([]);
  const [systems, setSystems] = useState([]);
  const [utility, setUtility] = useState([]);

  useEffect(() => {
    getExterior()
  }, [])
  async function getExterior() {
    let {data: exterior, error} = await supabase
      .from('UserHome')
      .select(`featureName`)
      .eq('userID', user.id)
      .eq('tag3', 'Exterior')
    if (error) console.log('error', error)
    else {
      setExterior(exterior)
    }   
  } 

  useEffect(() => {
    getKitchen()
  }, [])
  async function getKitchen() {
    let {data: kitchen, error} = await supabase
      .from('UserHome')
      .select(`featureName`)
      .eq('userID', user.id)
      .eq('tag3', 'Kitchen')
    if (error) console.log('error', error)
    else {
      setKitchen(kitchen)
    }   
  }

  useEffect(() => {
    getBathroom()
  }, [])
  async function getBathroom() {
    let {data: bathroom, error} = await supabase
      .from('UserHome')
      .select(`featureName`)
      .eq('userID', user.id)
      .eq('tag3', 'Bathroom')
    if (error) console.log('error', error)
    else {
      setBathroom(bathroom)
    }   
  }

  useEffect(() => {
    getOutdoors()
  }, [])
  async function getOutdoors() {
    let {data: outdoors, error} = await supabase
      .from('UserHome')
      .select(`featureName`)
      .eq('userID', user.id)
      .eq('tag3', 'Outdoors')
    if (error) console.log('error', error)
    else {
      setOutdoors(outdoors)
    }   
  }

  useEffect(() => {
    getSurfaces()
  }, [])
  async function getSurfaces() {
    let {data: surfaces, error} = await supabase
      .from('UserHome')
      .select(`featureName`)
      .eq('userID', user.id)
      .eq('tag3', 'Surfaces')
    if (error) console.log('error', error)
    else {
      setSurfaces(surfaces)
    }   
  }

  useEffect(() => {
    getSystems()
  }, [])
  async function getSystems() {
    let {data: systems, error} = await supabase
      .from('UserHome')
      .select(`featureName`)
      .eq('userID', user.id)
      .eq('tag3', 'Systems')
    if (error) console.log('error', error)
    else {
      setSystems(systems)
    }   
  }

  useEffect(() => {
    getUtility()
  }, [])
  async function getUtility() {
    let {data: utility, error} = await supabase
      .from('UserHome')
      .select(`featureName`)
      .eq('userID', user.id)
      .eq('tag3', 'Utility')
    if (error) console.log('error', error)
    else {
      setUtility(utility)
    }   
  }
  
   


  if (contextValue.state.loggedIn) {
    
    return (
      <div>
        <Head>
          <title>UCHI | Home Features</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Layout>
          <div className="pageContent">
            <PageHeader page={"homefeatures"} headertext={"Home Features"} />
            <Space name={"Exterior"} hfs={exterior} />
            <Space name={"Kitchen"} hfs={kitchen} />
            <Space name={"Bathroom"} hfs={bathroom} />
            <Space name={"Outdoors"} hfs={outdoors} />
            <Space name={"Surfaces"} hfs={surfaces} />
            <Space name={"Systems"} hfs={systems} />
            <Space name={"Utility"} hfs={utility} />
            {/* <Space name={"Miscellaneous"} hfs={[]} /> */}
          </div>
        </Layout> 
      </div>
    )
  } else {
    return (<SignIn/>)
  }
}
