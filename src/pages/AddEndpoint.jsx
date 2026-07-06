import { useState } from "react";
import { useNavigate } from "react-router-dom";
import endpointTemplates from "../data/endpointTemplates";
import { toast } from "react-toastify";

function AddEndpoint({ apiCollections, setApiCollections, setActivities }) {
  const navigate = useNavigate();

  const [selectedApi, setSelectedApi] = useState("");
  const [selectedEndpoint, setSelectedEndpoint] = useState("");
  const selectedApiName =
  apiCollections.find(
    (api) => api.id === Number(selectedApi)
  )?.name;

const availableEndpoints =
  endpointTemplates[selectedApiName] || [];
  console.log(selectedApiName);
  console.log(availableEndpoints);
const endpointDetails =
  availableEndpoints.find(
    (endpoint) => endpoint.name === selectedEndpoint
  );
const addEndpoint = () => {
  if (!selectedApi || !selectedEndpoint) {
    toast.warning("Please select an API and endpoint.");
    return;
  }

  const updatedCollections = apiCollections.map((api) => {
    if (api.id === Number(selectedApi)) {
      return {
        ...api,
        endpoints: [
          ...api.endpoints,
          {
            id: Date.now(),
            method: selectedEndpoint.split(" ")[0],
            url: selectedEndpoint.split(" ")[1],
            description: "Sample API Endpoint",
          },
        ],
      };
    }
    return api;
  });

  setApiCollections(updatedCollections);
  setActivities((prev) => [
  {
    id: Date.now(),
    message: `${selectedEndpoint} endpoint added to ${selectedApiName}`,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
  ...prev,
]);
  toast.success("Endpoint added successfully!");
  navigate("/endpoints");
};
  return (
    <div>
      
      <div className="hero-section">
        <h1>Add Endpoint</h1>

        <p>
          Add a new endpoint to an API Collection.
        </p>
      </div>

      <div className="panel">
        <div className="settings-form">

          <label>Select API</label>

          <select
            value={selectedApi}
            onChange={(e) => setSelectedApi(e.target.value)}
          >
            <option value="">Choose API</option>

            {apiCollections.map((api) => (
              <option
                key={api.id}
                value={api.id}
              >
                {api.name}
              </option>
            ))}
          </select>

          <label>Select Endpoint</label>

<select
  value={selectedEndpoint}
  onChange={(e) => setSelectedEndpoint(e.target.value)}
>
  <option value="">Choose Endpoint</option>
  <option value="GET /users">GET /users</option>
  <option value="GET /users/:id">GET /users/:id</option>
  <option value="POST /users">POST /users</option>
  <option value="PUT /users/:id">PUT /users/:id</option>
  <option value="DELETE /users/:id">DELETE /users/:id</option>
  <option value="POST /login">POST /login</option>
  <option value="POST /register">POST /register</option>
  <option value="GET /products">GET /products</option>
  <option value="POST /products">POST /products</option>
  <option value="DELETE /products/:id">DELETE /products/:id</option>
</select>
{endpointDetails && (
  <div
    style={{
      marginTop: "20px",
      padding: "18px",
      borderRadius: "12px",
      background: "#1e293b",
      color: "white",
    }}
  >
    <p>
      <strong>Method:</strong> {endpointDetails.method}
    </p>

    <p>
      <strong>URL:</strong> {endpointDetails.url}
    </p>

    <p>
      <strong>Description:</strong>{" "}
      {endpointDetails.description}
    </p>
  </div>
)}
    <button
  className="save-btn"
  onClick={addEndpoint}
>
  Add Endpoint
</button>

        </div>
      </div>
    </div>
  );
}

export default AddEndpoint;