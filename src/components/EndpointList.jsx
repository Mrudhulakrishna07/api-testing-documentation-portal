function EndpointList({ apiCollections }) {
  return (
    <div className="endpoint-section">
      <h2>Available Endpoints</h2>

      {apiCollections.map((api) => (
        <div key={api.id}>
          <h3 style={{ marginTop: "20px" }}>
            {api.name}
          </h3>

          {api.endpoints.length === 0 ? (
            <div className="endpoint-card">
              No endpoints added yet.
            </div>
          ) : (
            api.endpoints.map((endpoint) => (
              <div
                className="endpoint-card"
                key={endpoint.id}
              >
                <strong>{endpoint.method}</strong>{" "}
                {endpoint.url}
                <br />
                <small>{endpoint.description}</small>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
}

export default EndpointList;