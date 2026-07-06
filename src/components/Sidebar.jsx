import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
LuLayoutDashboard,
LuFolder,
LuPlug,
LuChartColumn,
LuFileText,
LuSettings,
LuLogOut, LuUser,LuBell,
LuNetwork,LuClipboardList,LuCpu,LuClipboardCheck
} from "react-icons/lu";
function Sidebar({user, systemOnline, setUser}) {
  const navigate = useNavigate();
  const handleLogout = () => {
  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const updatedUsers = users.map((u) =>
    u.email === user.email
      ? {
          ...u,
          status: "Offline",
          lastSeen: new Date().toISOString(),
        }
      : u
  );

  localStorage.setItem(
    "users",
    JSON.stringify(updatedUsers)
  );

  localStorage.removeItem("currentUser");

  setUser(null);

  navigate("/login");
};
  console.log(user);
    console.log(user?.role);
    const profileImage = localStorage.getItem(
  `profileImage_${user.email}`
);

const profileName =
  localStorage.getItem(`profileName_${user.email}`) ||
  user.name;
  const [unreadCount, setUnreadCount] = useState(0);

useEffect(() => {
  const loadNotifications = () => {
    const notifications =
      JSON.parse(localStorage.getItem("notifications")) || [];

    setUnreadCount(
      notifications.filter(
        (n) =>
          n.userEmail === user.email &&
          !n.isRead
      ).length
    );
  };

  loadNotifications();

  window.addEventListener("storage", loadNotifications);

  return () => {
    window.removeEventListener("storage", loadNotifications);
  };
}, [user]);
  return (
  <div className="sidebar">

    <div>

      <div className="sidebar-profile"
      onClick={() => navigate("/settings")}
      title="View Profile & Settings">

  <div className="sidebar-avatar">

    {profileImage ? (
  <img
    src={profileImage}
    alt="Profile"
    className="sidebar-avatar-img"
  />
) : (
  profileName.charAt(0).toUpperCase()
)}

  </div>

  <div className="sidebar-user-info">
    <h4>{profileName}</h4>
    <p>{user?.role === "Admin" ? "Administrator" : "User"}</p>
  </div>

</div>

      <div className="menu-section">
        <NavLink to="/" className="menu-link">
          {({ isActive }) => (
            <div className={`menu-item ${isActive ? "active" : ""}`}>
              <LuLayoutDashboard size={18}/>
              Dashboard
            </div>
          )}
        </NavLink>

        {user?.role === "Admin" && (
          <>
            <NavLink to="/collections" className="menu-link">
              {({ isActive }) => (
                <div className={`menu-item ${isActive ? "active" : ""}`}>
                  <LuFolder size={18}/>
                  API Collections
                </div>
              )}
            </NavLink>
              
              {user?.role === "Admin" && (
  <NavLink to="/assign-api" className="menu-link">
    {({ isActive }) => (
      <div className={`menu-item ${isActive ? "active" : ""}`}>
        <LuClipboardCheck size={18} />
        API Access
      </div>
    )}
  </NavLink>
)}

              <NavLink to="/users" className="menu-link">
  {({ isActive }) => (
    <div className={`menu-item ${isActive ? "active" : ""}`}>
      <LuUser size={18} />
      Users
    </div>
  )}
</NavLink>

            <NavLink to="/endpoints" className="menu-link">
              {({ isActive }) => (
                <div className={`menu-item ${isActive ? "active" : ""}`}>
                  <LuCpu size={18}/>
                    Endpoints
                </div>
              )}
            </NavLink>

            <NavLink to="/analytics" className="menu-link">
              {({ isActive }) => (
                <div className={`menu-item ${isActive ? "active" : ""}`}>
                  <LuChartColumn size={18}/>
                  Analytics
                </div>
              )}
            </NavLink>
          </>
        )}
        
        {user?.role === "User" && (
          <NavLink to="/myapis" className="menu-link">
            {({ isActive }) => (
              <div className={`menu-item ${isActive ? "active" : ""}`}>
                <LuNetwork size={18} />
                My APIs
              </div>
            )}
          </NavLink>
        )}
        {user?.role === "User" && (
  <NavLink to="/endpoints" className="menu-link">
    {({ isActive }) => (
      <div className={`menu-item ${isActive ? "active" : ""}`}>
        <LuCpu size={18} />
        Endpoints
      </div>
    )}
  </NavLink>
)}
        <NavLink to="/notifications" className="menu-link">
  {({ isActive }) => (
    <div className={`menu-item ${isActive ? "active" : ""}`}>
      <LuBell size={18} />

      <span style={{ flex: 1 }}>
        Notifications
      </span>

      {unreadCount > 0 && (
        <span className="notification-count">
          {unreadCount}
        </span>
      )}
    </div>
  )}
</NavLink>
        <NavLink to="/settings" className="menu-link">
          {({ isActive }) => (
            <div className={`menu-item ${isActive ? "active" : ""}`}>
              <LuSettings size={18}/>
              Settings
            </div>           
          )}
        </NavLink>

        

      </div>

    </div>

    <div className="sidebar-footer">

      <div className="system-status">
        <div
          className="status-dot"
          style={{
            background: systemOnline ? "#22c55e" : "#ef4444",
          }}
        ></div>

        <span>
          {systemOnline ? "Workspace Online" : "Workspace Offline"}
        </span>
      </div>

      <button
        className="logout-sidebar-btn"
        onClick={handleLogout}
      >
        <LuLogOut size={18} />
        Logout
      </button>

    </div>

  </div>
);
}

export default Sidebar;