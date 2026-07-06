function RequestParameters() {
  return (
    <div className="panel">
      <h2>Request Parameters</h2>

      <table className="param-table">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Required</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>id</td>
            <td>number</td>
            <td>Yes</td>
          </tr>

          <tr>
            <td>name</td>
            <td>string</td>
            <td>No</td>
          </tr>

          <tr>
            <td>email</td>
            <td>string</td>
            <td>Yes</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default RequestParameters;