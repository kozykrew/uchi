import Table from 'react-bootstrap/Table'

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
    var additionalTable = [];
    if (props.additional != []) {
      additionalTable = props.additional.map((add => (
        <tr>
          <th>{add.header}</th>
          <td>{add.data}</td>
        </tr>
      )));
      additional = [
        <hr className={styles.hr} />,
        <Table>
          {additionalTable}
        </Table>
      ];
    }

    return (
      <div>
        <Table>
          <tr>
            <th>Type</th>
            <td>French door</td>
          </tr>
          <tr>
            <th>Brand</th>
            <td>Samsung</td>
          </tr>
          <tr>
            <th>Model #</th>
            <td>ABCDEFG123456</td>
          </tr>
          <tr>
            <th>Age</th>
            <td>4 years</td>
          </tr>
        </Table>
        {additional}
      </div>
    )
  } else if (props.type == "confirmation") {
    return (
      <div>
        <Table>
          <tr>
            <th>Type</th>
            <td>French door</td>
          </tr>
          <tr>
            <th>Age</th>
            <td>4 years</td>
          </tr>
        </Table>
      </div>
    )
  }
}
