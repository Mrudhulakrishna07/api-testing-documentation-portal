import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function AssignApi({ user, apiCollections, assignedApis, setAssignedApis, setActivities}) {
  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedApi, setSelectedApi] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [permission, setPermission] = useState("View Only");

  useEffect(() => {
    localStorage.setItem(
      "assignedApis",
      JSON.stringify(assignedApis)
    );
  }, [assignedApis]);

  return (
    <div>

      <div className="hero-section">
        <h1>Assign APIs</h1>
        <p>
          Assign API collections to users and manage
          their permissions.
        </p>
      </div>

      <div className="panel">

        <div className="settings-form">

          <label>Select User</label>

          <select
  value={selectedUser}
  onChange={(e) => setSelectedUser(e.target.value)}
>
  <option value="">Choose User</option>

  {JSON.parse(localStorage.getItem("users") || "[]")
    .filter((u) => u.role === "User")
    .map((u) => (
      <option key={u.email} value={u.email}>
        {u.name}
      </option>
    ))}
</select>

          <label>Select API Collection</label>

         <select
  value={selectedApi}
  onChange={(e) => setSelectedApi(e.target.value)}
>
  <option value="">Choose API</option>

  {apiCollections.map((api) => (
    <option key={api.id} value={api.id}>
      {api.name}
    </option>
  ))}
</select>

          <label>Permission</label>

          <select
            className="custom-select"
            value={permission}
            onChange={(e) =>
              setPermission(e.target.value)
            }
          >
            <option>View Only</option>
            <option>Editor</option>
            <option>Full Access</option>
          </select>
          <button
            className="save-btn"
            onClick={() => {
  if (!selectedUser || !selectedApi) {
    toast.warning("Please select a user and an API.");
    return;
  }

  const assignment = {
    id: Date.now(),
    userEmail: selectedUser,
    apiId: Number(selectedApi),
    permission,
  };

  const updatedAssignments = [...assignedApis, assignment];

  setAssignedApis(updatedAssignments);

  localStorage.setItem(
    "assignedApis",
    JSON.stringify(updatedAssignments)
  );
const notifications =
  JSON.parse(localStorage.getItem("notifications")) || [];

const api = apiCollections.find(
  (a) => a.id === Number(selectedApi)
);

notifications.unshift({
  id: Date.now(),
  userEmail: selectedUser,
  title: "New API Assigned",
  message: `${api.name} has been assigned to you.`,
  time: new Date().toLocaleString(),
  isRead: false,
});
const admin = users.find(
  (u) => u.role === "Admin"
);

if (admin) {
  notifications.unshift({
    id: Date.now() + 1,
    userEmail: admin.email,
    title: "API Assigned",
    message: `${api.name} was assigned to ${users.find(u => u.email === selectedUser)?.name}.`,
    time: new Date().toLocaleString(),
    isRead: false,
  });
}

localStorage.setItem(
  "notifications",
  JSON.stringify(notifications)
);
window.dispatchEvent(new Event("storage"));
  setActivities((prev) => [
  {
    id: Date.now(),
    message: `${api.name} assigned to ${
      users.find((u) => u.email === selectedUser)?.name
    }`,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
  ...prev,
]);

toast.success("API assigned successfully!");

setSelectedUser("");
setSelectedApi("");
setPermission("View Only");
}}
          >
            Assign API
          </button>

        </div>
      </div>

      <div className="panel" style={{ marginTop: "20px" }}>
        <h2>Assigned APIs</h2>

<div className="assigned-grid">
  {assignedApis.length === 0 ? (
    <p>No APIs assigned yet.</p>
  ) : (
    assignedApis.map((item) => {
      const api = apiCollections.find(a => a.id === item.apiId);
      console.log(item);
      console.log(apiCollections);
      const user = JSON.parse(localStorage.getItem("users") || "[]")
        .find(u => u.email === item.userEmail);

      return (
        <div className="assignment-card" key={item.id}>
          <h3>{user?.name}</h3>
          <p><b>API:</b> {api?.name}</p>
          <p><b>Permission:</b> {item.permission}</p>

         <button
  className="delete-btn"
  onClick={() => {
    setSelectedAssignment(item);
    setShowDeleteModal(true);
  }}
>
  Remove
</button>
        </div>
      );
    })
  )}
</div>
          
      </div>
        {showDeleteModal && (
  <div className="modal-overlay">
    <div className="delete-modal">
      <h3>Remove API Access?</h3>

      <p>
        Are you sure you want to remove this API assignment?
      </p>

      <div className="modal-buttons">
        <button
          className="cancel-btn"
          onClick={() => setShowDeleteModal(false)}
        >
          Cancel
        </button>

        <button
          className="confirm-remove-btn"
          onClick={() => {
            const updated = assignedApis.filter(
              (a) => a.id !== selectedAssignment.id
            );

            setAssignedApis(updated);
            const notifications =
  JSON.parse(localStorage.getItem("notifications")) || [];

const admin = users.find(
  (u) => u.role === "Admin"
);

const removedApi = apiCollections.find(
  (a) => a.id === selectedAssignment.apiId
);

const removedUser = users.find(
  (u) => u.email === selectedAssignment.userEmail
);

if (admin) {
  notifications.unshift({
    id: Date.now(),
    userEmail: admin.email,
    title: "API Access Removed",
    message: `${removedApi?.name} access was removed from ${removedUser?.name}.`,
    time: new Date().toLocaleString(),
    isRead: false,
  });

  localStorage.setItem(
    "notifications",
    JSON.stringify(notifications)
  );
  window.dispatchEvent(new Event("storage"));
}

            setActivities((prev) => [
  {
    id: Date.now(),
    message: `${removedApi?.name} access removed from ${removedUser?.name}`,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
  ...prev,
]);

toast.success("API assignment removed!");
setShowDeleteModal(false);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default AssignApi;