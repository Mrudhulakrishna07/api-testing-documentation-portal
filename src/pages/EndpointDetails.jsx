import { useParams } from "react-router-dom";
import {FiCopy} from "react-icons/fi";
function EndpointDetails({ apiCollections }) {
  const { id } = useParams();

  const endpoint = apiCollections
    .flatMap((api) =>
      api.endpoints.map((ep) => ({
        ...ep,
        apiName: api.name,
      }))
    )
    .find((ep) => ep.id === Number(id));

  if (!endpoint) {
    return <h2>Endpoint not found.</h2>;
  }

  return (
    <div>
      <div className="hero-section endpoint-hero">

  <span className={`method-badge ${endpoint.method.toLowerCase()}`}>
    {endpoint.method}
  </span>

  <h1>{endpoint.path || endpoint.url}</h1>

  <p>{endpoint.description}</p>

  <span className="status-pill">
    Available
  </span>

</div>

      <div className="panel">
        <h2>Endpoint Information</h2>

        <div className="api-info-grid">
          <div className="info-card">
            <span className="info-label">Method</span>
            <h3>{endpoint.method}</h3>
          </div>

          <div className="info-card">
            <span className="info-label">API Collection</span>
            <h3>{endpoint.apiName}</h3>
          </div>

          <div className="info-card">
            <span className="info-label">Status</span>
            <h3 className="status-active">Available</h3>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className='code-header'>
        <h2>Sample Request</h2>
        
        </div>

        <pre className="code-block">
            
{JSON.stringify(endpoint.request, null, 2)}
        </pre>
      </div>

      <div className="panel">
        <div className='code-header'>
        <h2>Sample Response</h2>
        
</div>
        <pre className="code-block">
{JSON.stringify(endpoint.response, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default EndpointDetails;