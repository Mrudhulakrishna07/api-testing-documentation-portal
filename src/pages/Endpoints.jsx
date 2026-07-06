import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
function Endpoints({ user, apiCollections, setApiCollections, setActivities }) {
  console.log("Endpoints user:", user);
  console.log("Endpoints role:", user?.role);
  const [filter, setFilter] = useState("ALL");
  const navigate = useNavigate();
  const {id} = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedEndpointId, setSelectedEndpointId] = useState(null);
  const deleteEndpoint = (endpointId) => {
  let deletedEndpoint = null;

  const updatedCollections = apiCollections.map((api) => ({
    ...api,
    endpoints: api.endpoints.filter((endpoint) => {
      if (endpoint.id === endpointId) {
        deletedEndpoint = endpoint;
        return false;
      }
      return true;
    }),
  }));

  setApiCollections(updatedCollections);

  setActivities((prev) => [
    {
      id: Date.now(),
      message: `${deletedEndpoint.method} ${deletedEndpoint.url} endpoint deleted`,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
    ...prev,
  ]);
};
const assignedApis =
  JSON.parse(localStorage.getItem("assignedApis")) || [];

  const visibleApis = id
  ? apiCollections.filter(
      (api) => api.id === Number(id)
    )
  : user?.role === "Admin"
  ? apiCollections
  : apiCollections.filter((api) =>
      assignedApis.some(
        (a) =>
          a.userEmail === user.email &&
          a.apiId === api.id
      )
    );

const endpoints = visibleApis.flatMap((api) => {
  if (!Array.isArray(api.endpoints)) {
    return [];
  }

  return api.endpoints.map((endpoint) => ({
    ...endpoint,
    apiName: api.name,
    apiId: api.id,
  }));
});


  const filteredEndpoints =
    filter === "ALL"
      ? endpoints
      : endpoints.filter(
          (endpoint) => endpoint.method === filter
        );
        console.log(filteredEndpoints);
        
       
  return (
    <div>
      
      <div className="hero-section">
        <h1>API Endpoints</h1>

        <p>
          Explore available endpoints and
          supported API operations.
        </p>
      </div>

      <div className="filter-buttons">
        <button
          className={filter === "ALL" ? "active-filter" : ""}
          onClick={() => setFilter("ALL")}
        >
          ALL
        </button>

        <button
          className={filter === "GET" ? "active-filter" : ""}
          onClick={() => setFilter("GET")}
        >
          GET
        </button>

        <button
          className={filter === "POST" ? "active-filter" : ""}
          onClick={() => setFilter("POST")}
        >
          POST
        </button>

        <button
          className={filter === "PUT" ? "active-filter" : ""}
          onClick={() => setFilter("PUT")}
        >
          PUT
        </button>

        <button
          className={filter === "DELETE" ? "active-filter" : ""}
          onClick={() => setFilter("DELETE")}
        >
          DELETE
        </button>
      </div>

      <div className="endpoints-grid">
        {filteredEndpoints.length === 0 ? (
          <h3 style={{ color: "white" }}>
            No endpoints available.
          </h3>
        ) : (
          filteredEndpoints.map((endpoint, index) => {

  const myPermission = assignedApis.find(
    (a) =>
      a.userEmail === user.email &&
      a.apiId === endpoint.apiId
  )?.permission;
console.log("ENdpoint:", endpoint);
  return (
  <div
    className="endpoint-card-pro"
    key={endpoint.id}
  >
    <div>
      {endpoint.method === "GET" && (
        <span className="get-badge">GET</span>
      )}

      {endpoint.method === "POST" && (
        <span className="post-badge">POST</span>
      )}

      {endpoint.method === "PUT" && (
        <span className="put-badge">PUT</span>
      )}

      {endpoint.method === "DELETE" && (
        <span className="delete-badge">
          DELETE
        </span>
      )}
    </div>

    <h3>{endpoint.url}</h3>

    <p>{endpoint.description}</p>

    <p
      style={{
        color: "#94a3b8",
        fontSize: "14px",
        marginBottom: "10px",
      }}
    >
      API: {endpoint.apiName}
    </p>

    <span className="collection-status">
      Active
    </span>

    <div className="endpoint-buttons">
      <button
        className="view-btn"
        onClick={() => navigate(`/endpoints/${endpoint.id}`)}
      >
        View Endpoint
      </button>

      <div className="action-buttons">
        {(user?.role === "Admin" ||
          myPermission === "Editor" ||
          myPermission === "Full Access") && (
          <button
            className="edit-btn"
            onClick={() =>
              navigate(`/edit-endpoint/${endpoint.id}`)
            }
          >
            Edit
          </button>
        )}

        {(user?.role === "Admin" ||
          myPermission === "Full Access") && (
          <button
            className="delete-btn"
            onClick={() => {
              setSelectedEndpointId(endpoint.id);
              setShowDeleteModal(true);
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  </div>
);
})
        )}
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        title="Delete Endpoint"
        message="Are you sure you want to delete this endpoint?"
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={() => {
          deleteEndpoint(selectedEndpointId);
          setSelectedEndpointId(null);
          setShowDeleteModal(false);
        }}
      />
    </div>
  );
}

export default Endpoints;