function APICollections() {
  const collections = [
    "User Management API",
    "Authentication API",
    "Payment API",
    "Notification API",
  ];

  return (
    <div className="api-section">
      <h2>API Collections</h2>

      <div className="api-grid">
        {collections.map((api, index) => (
          <div className="api-card" key={index}>
            <h3>{api}</h3>
            <p>View API endpoints and documentation.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default APICollections;