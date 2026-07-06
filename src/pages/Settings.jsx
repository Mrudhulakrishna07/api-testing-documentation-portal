import { useState } from "react";
import { toast } from "react-toastify";

function Settings({ user }) {
  const isAdmin = user?.role === "Admin";

  const [name, setName] = useState(
    localStorage.getItem(`profileName_${user.email}`) || user.name
  );

  const [email, setEmail] = useState(
    localStorage.getItem(`profileEmail_${user.email}`) ||
      (user.role === "Admin"
        ? "admin@company.com"
        : user.email)
  );
  const [showSaveModal, setShowSaveModal] = useState(false);
const [showRemoveModal, setShowRemoveModal] = useState(false);

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem(`profileImage_${user.email}`) || ""
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setProfileImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
  setShowRemoveModal(true);
};

const confirmRemove = () => {
  setShowRemoveModal(false);

  toast.warning("Removing profile picture...");

  localStorage.removeItem(`profileImage_${user.email}`);
  setProfileImage("");

  setTimeout(() => {
    toast.success("Profile picture removed successfully!");

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }, 700);
};
  
  const saveProfile = () => {
  setShowSaveModal(true);
};

const confirmSave = () => {
  setShowSaveModal(false);

  toast.warning("Saving profile changes...");

  localStorage.setItem(`profileName_${user.email}`, name);
  localStorage.setItem(`profileEmail_${user.email}`, email);
  localStorage.setItem(`profileImage_${user.email}`, profileImage);

  setTimeout(() => {
    toast.success("Profile updated successfully!");

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }, 700);
};

  return (
    <div>
      <div className="hero-section">
        <h1>Profile Settings</h1>
        <p>Manage your profile information.</p>
      </div>

      <div className="panel">
        <div className="profile-picture-section">

          <div className="profile-preview">
            {profileImage ? (
              <img src={profileImage} alt="Profile" />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </div>

          <div
            className="profile-buttons"
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "15px",
              justifyContent: "center",
            }}
          >
            <label className="upload-btn">
              {profileImage ? "Change Photo" : "Upload Photo"}

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
            </label>

            {profileImage && (
              <button
                className="remove-btn"
                onClick={removeImage}
              >
                Remove
              </button>
            )}
          </div>
        </div>

        <div className="settings-form">

          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Role</label>
          <input
            type="text"
            value={isAdmin ? "Administrator" : "User"}
            readOnly
          />

          <label>Department</label>
          <input
            type="text"
            value={
              isAdmin
                ? "API Management"
                : "Frontend Development"
            }
            readOnly
          />

          <button
            className="save-btn"
            onClick={saveProfile}
          >
            Save Changes
          </button>

        </div>
      </div>
      {showSaveModal && (
  <div className="modal-overlay">
    <div className="confirm-modal">
      <h2>Save Changes</h2>

      <p>
        Are you sure you want to save the changes to your profile?
      </p>

      <div className="modal-buttons">
        <button
          className="cancel-btn"
          onClick={() => setShowSaveModal(false)}
        >
          Cancel
        </button>

        <button
          className="confirm-btn"
          onClick={confirmSave}
        >
          Yes, Save
        </button>
      </div>
    </div>
  </div>
)}
{showRemoveModal && (
  <div className="modal-overlay">
    <div className="confirm-modal">
      <h2>Remove Picture</h2>

      <p>
        Are you sure you want to remove your profile picture?
      </p>

      <div className="modal-buttons">
        <button
          className="cancel-btn"
          onClick={() => setShowRemoveModal(false)}
        >
          Cancel
        </button>

        <button
          className="confirm-btn danger"
          onClick={confirmRemove}
        >
          Yes, Remove
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default Settings;