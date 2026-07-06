import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
function ApiDetails({ apiCollections, user }) {
const navigate = useNavigate();
  const { id } = useParams();

  const api = apiCollections.find(
    (item) => item.id === Number(id)
  );
  const assignedApis =
  JSON.parse(localStorage.getItem("assignedApis")) || [];

const myPermission =
  user?.role === "Admin"
    ? "Full Access"
    : assignedApis.find(
        (a) =>
          a.userEmail === user.email &&
          a.apiId === api?.id
      )?.permission;
  if (!api) {
    return <h2>API not found.</h2>;
  }

  return (
    <div>

      <div className="hero-section">
        <h1>{api.name}</h1>
        <p>{api.description}</p>
      </div>

      <div className="panel">

        <h2>API Information</h2>

        <div className="api-info-grid">

  <div className="info-card">
    <span className="info-label">Provider</span>
    <h3>{api.provider}</h3>
  </div>

  <div className="info-card">
    <span className="info-label">Model</span>
    <h3>{api.model}</h3>
  </div>

  <div className="info-card">
    <span className="info-label">Status</span>
    <h3 className="status-active">{api.status}</h3>
  </div>

  <div className="info-card">
    <span className="info-label">Endpoints</span>
    <h3>{api.endpoints.length}</h3>
  </div>

</div>

      </div>

      <div className="panel">

        <h2>Endpoints</h2>
        <div style={{ marginBottom: "20px" }}>
  <button
    className="view-btn"
    onClick={() => navigate("/endpoints")}
  >
    Manage Endpoints
  </button>
</div>
        {api.endpoints.map((ep,index)=>(
          <div
            className="endpoint-card"
            key={index}
          >

           <div className="endpoint-header">

  <span className={`method-badge ${ep.method.toLowerCase()}`}>
    {ep.method}
  </span>

  <span className="endpoint-path">
    {ep.path}
  </span>

  

</div>

           <p className="endpoint-description">
  {ep.description}
</p>

<div className="action-buttons">

  {(myPermission === "Editor" ||
    myPermission === "Full Access") && (
    <button
      className="edit-btn"
      onClick={() =>
        navigate(`/edit-endpoint/${api.id}`)
      }
    >
      Edit
    </button>
  )}

  {myPermission === "Full Access" && (
    <button
      className="delete-btn"
      onClick={() =>
        toast.success("Endpoint deleted!")
      }
    >
      Delete
    </button>
  )}

</div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default ApiDetails;