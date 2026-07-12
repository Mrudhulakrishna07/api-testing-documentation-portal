import { useEffect, useState } from "react";
import { LuBell, LuCalendar, LuCircleAlert, LuClock1, LuClock3, LuFileText, LuMail, LuMessageCircle } from "react-icons/lu";
import { toast } from "react-toastify";
import DeleteModal from "../components/DeleteModal";
function Notifications({ user }) {
  const [notifications, setNotifications] = useState([]);
  const [showDeleteModal, setShowDeleteModal] =
  useState(false);

const [selectedNotification, setSelectedNotification] =
  useState(null);
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("notifications")) || [];

    const myNotifications = saved.filter(
      (notification) =>
        notification.userEmail === user.email
    );

    setNotifications(myNotifications);
  }, [user]);

  return (
    <div>

      <div className="hero-section">
        <h1>Notifications</h1>
        <p>
          View all notifications and newly assigned tasks.
        </p>
      </div>

      <div className="panel">

  {notifications.length > 0 && (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "15px",
        marginRight:"10px"
      }}
    >
      <button
        className="delete-btn notification-clear-btn"
        onClick={() => {
          setSelectedNotification("ALL");
          setShowDeleteModal(true);
        }}
      >
        Clear All
      </button>
    </div>
  )}
      <div className="notifications-scroll-box">
        {notifications.length === 0 ? (

          <p
            style={{
              textAlign: "center",
              color: "#9ca3af",
              padding: "40px"
            }}
          >
            No notifications available.
          </p>

        ) : (
            <div className="notification-list">
          {notifications.map((notification) => (

            <div
              key={notification.id}
              className="notification-card"
            >

              <div
  style={{
    display: "flex",
    gap: "15px",
    alignItems: "flex-start",
  }}
>
  

  <div style={{ flex: 1 }}>

    <h3 className="notification-title">
      <LuBell size={22} />
      <span>{notification.title}</span>
      <span
  className={
    notification.isRead
      ? "read-badge"
      : "new-badge"
  }
>
  {notification.isRead ? "READ" : "NEW"}
</span>
</h3>
    <hr className="notification-divider" />

    <div className="notification-section">
      <p className="notification-label">Subject</p>
      <p className="notification-value">
        {notification.message}
      </p>
    </div>


    <div className="notification-footer">
      <div className="footer-item">
        
      </div>

      <div className="footer-item">
        <LuClock3 size={16} />
        <span>{notification.time}</span>
      </div>
    </div>
    <div className="notification-actions"
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  }}
>
  {!notification.isRead && (
    <button
      className="mark-read-btn"
      onClick={() => {
        const all =
          JSON.parse(localStorage.getItem("notifications")) || [];

        const updated = all.map((n) =>
          n.id === notification.id
            ? { ...n, isRead: true }
            : n
        );

        localStorage.setItem(
          "notifications",
          JSON.stringify(updated)
        );
        window.dispatchEvent(new Event("storage"));
        setNotifications(
          updated.filter(
            (n) => n.userEmail === user.email
          )
        );

        toast.success("Marked as read");
      }}
    >
      Mark as Read
    </button>
  )}

  <button
    className="delete-btn"
    onClick={() => {
      setSelectedNotification(notification);
      setShowDeleteModal(true);
    }}
  >
    Delete
  </button>
</div>
  </div>
  </div>
</div>



          ))}
          </div>
        )}
      </div>
      </div>
      <DeleteModal
  isOpen={showDeleteModal}
  title={
  selectedNotification === "ALL"
    ? "Clear All Notifications"
    : "Delete Notification"
}
  message={
  selectedNotification === "ALL"
    ? "Are you sure you want to clear all notifications?"
    : "Are you sure you want to delete this notification?"
}
  onCancel={() => setShowDeleteModal(false)}
 onConfirm={() => {
  const all =
    JSON.parse(localStorage.getItem("notifications")) || [];

  let updated = [];

  if (selectedNotification === "ALL") {
    updated = all.filter(
      (n) => n.userEmail !== user.email
    );

    toast.success("All notifications cleared!");
  } else {
    updated = all.filter(
      (n) => n.id !== selectedNotification.id
    );

    toast.success("Notification deleted!");
  }

  localStorage.setItem(
    "notifications",
    JSON.stringify(updated)
  );
  window.dispatchEvent(new Event("storage"));

  setNotifications(
    updated.filter(
      (n) => n.userEmail === user.email
    )
  );

  setSelectedNotification(null);
  setShowDeleteModal(false);
}}
/>
    </div>
  );
}

export default Notifications;