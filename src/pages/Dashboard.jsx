import {
  LuFolder,
  LuPlug,
  LuShieldCheck,
  LuActivity,
  LuSearch,
  LuUser,
  LuPlus,
  LuFileText,
  LuChartColumn,
  LuServer,LuBell,
  LuClock,
  LuSun,LuRefreshCw
} from "react-icons/lu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteModal from "../components/DeleteModal";
function Dashboard({user, apiCollections,systemOnline,setSystemOnline,activities,setActivities}) {
  const totalEndpoints = apiCollections.reduce( (sum, api) => sum + api.endpoints.length, 0);
  const navigate = useNavigate();
  const [refreshing, setRefreshing] = useState(false);
  const [showActivityModal,setShowActivityModal] = useState(false);

  const users =
  JSON.parse(localStorage.getItem("users")) || [];
  
  return (
    <div>
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  }}
>
  <div>
    <h2
      style={{
        margin: 0,
        fontSize: "28px",
        fontWeight: "700",
      }}
    >
      <LuSun size={20} />
      
      {new Date().getHours() < 12
        ? " Good Morning"
        : new Date().getHours() < 17
        ? " Good Afternoon"
        : " Good Evening"}!
      
    </h2>

    <p
      style={{
        color: "#9ca3af",
        marginTop: "8px",
      }}
    >
      Here's an overview of your workspace today.
    </p>
  </div>

<div>

<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "15px",
  }}
>
  <LuClock size={22} />

  <div>
    <h3
      style={{
        margin: 0,
        fontSize: "16px",
      }}
    >
      {new Date().toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      })}
    </h3>

    <p
      style={{
        margin: "2px 0 0",
        color: "#9ca3af",
        fontSize: "13px",
      }}
    >
      {new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </p>
  </div>
</div>
</div>
</div>
      <div className="hero-section">

  <h1>Welcome Back, {user?.name?.split(" ")[0]}!
</h1>

  <p>
    Manage API collections, monitor system health, track analytics, and
    maintain your enterprise platform from one centralized dashboard.
  </p>
  
  <div
  style={{
    textAlign: "right",
    minWidth: "130px",
    marginTop: "8px",
  }}
>
  



  </div>


</div>

      <div className="stats-grid">

        <div className="stat-card">
          <h2>{apiCollections.length}</h2>
          <p><LuFolder size={18}/>API Collections</p>
        </div>

        <div className="stat-card">
          <h2>{totalEndpoints}</h2>
          <p><LuPlug size={18}/>Endpoints</p>
        </div>

        <div className="stat-card">
          <h2>99.9%</h2>
          <p><LuShieldCheck size={18}/>Service Uptime</p>
        </div>

        <div className="stat-card">
          <h2>{apiCollections.filter( api => api.status === "Active" ).length}</h2>
          <p><LuActivity size={18}/>Active Services</p>
        </div>

      </div>

    

      <div className="dashboard-grid">

  <div className="panel">
  <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <h2>
    <LuActivity /> Recent Activity
  </h2>

  <button
  className="delete-btn notification-clear-btn"
  onClick={() => setShowActivityModal(true)}
>
  Clear All
</button>
</div>
  <div className={refreshing ? "activity-refresh" : ""}>
  {activities.length === 0 ? (
    <div className="empty-state">
      <h3>No Recent Activity</h3>
      <p>
        Start creating API collections and endpoints to see activity here.
      </p>
    </div>
  ) : (
    activities.slice(0, 5).map((activity) => (
      <div
        className="activity-item"
        key={activity.id}
      >
        <span className="activity-success">
          <LuShieldCheck />
        </span>

        <div>
          <strong>{activity.message}</strong>
          <br />
          <small>{activity.time}</small>
        </div>
      </div>
    ))
  )}
</div>

</div>
  <div className="panel">

  <h2><LuServer /> API Overview</h2>

  <div className="status-row">
    <span>Collections</span>
    <span className="online-badge">
      {apiCollections.length}
    </span>
  </div>

  <div className="status-row">
    <span>Total Endpoints</span>
    <span className="online-badge">
      {totalEndpoints}
    </span>
  </div>

  <div className="status-row">
    <span>Active APIs</span>
    <span className="online-badge">
      {apiCollections.filter(api => api.status === "Active").length}
    </span>
  </div>

  <div className="status-row">
    <span>AI Provider</span>
    <span className="online-badge">
      Gemini
    </span>
  </div>

</div>

  {user?.role === "Admin" && (

    <div className="panel developer-panel">

      <h2>
        <LuUser /> Team Status
      </h2>

      <div className="developer-status-container">

        {users.map((u) => (

          <div
            className="developer-status-card"
            key={u.name}
          >

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >

              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "#111111",
                  border:"1px solid #525252",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                {u.name.charAt(0).toUpperCase()}
              </div>

              <div>

                <strong>{u.name}</strong>

                <br />

                <small>
  {u.status === "Online"
    ? "Active Now"
    : `Last seen: Today at ${new Date(u.lastSeen).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })}`}
</small>

              </div>

            </div>

            <span
              className={
                u.status === "Online"
                ? "online-badge"
                : "offline-badge"
              }
              >
                {u.status === "Online"
                ? "Online"
              : "Offline"}
            </span>

          </div>

        ))}

      </div>

    </div>

  )}

</div>

<div style={{ height: "20px" }}></div>

      <div className="dashboard-grid">

  {user?.role === "Admin"  && (

    <div className="panel developer-panel">

      <h2>
        <LuShieldCheck /> Admin Control Center
      </h2>

      <p
        style={{
          color: "#9ca3af",
          marginBottom: "25px",
        }}
      >
        Manage your API platform with one-click actions.
      </p>
        <div
  style={{
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
    flexWrap: "wrap",
  }}
>
  <span className="online-badge">
    Admin Access
  </span>

  <span className="online-badge">
    Secure Workspace
  </span>

  <span className="online-badge">
    Enterprise Mode
  </span>
</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "18px",
        }}
      >

        <button
          className="action-btn"
          onClick={() => navigate("/create-collection")}
        >
          <LuPlus size={20} />
          Create API Collection
        </button>

        <button
          className="action-btn"
          onClick={() => navigate("/add-endpoint")}
        >
          <LuPlug size={20} />
          Add New Endpoint
        </button>

        <button
          className="action-btn"
          onClick={() => navigate("/assign-api")}
        >
          <LuFileText size={20} />
          Assign APIs
        </button>

        <button
          className="action-btn"
          onClick={() => navigate("/analytics")}
        >
          <LuChartColumn size={20} />
          View Analytics
        </button>

      </div>

    </div>

           
  )}
</div>
    <DeleteModal
  isOpen={showActivityModal}
  title="Clear Recent Activity"
  message="Are you sure you want to clear all recent activity?"
  onCancel={() => setShowActivityModal(false)}
  onConfirm={() => {
    setActivities([]);
    localStorage.removeItem("activities");
    toast.success("Recent activity cleared!");
    setShowActivityModal(false);
  }}
/>  
    </div>
      
  );
}

export default Dashboard;