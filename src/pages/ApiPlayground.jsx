import { useState } from "react";
import { askGemini } from "../services/gemini";
import { toast } from "react-toastify";
import {
  FaHotel,
  FaUserShield,
  FaUserGraduate,
  FaKey,
  FaMagic,
} from "react-icons/fa";
import {MdSmartToy} from "react-icons/md";
function ApiPlayground() {
  const [prompt, setPrompt] = useState("");
const [response, setResponse] = useState("");
const [loading, setLoading] = useState(false);

  return (
    <div>
      <div className="hero-section">
        <h1>AI API Generator</h1>

<p>
Generate APIs, JSON payloads, endpoint documentation, and get AI assistance for API development.
</p>
      </div>

      <div className="panel">

        <label>Enter Prompt</label>
        <div className="quick-prompts">
  <button
    className="prompt-chip"
    onClick={() => setPrompt("Generate a Hotel Booking API")}
  >
    <FaHotel style={{color:"white",marginRight:"8px"}}/>
    Hotel API
  </button>

  <button
    className="prompt-chip"
    onClick={() => setPrompt("Generate Login API")}
  >
    <FaUserShield style={{color:"white",marginRight:"8px"}}/>
    Login API
  </button>

  <button
    className="prompt-chip"
    onClick={() => setPrompt("Generate Student Management API")}
  >
    <FaUserGraduate style={{color:"white",marginRight:"8px"}}/>
    Student API
  </button>

  <button
    className="prompt-chip"
    onClick={() => setPrompt("Explain JWT Authentication")}
  >
    <FaKey style={{color:"white",marginRight:"8px"}}/>
    JWT
  </button>
</div>
        <textarea className="ai-prompt"
          rows="10"
          placeholder={`Ask anything...

Examples:
• What is Artificial Intelligence?
• Give me API ideas.
• Generate a Hotel Booking API.
• Explain REST APIs.
• Create a login JSON payload.`}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

<div className="button-row">
<button
className="cancel-btn"
onClick={()=>{
setPrompt("");
setResponse("");
}}
>
Clear
</button>
        <button
  className="generate-btn"
  disabled={loading}
  onClick={async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt.");
      return;
    }

    setLoading(true);
    try{
    const result = await askGemini(prompt);

    setResponse(result);
    toast.success("API generated successfully!");
    }catch (error) {
        toast.error("Failed to generate API.");
    }finally {
    setLoading(false);
    }
  }}
>
    
  <>
  {loading ? (
    <>
      <MdSmartToy size={20} />
      Gemini is thinking...
    </>
  ) : (
    <>
      <FaMagic size={18} />
      Generate API
    </>
  )}
</>
</button>
</div>
        {response && (
        <div className="panel" style={{ marginTop: 25 }}>
          <h3>AI Response</h3>

          <pre className="code-block">
            {response}
          </pre>
          
        </div>
)}
      </div>
    </div>
  );
}

export default ApiPlayground;