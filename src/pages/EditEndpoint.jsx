import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function EditEndpoint({
  apiCollections,
  setApiCollections,
  setActivities
}) {
    console.log(import.meta.env.VITE_GEMINI_API_KEY);

const navigate = useNavigate();
const { id } = useParams();

const endpoint = apiCollections
  .flatMap(api =>
    api.endpoints.map(ep => ({
      ...ep,
      apiId: api.id,
    }))
  )
  .find(ep => ep.id === Number(id));
  console.log("Route id:", id);
console.log("All endpoints:", apiCollections.flatMap(api => api.endpoints));

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [method, setMethod] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
     if (!endpoint) return;

setName(endpoint.name || "");
setMethod(endpoint.method || "");
setUrl(endpoint.url || "");
setDescription(endpoint.description || "");
  }, [endpoint]);

  if (!endpoint) {
    
    console.log("Endpoint:", endpoint);
    return (
      <h2 style={{ padding: "30px" }}>
        API Collection Not Found
      </h2>
    );
  }

  return (
    <div>

      <div className="hero-section">
        <h1>Edit Endpoint</h1>

        <p>
          Update your endpoint details.
        </p>
      </div>

      <div className="panel">

        <div className="settings-form">

          <label>Endpoint Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />
            <label>Method</label>

<select
  className="custom-select"
  value={method}
  onChange={(e) => setMethod(e.target.value)}
>
  <option>GET</option>
  <option>POST</option>
  <option>PUT</option>
  <option>DELETE</option>
</select>
          

          <label>Endpoint URL</label>

<input
  type="text"
  value={url}
  onChange={(e) => setUrl(e.target.value)}
/>


          <label>Description</label>

          <textarea
            rows="4"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />
          </div>

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "30px",
            }}
          >
            <button
              className="save-btn"
              onClick={() => {
                const updatedCollections = apiCollections.map((api) => ({
  ...api,
  endpoints: api.endpoints.map((ep,index) =>
    ep.id === Number(id)
      ? {
          ...ep,
          name,
          method,
          url,
          description,
        }
      : ep
  ),
}));

setApiCollections(updatedCollections);
localStorage.setItem(
  "apiCollections",
  JSON.stringify(updatedCollections)
);
setActivities((prev) => [
  {
    id: Date.now(),
    message: `${method} ${url} endpoint updated`,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
  ...prev,
]);
toast.success("Endpoint updated successfully!");

navigate(`/api/${endpoint.apiId}`);
              }}
            >
              Save Changes
            </button>

            <button
              className="remove-btn"
              onClick={() => navigate("/collections")}
            >
              Cancel
            </button>
          </div>

        </div>
      </div>

    
  );
}

export default EditEndpoint;