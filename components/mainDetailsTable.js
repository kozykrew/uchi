import Table from 'react-bootstrap/Table'

import styles from './details.module.css'

// PROPS
// type: string - task, hf, or confirmation
// additional: array of objects of any additional information for a home feature
export function MainDetailsTable(props) {
  if (props.type == "task") {
    return (
      <Table>
        <tr>
          <th>Space</th>
          <td>Outdoors</td>
        </tr>
        <tr>
          <th>Difficulty</th>
          <td>Easy</td>
        </tr>
        <tr>
          <th>Time Commitment</th>
          <td>2 hours</td>
        </tr>
        <tr>
          <th>Frequency</th>
          <td>Biannual</td>
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
