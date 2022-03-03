import Table from 'react-bootstrap/Table'

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
          <td>1 hour</td>
        </tr>
        <tr>
          <th>Frequency</th>
          <td>Quarterly</td>
        </tr>
      </Table>
    )
  } else if (props.type == "hf") {
    return (
      <Table>
        <tr>
          <th></th>
          <td></td>
        </tr>
        <tr>
          <th></th>
          <td></td>
        </tr>
        <tr>
          <th></th>
          <td></td>
        </tr>
        <tr>
          <th></th>
          <td></td>
        </tr>
      </Table>
    )
  }
}
