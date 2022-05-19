import { useContext } from 'react'
import AppContext from '../AppContext.js'
import Head from 'next/head'
import Layout from '../components/layout.js'
import {PageHeader} from '../components/headers.js'
import {Space} from '../components/space.js'

import SignIn from './signin.js'

const kitchenHfs = [{name:"Dishwasher"},
            {name:"Garbage Disposal"},
            {name:"Range"}];

const exteriorHfs = [{name:"Windows"}];

export default function HomeFeatures() {
  const contextValue = useContext(AppContext);

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
            <Space name={"Exterior"} hfs={exteriorHfs} />
            <Space name={"Kitchen"} hfs={kitchenHfs} />
            <Space name={"Bathroom"} hfs={[]} />
            <Space name={"Outdoors"} hfs={[]} />
            <Space name={"Surfaces"} hfs={[]} />
            <Space name={"Systems"} hfs={[]} />
            <Space name={"Utility"} hfs={[]} />
            <Space name={"Miscellaneous"} hfs={[]} />
          </div>
        </Layout>
      </div>
    )
  } else {
    return (<SignIn/>)
  }
}
