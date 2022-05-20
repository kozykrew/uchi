import Table from 'react-bootstrap/Table'
import { useState, useContext, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import styles from './details.module.css'

// PROPS
// type: string - task, hf, or confirmation
    // TASK props
    // space: string - corresponding space of task
    // difficulty: string - task difficulty
    // time: string - task time commitment
    // frequency: string - task frequency
// additional: array of objects of any additional information for a home feature
export function MainDetailsTable(props) {
  const user = supabase.auth.user();
  const handleSelect = (e) => setSelectedBrand(e.target.value);
  const [feature, setFeature] = useState([])
  const [featureType, setFeatureType] = useState('')
  const [featureAge, setFeatureAge] = useState('')
  const [featureBrand, setFeatureBrand] = useState('')
  const [featureModel, setFeatureModel] = useState('')

  

  if (props.type == "task") {
    return (
      <Table>
        <tr>
          <th>Space</th>
          <td>{props.space}</td>
        </tr>
        <tr>
          <th>Difficulty</th>
          <td>{props.difficulty}</td>
        </tr>
        <tr>
          <th>Time Commitment</th>
          <td>{props.time}</td>
        </tr>
        <tr>
          <th>Frequency</th>
          <td>{props.frequency}</td>
        </tr>
      </Table>
    )
  } else if (props.type == "hf") {
    var additional = [];
    // var additionalTable = [];
    if (props.additional.length > 0) {
      additional = determineAdditional(props.additional);

    //   additionalTable = props.additional.map((add => (
    //     <tr>
    //       <th>{add.header}</th>
    //       <td>{add.data}</td>
    //     </tr>
    //   )));
    //   additional = [
    //     <hr className={styles.hr} />,
    //     <Table>
    //       {additionalTable}
    //     </Table>
    //   ];
    }

    useEffect(() => {
      fetchFeature()
    }, []);

  const fetchFeature = async () => {
    let { data: feature, error } = await supabase.from('UserHome').select(`
    *`)
    .eq('userID', user.id)
    .eq('featureName', props.hf)
    if (error) console.log('error', error)
    else {
      setFeature(feature)
      setFeatureType(feature[0].featureType)
      setFeatureAge(feature[0].age)
      setFeatureBrand(feature[0].brand)
      setFeatureModel(feature[0].modelNo)
    }
  }
    
    // model number is not available for every home feature
    var modelNumber = (
      <tr>
        <th>Model #</th>
        <td>ABCDEFG123456</td>
      </tr>
    );
    if (props.hf == "roof") {
      modelNumber = "";
    }

    return (
      <div>
        <Table>
          <tr>
            <th>Type</th>
            <td>{featureType}</td>
          </tr>
          <tr>
            <th>Brand</th>
            <td>{featureBrand}</td>
          </tr>
          <tr>
            <th>Model #</th>
            <td>{featureModel}</td>
          </tr>
          <tr>
            <th>Age</th>
            <td>{featureAge}</td>
          </tr>
        </Table>
        {additional}
      </div>
    )
  } else if (props.type == "confirmation") {
    var additional = [];
    if (props.additional.length > 0) {
      additional = determineAdditional(props.additional);
    }

    useEffect(() => {
      fetchFeature()
  }, []);

  const fetchFeature = async () => {
    let { data: feature, error } = await supabase.from('UserHome').select(`
    *`)
    .eq('userID', user.id)
    .eq('featureName', props.hf)
    if (error) console.log('error', error)
    else {
      setFeature(feature)
      setFeatureType(feature[0].featureType)
      setFeatureAge(feature[0].age)
      setFeatureBrand(feature[0].brand)
      setFeatureModel(feature[0].modelNo)
    }
  }
  
    return (
      <div>
        <Table>
          <tr>
            <th>Type</th>
            <td>{featureType}</td>
          </tr>
          <tr>
            <th>Age</th>
            <td>{featureAge}</td>
          </tr>
        </Table>
        {additional}
      </div>
    )
  }
}

function determineAdditional(add) {
  var additional = [];
  var additionalTable = [];
  if (add != []) {
    additionalTable = add.map((add, i) => (
      <tr key={i}>
        <th>{add.header}</th>
        <td>{add.data}</td>
      </tr>
    ));
    additional = [
      <hr key={0} className={styles.hr} />,
      <Table key={1}>
        {additionalTable}
      </Table>
    ];
    return additional;
  }
}
