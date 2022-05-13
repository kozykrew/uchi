import {useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout, {AddHFFooter} from '../../components/layout.js'
import {AddHFHeader} from '../../components/headers.js'
import {MainDetailsTable} from '../../components/mainDetailsTable.js'

import styles from '../../components/details.module.css'
import addingStyles from '../../components/addingHomeFeature.module.css'
import btnStyles from '../../components/button.module.css'

const addHF = "Roof";
const addHFiconpath = "/icons/hf_" + addHF.toLowerCase() + "_lg.svg";

const additionalRefrigerator = [{header:"Has built-in ice maker?", data:"yes"}]
const additionalRoof = [];

export default function Confirmation() {
  const router = useRouter();

  // brand select state
  const [selectedBrand, setSelectedBrand] = useState(null);

  const handleSelect = (e) => setSelectedBrand(e.target.value);

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

  var brandsRoof2 = (
    <Form className={addingStyles.form}>
      <Dropdown
        onSelect={eventKey => {
          const { code, brand } = roofBrands.find(({ code }) => eventKey === code);

          setSelectedRoofBrand(eventKey);
          setToggleContents(<>{brand}</>);
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

  var modelNumber = (
    <div className={addingStyles.addInfoContainer}>
      <Form.Label className="selectLabel">Model #</Form.Label>
      <Form.Control className={addingStyles.form} type="text" placeholder="Enter model #" />
    </div>
  )
  if (addHF == "Roof") {
    modelNumber = "";
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
              <AddHFHeader name={addHF} iconpath={addHFiconpath} />
            </div>
          </div>
          <div className="pageContent">
            <div className={styles.detailsContainerDesktop}>
              <img className="btn-back" src="../icons/carrotbtn_left_line.svg" alt="Back" onClick={() => router.back()} />
              <div className={styles.addHFHeaderDesktop}>
                <img className={styles.addHFHeaderDesktopIcon} src={addHFiconpath} alt={addHF} />
                <h1>Add a {addHF}</h1>
              </div>
            </div>
            <div className={addingStyles.prompt}>
              <h2 className="textDark"><span className="brand">UCHI</span> is almost ready to create your custom Maintenance Guide.</h2>
            </div>
            <div className={addingStyles.confirmationContainerDesktop}>
              <p className="smallHeader textDark">Here&apos;s what you&apos;ve shared with <span className="brand">UCHI</span> so far:</p>
              <div className={addingStyles.confirmationContainer}>
                <MainDetailsTable type="confirmation" additional={additionalRoof} />
              </div>
              <Form>
                <p className="smallHeader textDark">Tell <span className="brand">UCHI</span> additional information (optional):</p>
                <div className={addingStyles.addInfoContainer}>
                  <Form.Label className="selectLabel">Brand</Form.Label>
                  {brandsRoof2}
                </div>
                {modelNumber}
              </Form>
            </div>
            <div className="addhfprocessbtn-container">
              <Button className={btnStyles.cancelDesktop} onClick={() => router.push("/homefeatures")}>
                <span className="iconFirst">
                  <img src="../icons/close_line_dark.svg" alt="Cancel" />
                </span>
                Cancel
              </Button>
              <Button className={btnStyles.addDesktop} onClick={() => router.push("/homefeaturedetails")}>
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
