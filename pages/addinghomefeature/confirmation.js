import {useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout, {AddHFFooter} from '../../components/layout.js'
import {AddHFHeader} from '../../components/headers.js'
import {MainDetailsTable} from '../../components/mainDetailsTable.js'
import { useContext, useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient'
import styles from '../../components/details.module.css'
import addingStyles from '../../components/addingHomeFeature.module.css'
import btnStyles from '../../components/button.module.css'

const additionalRefrigerator = [{header:"Has built-in ice maker?", data:"yes"}]
const additionalRoof = [];

export default function Confirmation() {
  const user = supabase.auth.user()
  const router = useRouter();
  const addHF = router.query.homeFeature;
  var displayHF;
  var addHFiconpath = "/icons/hf_"// + addHF.toLowerCase() + "_lg.svg";
  if (addHF !== undefined) {
    displayHF = addHF.charAt(0).toUpperCase() + addHF.slice(1);
    addHFiconpath = addHFiconpath + addHF.toLowerCase() + "_lg.svg";
  }
  // brand select state
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [feature, setFeature] = useState([])

  const handleSelect = (e) => setSelectedBrand(e.target.value);

  useEffect(() => {
    fetchFeature()
  }, [])
  const fetchFeature = async () => {
    let { data: feature, error } = await supabase.from('UserHome').select(`
    *`)
    .eq('userID', user.id)
    .eq('featureName', addHF)
    if (error) console.log('error', error)
    else {
      setFeature(feature)
      console.log(feature)
    }
  }

  var brandsRefrigerator = (
    <Form.Select className={addingStyles.form} aria-label="Select brand" onChange={handleSelect}>
      <option value={null}>Select a brand</option>
      <option value="bosch">Bosch</option>
      <option value="frigidaire">Frigidaire</option>
      <option value="ge-appliances">GE Appliances</option>
      <option value="insignia">Insignia</option>
      <option value="kitchenaid">KitchenAid</option>
      <option value="lg">LG</option>
      <option value="maytag">Maytag</option>
      <option value="samsung">Samsung</option>
      <option value="whirlpool">Whirlpool</option>
    </Form.Select>
  );

  var brandsRoof = (
    <Form.Select className={addingStyles.form} aria-label="Select brand" onChange={handleSelect}>
      <option value={null}>Select a brand</option>
      <option value="atlas">Atlas</option>
      <option value="brava">Brava</option>
      <option value="certainteed">Certainteed</option>
      <option value="gaf">GAF</option>
      <option value="iko">IKO</option>
      <option value="malarkey">Malarkey</option>
      <option value="owens-corning">Owens Corning</option>
      <option value="pabco">Pabco</option>
      <option value="tamko">Tamko</option>
    </Form.Select>
  )

  // new dropdown (captured by screen recorder)
  var brandsRoofList = ["Atlas", "Brava", "Certainteed", "GAF", "IKO", "Malarkey", "Owens Corning", "Pabco", "Tamko"];
  const brandsRoofOptions = brandsRoofList.map((brand) => {
    var obj = {
      code: brand.replace(/\s+/g, '').toLowerCase(),
      brand: brand
    };
    return obj;
  });

  const [roofBrands] = useState(brandsRoofOptions);
  const [toggleContents, setToggleContents] = useState("Select a Brand");
  const [selectedRoofBrand, setSelectedRoofBrand] = useState();

  async function updateBrand(brandHf) {
    const user = supabase.auth.user()
    const updates = {
      brand: brandHf,
    }
    let { data } = await supabase.from('UserHome').update(updates).eq('userID', user.id).eq('featureName', addHF)
  }

  async function updateModel(modelHf) {
    const user = supabase.auth.user()
    const updates = {
      modelNo: modelHf,
    }
    let { data } = await supabase.from('UserHome').update(updates).eq('userID', user.id).eq('featureName', addHF)
  }

  async function deleteHome() {
    const user = supabase.auth.user()
    let { data } = await supabase.from('UserHome').delete().eq('userID', user.id).eq('featureName', addHF)
  }

  var roof = (
    <Form className={addingStyles.form}>
      <Dropdown
        onSelect={eventKey => {
          const { code, brand } = roofBrands.find(({ code }) => eventKey === code);
          setSelectedBrand(eventKey);
          setToggleContents(<>{brand}</>);
          updateBrand(eventKey)
        }}
      >
        <Dropdown.Toggle variant="secondary" id="dropdown-brands">
          {toggleContents}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {roofBrands.map(({ code, brand }) => (
            <Dropdown.Item key={code} eventKey={code}>{brand}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Form>
  );

  var brandsRList = ["Bosch", "Frigidaire", "GE Appliances", "Insignia", "KitchenAid", "LG", "Maytag", "Samsung", "Whirlpool"];
  const brandsROptions = brandsRList.map((brand) => {
    var obj = {
      code: brand.replace(/\s+/g, '').toLowerCase(),
      brand: brand
    };
    return obj;
  });

  const [rBrands] = useState(brandsROptions);
  const [toggleRContents, setToggleRContents] = useState("Select a Brand");
  const [selectedRBrand, setSelectedRBrand] = useState();

  var refrigerator = (
    <Form className={addingStyles.form}>
      <Dropdown
        onSelect={eventKey => {
          const { code, brand } = rBrands.find(({ code }) => eventKey === code);
          setSelectedBrand(eventKey);
          setToggleRContents(<>{brand}</>);
          updateBrand(eventKey)
        }}
      >
        <Dropdown.Toggle variant="secondary" id="dropdown-brands">
          {toggleRContents}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {rBrands.map(({ code, brand }) => (
            <Dropdown.Item key={code} eventKey={code}>{brand}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Form>
  );

  var modelNumber = (
    <div className={addingStyles.addInfoContainer}>
      <Form.Label className="selectLabel">Model #</Form.Label>
      <Form.Control className={addingStyles.form} type="text" placeholder="Enter model #" onChange={(e) => {
                  updateModel(e.target.value)
                }}/>
    </div>
  )

  var finalHf = ''

  if (addHF == "roof") {
    finalHf = roof
    modelNumber = "";
  } else {
    finalHf = refrigerator
  }

  async function addTasks(featureName) {
    try {
      const user = supabase.auth.user()
      let {data: count} = await supabase.from('UserHome').select('featureID, id, tag3').eq('userID', user.id).eq('featureName', featureName)
      count.map(async (ftID) => {
        console.log(ftID)
        let {data: list} = await supabase.from('tasks').select('*').eq('homeFeatureID', ftID.featureID)
        list.map(async (task) => {
          const updates = {
            userHomeID: ftID.id,
            taskID: task.id,
            taskStatus: false,
            title: task.title,
            difficulty: task.difficulty,
            description: task.description,
            userID: user.id,
            time: task.time,
            tag3: ftID.tag3,
            f_description: task.f_description,
            tools: task.tools
          }
          let { error } = await supabase.from('UserTasks').upsert(updates, {
            returning: 'minimal', // Don't return the value after inserting
          })
          addSteps(task.id)
          if (error) {
            throw error
          }
        })
      })
    } catch (error) {
      alert(error.message)
    }
  }

  async function addSteps(taskID) {
    try {
      const user = supabase.auth.user()

      let {data: count} = await supabase.from('UserTasks').select('taskID, id, userID').eq('userID', user.id).eq('taskID', taskID)
      console.log(count)
      count.map(async (tID) => {
        let {data: list} = await supabase.from('steps').select('*').eq('taskID', tID.taskID).order('title')
        console.log(list)
        list.map(async(steps) => {
          const updates = {
            userTasksID: tID.id,
            taskID: taskID,
            stepsStatus: false,
            title: steps.title,
            description: steps.description,
            userID: user.id
          }
          let { error } = await supabase.from('UserSteps').upsert(updates, {
            returning: 'minimal', // Don't return the value after inserting
          })
          if (error) {
            throw error
          }
        })
      })
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className={styles.chocolate60bg}>
      <Head>
        <title>UCHI | Add a Home Feature</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className={styles.chocolate60bg}>
          <div className={styles.detailsContainer}>
            <div className="pageContent">
              <AddHFHeader name={displayHF} iconpath={addHFiconpath} />
            </div>
          </div>
          <div className="pageContent">
            <div className={styles.detailsContainerDesktop}>
              <img className="btn-back" src="../icons/carrotbtn_left_line.svg" alt="Back" onClick={() => router.back()} />
              <div className={styles.addHFHeaderDesktop}>
                <img className={styles.addHFHeaderDesktopIcon} src={addHFiconpath} alt={displayHF} />
                <h1>Add a {displayHF}</h1>
              </div>
            </div>
            <div className={addingStyles.prompt}>
              <h2 className="textDark"><span className="brand">UCHI</span> is almost ready to create your custom Maintenance Guide.</h2>
            </div>
            <div className={addingStyles.confirmationContainerDesktop}>
              <p className="smallHeader textDark">Here&apos;s what you&apos;ve shared with <span className="brand">UCHI</span> so far:</p>
              <div className={addingStyles.confirmationContainer}>
                <MainDetailsTable type="confirmation" additional={additionalRoof} hf = {addHF}/>
              </div>
              <Form>
                <p className="smallHeader textDark">Tell <span className="brand">UCHI</span> additional information (optional):</p>
                <div className={addingStyles.addInfoContainer}>
                  <Form.Label className="selectLabel">Brand</Form.Label>
                  {finalHf}
                </div>
                {modelNumber}
              </Form>
            </div>
            <div className="addhfprocessbtn-container">
              <Button className={btnStyles.cancelDesktop} onClick={() => {
                deleteHome()
                router.push("/homefeatures")
              }}>
                <span className="iconFirst">
                  <img src="../icons/close_line_dark.svg" alt="Cancel" />
                </span>
                Cancel
              </Button>
              <Button className={btnStyles.addDesktop} onClick={() => {
                addTasks(addHF)
                router.push({
                  pathname: '/homefeatures',
                  query: {homeFeatureName: addHF}
                })
              }}>
                <span className="iconFirst">
                  <img src="../icons/flag_line_dark.svg" alt="Finish" />
                </span>
                Finish
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.chocolate60filler}>
        </div>
        <AddHFFooter cancel="/homefeatures" finish="/homefeaturedetails" />
      </Layout>
    </div>
  )
}
