function ResponseExamples() {
  return (
    <div className="response-panel">
      <h2>Response Example</h2>

      <pre>
{`{
  "success": true,
  "message": "User fetched successfully",
  "data": {
    "id": 1,
    "name": "Krishna"
  }
}`}
      </pre>
    </div>
  );
}

export default ResponseExamples;