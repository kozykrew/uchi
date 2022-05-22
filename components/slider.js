// https://www.npmjs.com/package/react-bootstrap-range-slider

import React, { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import { supabase } from '../utils/supabaseClient'
import styles from './slider.module.css'

// PROPS
// max: integer - maximum age of home feature (average lifespan * 2)
export function Slider(props) {
  const [ value, setValue ] = useState(0);
  const user = supabase.auth.user()
  async function updateAge(ageHf) {
    const updates = {
      age: ageHf,
    }
    let { data } = await supabase.from('UserHome').update(updates).eq('userID', user.id).eq('featureName', props.name)
}

  return (
    <>
      <h3 className={styles.value}>{value} years</h3>
      <RangeSlider className={styles.slider}
        value={value}
        onChange={changeEvent => {
          setValue(changeEvent.target.value)
          updateAge(changeEvent.target.value)
        }}
        max={props.max}
        size="lg"
        tooltip="off"
      />
      <div className={styles.labels}>
        <p className="smallHeader textDark">Brand New</p>
        <p className="smallHeader textDark">Outdated</p>
      </div>
    </>
  );
}
