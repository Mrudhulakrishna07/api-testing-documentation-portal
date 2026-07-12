import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { testGeminiConnection } from "../services/gemini";
import { toast } from "react-toastify";

function EditCollection({
  apiCollections,
  setApiCollections,
  setActivities,
}) {
    console.log(import.meta.env.VITE_GEMINI_API_KEY);
  const navigate = useNavigate();
  const { id } = useParams();

  const collection = apiCollections.find(
    (api) => api.id === Number(id)
  );

  const [name, setName] = useState("");
  const [provider, setProvider] = useState("");
  const [endpointUrl, setEndpointUrl] = useState("");
  const [model, setModel] = useState("");
  
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  

  useEffect(() => {
    if (!collection) return;

    setName(collection.name);
    setProvider(collection.provider);
    setEndpointUrl(collection.endpointUrl);
    setModel(collection.model);
    setDescription(collection.description);
    setStatus(collection.status);
  }, [collection]);

  if (!collection) {
    return (
      <h2 style={{ padding: "30px" }}>
        API Collection Not Found
      </h2>
    );
  }

  return (
    <div>

      <div className="hero-section">
        <h1>Edit API Collection</h1>

        <p>
          Configure your API settings and credentials.
        </p>
      </div>

      <div className="panel">

        <div className="settings-form">

          <label>API Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <label>Provider</label>

          <select
            className="custom-select"
            value={provider}
            onChange={(e) =>
              setProvider(e.target.value)
            }
          >
            <option value="">Select Provider</option>
            <option>Google AI Studio</option>
            <option>OpenAI</option>
            <option>Postman</option>
          </select>

          <label>Endpoint URL</label>

          <input
            type="text"
            placeholder="https://..."
            value={endpointUrl}
            onChange={(e) =>
              setEndpointUrl(e.target.value)
            }
          />

          <label>Model</label>

          <input
            type="text"
            placeholder="Gemini 2.5 Flash"
            value={model}
            onChange={(e) =>
              setModel(e.target.value)
            }
          />

  

          <label>Description</label>

          <textarea
            rows="4"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <label>Status</label>

          <select
            className="custom-select"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            <option>Active</option>
            <option>Inactive</option>
            <option>Maintenance</option>
          </select>

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
                const updatedCollections =
                  apiCollections.map((api) =>
                    api.id === Number(id)
                      ? {
                          ...api,
                          name,
                          provider,
                          endpointUrl,
                          model,
                          description,
                          status,
                        }
                      : api
                  );

                setApiCollections(updatedCollections);
                  setActivities((prev) => [
  {
    id: Date.now(),
    message: `${name} updated`,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
  ...prev,
]);
                toast.success(
                  "API Collection updated successfully!"
                );

                setTimeout(() => {
                  navigate("/collections");
                }, 1000);
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

    </div>
  );
}

export default EditCollection;