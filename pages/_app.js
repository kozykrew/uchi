import 'bootstrap/dist/css/bootstrap.css'
// import '../styles/design_tokens.css'
import '../styles/globals.css'

import AppContext from "../AppContext.js"

import { useEffect, useState } from 'react'
import Router from 'next/router'

// page loader reference: https://levelup.gitconnected.com/improve-ux-of-your-next-js-app-in-3-minutes-with-page-loading-indicator-3a422113304d
import NProgress from 'nprogress' //nprogress module
import 'nprogress/nprogress.css' //styles of nprogress

//Binding events
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

let spaceObject = {
  Bathroom: ["Showerhead", "Toilet"],
  Exterior: ["Gutters", "Roof", "Windows"],
  Kitchen: ["Dishwasher", "Garbage Disposal", "Range", "Range Hood", "Refrigerator"],
  Outdoors: ["Driveway", "Fence", "Lawn"],
  Surfaces: ["Carpet Flooring", "Hardwood Flooring"],
  Systems: ["Fireplace", "Smoke Detectors", "Ventilation"],
  Utility: ["Dryer", "Washer", "Water Heater"],
  Miscellaneous: ["Attic", "Basement"]
}

// if all tasks are saved here,
//    can use taskObject as a map to access their details
//    via value.state.task in AppContext

let taskObject = {
  0:{
      name:"Wash roof",
      space:"Exterior",
      difficulty:"Moderate",
      time:"3-7 hours",
      frequency:"Annually",
      desc:"Roofs are exposed to all kinds of elements and moisture. If not routinely cleaned, algae spores and moss buildup can occur. Moss can push up on shingles causing them to blow off which can result in leaks.",
      uchirec:"DIY this task because it is more cost-efficient.",
      tools:["Bleach", "Garden hose", "Garden sprayer", "Ladder", "Plastic tarp"],
      steps:[[{title:"Protect your landscape", description:"Place a plastic tarp below your roof to protect your lanscape from the bleach solution."},
                      {title:"Create cleaning solution", description:"Fill a garden sprayer with a 50% water and 50% bleach solution."},
                      {title:"Set up ladder", description:"Set your ladder against a sturdy surface (do not lean it against the gutters!)."},
                      {title:"Spray solution", description:"Spray the bleach solution over all the shingles of your roof."},
                      {title:"Wait 20 minutes", description:"Let the solution sit on your roof for 15-20 minutes."},
                      {title:"Rinse roof", description:"Rinse your roof thoroughly with a garden hose (do NOT use a power washer! Power washers can loosen your shingles and cause leaks)."}],
                    [{title:"Interview contractors", description:"Ask key questions to determine their reliability."}]]
  },
  1: {
      name:"Clean gutters",
      space:"Exterior",
      difficulty:"Simple",
      time:"2 hours",
      frequency:"Annually",
      desc:"When gutters fill with leaves, sticks, and other debris, it causes clogs that can result in water creeping into the roof or even into the foundation of the house.",
      uchirec:"DIY this task because it is more cost-efficient.",
      tools:["Bucket", "Garden hose", "Ladder", "Trowel"],
      steps:[[{title:"Set up ladder", description:"Set your ladder against a sturdy surface (do not lean it against the gutters!)."},
                      {title:"Remove gunk", description:"Use your trowel or scooping tool to remove gunk from gutters."},
                      {title:"Collect gunk", description:"Fill a bucket with the gutter gunk or spread a tarp underneath your workspace to collect the gunk."},
                      {title:"Flush the gutters", description:"Use a garden hose to flush out the gutters and clear out any remaining debris."}],
                    [{title:"Interview contractors", description:"Ask key questions to determine their reliability."}]]
  },
  2: {
      name:"Clean gutters 2",
      space:"Haha",
      difficulty:"Simple",
      time:"2 Haha",
      frequency:"Haha",
      desc:"Haha gutters fill with leaves, sticks, and other debris, it causes clogs that can result in water creeping into the roof or even into the foundation of the house.",
      uchirec:"Haha this task because it is more cost-efficient.",
      tools:["Haha", "Garden hose", "Ladder", "Trowel"],
      steps:[[{title:"Haha up ladder", description:"Set your ladder against a sturdy surface (do not lean it against the gutters!)."},
                      {title:"Haha gunk", description:"Use your trowel or scooping tool to remove gunk from gutters."},
                      {title:"Haha gunk", description:"Fill a bucket with the gutter gunk or spread a tarp underneath your workspace to collect the gunk."},
                      {title:"Haha the gutters", description:"Use a garden hose to flush out the gutters and clear out any remaining debris."}],
                    [{title:"Haha contractors", description:"Ask key questions to determine their reliability."}]]
  },
}

function UchiApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.js");
  }, []);

  const [spaceName, setSpaceName] = useState("Bathroom");
  const [viewingTaskID, setViewingTaskID] = useState(1);

  return (
    <AppContext.Provider
      value = { {
        state: {
          space: spaceName,
          hfs: spaceObject[spaceName],
          task: taskObject[viewingTaskID]
        },
        setSpaceName: setSpaceName,
        setViewingTaskID: setViewingTaskID
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default UchiApp
