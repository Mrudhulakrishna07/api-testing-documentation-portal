import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { askGemini } from "../services/gemini";
import { toast } from "react-toastify";
import {
  FaDownload,
  FaUpload,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

import { FiEye } from "react-icons/fi";
function CreateCollection({
  apiCollections,
  setApiCollections,
  setActivities,
}) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");
  const [idea, setIdea] = useState("");
const [loading, setLoading] = useState(false);
const [description, setDescription] = useState("");
const [endpointUrl, setEndpointUrl] = useState("");
const [provider, setProvider] = useState("Google Gemini");
const [model, setModel] = useState("Gemini 2.5 Flash");
const [generatedEndpoints, setGeneratedEndpoints] = useState([]);
  const createCollection = () => {
    if (!name) return;

    const newCollection = {
  id: Date.now(),
  name,
  endpoints: generatedEndpoints,
  status,

  provider,
  endpointUrl,
  apiKey: "",
  model,
  description,

  successRate: 98,
  responseTime: 250,
};

    setApiCollections([
  ...apiCollections,
  newCollection
]);

setActivities((prev) => [
  {
    id: Date.now(),
    message: `${name} created`,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
  {
    id: Date.now() + 1,
    message: `${generatedEndpoints.length} endpoints generated for ${name}`,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
  ...prev,
].slice(0, 10));

toast.success("API Collection created successfully!");

navigate("/collections");
};  
  return (
    <div>
      
      <div className="hero-section">
        <h1>Create API Collection</h1>

        <p>
          Create and manage API collections for developers.
        </p>
      </div>

      <div className="panel">
        <div className="settings-form">

          <label>Collection Name:</label>

          <input
            type="text"
            placeholder="Enter collection name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

         <label>Describe the API you want:</label>

<textarea
  rows="4"
  placeholder="Example: Create an API for a hotel booking system..."
  value={idea}
  onChange={(e) => setIdea(e.target.value)}
/>

<button
  className="collection-btn"
  disabled={loading}
  onClick={async () => {
  if (!idea.trim()) {
    toast.error("Please describe the API first.");
    return;
  }

  setLoading(true);

  try {
    const prompt = `
You are an expert REST API documentation generator.

Generate ONLY valid JSON.

{
  "name": "",
  "description": "",
  "provider": "Google Gemini",
  "model": "Gemini 2.5 Flash",
  "endpoints": [
    {
      "method": "",
      "path": "",
      "description": "",
      "request": {},
      "response": {}
    }
  ]
}

Rules:
- Generate exactly 5 REST endpoints.
- Every endpoint must have:
  - method
  - path
  - description
  - realistic request JSON
  - realistic response JSON
- Request and response must match the API idea.
- Do NOT return markdown.
- Do NOT wrap the JSON in \`\`\`.

API Idea:
${idea}
`;

    const result = await askGemini(prompt);
    if(!result) {
      toast.error("Gemini is currently busy. Please try again in a few seconds.");
      return;
    }
    console.log(result);
    const cleanJson = result
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const generated = JSON.parse(cleanJson);

setName(generated.name);
setDescription(generated.description);
setIdea(generated.description);
setProvider(generated.provider);
setModel(generated.model);
setGeneratedEndpoints(generated.endpoints.map((endpoint) => ({
  ...endpoint,
  id: Date.now() + Math.random(),
}))
);
toast.success("API generated successfully!");

  } catch (error) {
    toast.error("Failed to generate API.");
  } finally {
    setLoading(false);
  }
}}
>
  {loading ? "Generating..." : "✨ Generate"}
</button>

          <label>Status:</label>

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
            {generatedEndpoints.length > 0 && (
  <div className="panel" style={{ marginTop: 20 }}>
    <h3>Generated Endpoints</h3>

    {generatedEndpoints.map((ep, index) => (
      <div className="endpoint-card" key={index}>

        {ep.method === "GET" && <FaDownload className="endpoint-icon get" />}

        {ep.method === "POST" && <FaUpload className="endpoint-icon post" />}

        {ep.method === "PUT" && <FaEdit className="endpoint-icon put" />}

        {ep.method === "DELETE" && <FaTrash className="endpoint-icon delete" />}

        <div>
          <div className="endpoint-header">

  <span
    className={`method-badge ${ep.method.toLowerCase()}`}
  >
    {ep.method}
  </span>

  <span className="endpoint-path">
    {ep.path}
  </span>

</div>

<p className="endpoint-description">
  {ep.description}
</p>
        </div>

      </div>
    ))}
  </div>
)}
          <button
            className="save-btn"
            onClick={createCollection}
          >
            Create Collection
          </button>

        </div>
      </div>
    </div>
  );
}

export default CreateCollection;