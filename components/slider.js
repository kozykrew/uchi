// https://www.npmjs.com/package/react-bootstrap-range-slider

import React, { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';

import styles from './slider.module.css'

// PROPS
// max: integer - maximum age of home feature (average lifespan * 2)
export function Slider(props) {
  const [ value, setValue ] = useState(0);

  return (
    <>
      <h3 className={styles.value}>{value} years</h3>
      <RangeSlider className={styles.slider}
        value={value}
        onChange={changeEvent => setValue(changeEvent.target.value)}
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
