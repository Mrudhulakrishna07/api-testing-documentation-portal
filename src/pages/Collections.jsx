import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal"
function Collections({ user,apiCollections, setApiCollections,search, setActivities }) {
  const navigate = useNavigate();
  const assignedApis =
  JSON.parse(localStorage.getItem("assignedApis")) || [];
  const [showDeleteModal, setShowDeleteModal] = useState(false);

const [selectedId, setSelectedId] = useState(null);
  const userApis =
  user?.role === "Admin"
    ? apiCollections
    : apiCollections.filter((api) =>
        assignedApis.some(
          (a) =>
            a.userEmail === user.email &&
            a.apiId === api.id
        )
      );
console.log("Assigned APIs:", assignedApis);
console.log("Current User:", user);
console.log("User APIs:", userApis);
const filteredCollections = userApis.filter((api) =>
  (api.name || "").toLowerCase().includes((search || "").toLowerCase())
);
console.log("Search:",search);
console.log(filteredCollections);
  const deleteCollection = (id) => {
  const deletedApi = apiCollections.find(
    (api) => api.id === id
  );

  setApiCollections(
    apiCollections.filter((api) => api.id !== id)
  );

  setActivities((prev) => [
    {
      id: Date.now(),
      message: `${deletedApi.name} deleted`,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
    ...prev,
  ]);
};


  return (
    <div>
      
      <div className="hero-section">
  <h1>
    {user?.role === "Admin" ? "API Collections" : "My APIs"}
  </h1>

  <p>
    {user?.role === "Admin"
      ? "Browse and manage API collections, services and developer resources."
      : "Access the APIs assigned to your account."}
  </p>
</div>
        <div className="collections-toolbar">
          {user?.role === "Admin" && (
  <button
    className="collection-btn"
    onClick={() => navigate("/create-collection")}
  >
    + Create Collection
  </button>
  )}
</div>
      <div className="collections-grid">
  {filteredCollections.map((api) => {

    const myPermission = assignedApis.find(
      (a) =>
        a.userEmail === user.email &&
        a.apiId === api.id
    )?.permission;

    return (
          <div className="collection-card" key={api.id}>
            <h3>{api.name}</h3>

            <p>{api.endpoints.length} Endpoints</p>

            <span className="collection-status">
              {api.status}
            </span>
            {user?.role !== "Admin" && (
  <p>
    <b>Permission:</b> {myPermission}
  </p>
)}
            <button className="collection-btn"
            onClick={() => {navigate(`/api/${api.id}/endpoints`)}}>
              {user?.role === "Admin"
  ? "Manage APIs"
  : myPermission === "View Only"
  ? "View APIs"
  : myPermission === "Editor"
  ? "Edit APIs"
  : "Open Workspace"}
            </button>

          
{user?.role === "Admin" && (
<div className="action-buttons">
  <button
  className="edit-btn"
  onClick={() => navigate(`/edit-collection/${api.id}`)}
>
  Edit
</button>

  <button
    className="delete-btn"
    onClick={() => {
      setSelectedId(api.id);
      setShowDeleteModal(true);
    }
    }
  >
    Delete
  </button>
</div>
)}
          </div>
    
        );
})}
      </div>
      <DeleteModal
    isOpen={showDeleteModal}
    title="Delete Collection"
    message="Are you sure you want to delete this collection?"
    onCancel={() => setShowDeleteModal(false)}
    onConfirm={() => {
        deleteCollection(selectedId);
        setShowDeleteModal(false);
    }}
/>
    </div>
  );
}

export default Collections;