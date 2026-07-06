import { useState, useEffect } from "react";
import {
  LuPlus,
  LuPencil,
  LuTrash2,
  LuSearch,
  LuX
} from "react-icons/lu";
import { toast } from "react-toastify";

function Users() {

  const defaultUsers = [
    {
      id: 1,
      name: "Admin",
      email: "admin@company.com",
      password: "admin123",
      role: "Admin",
      status: "Active"
    },
    
    {
      id: 2,
      name: "Mrudhulakrishna S",
      email: "krishna@gmail.com",
      password: "krishna123",
      role: "User",
      status: "Active"
    }
  ];

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : defaultUsers;
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [userToDelete, setUserToDelete] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
    status: "Active"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const openAddModal = () => {
    setEditingUser(null);

    setFormData({
      name: "",
      email: "",
      role: "User",
      status: "Active"
    });

    setShowModal(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData(user);
    setShowModal(true);
  };

  const saveUser = () => {

    if (!formData.name || !formData.email || !formData.password)
      return toast.warning("Please fill all fields.");

    if (editingUser) {

      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? formData : user
        )
      );
      toast.success("User updated successfully!");
    } else {

      setUsers([
        ...users,
        {
          ...formData,
          id: Date.now()
        }
      ]);
      toast.success("User added successfully!");
    }

    setShowModal(false);
  };

 const deleteUser = () => {

  setUsers(
    users.filter(
      (user) => user.id !== userToDelete.id
    )
  );

  toast.success("User deleted successfully!");

  setShowDeleteModal(false);
  setUserToDelete(null);
};

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
       
      <div className="hero-section">
        <h1>User Management</h1>
        <p>Manage platform users and assign roles.</p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          gap: "15px"
        }}
      >

        <div
          style={{
            position: "relative",
            width: "320px",
            marginTop: "20px"
          }}
        >

          <LuSearch
  style={{
    position: "absolute",
    left: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9ca3af"
  }}
/>

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
            style={{ paddingLeft: "38px" }}
          />

        </div>
            
        <button
          className="action-btn"
          onClick={openAddModal}
        >
          <LuPlus />
          Add User
        </button>

      </div>

      <div className="panel">

        <table className="user-table">

          <thead>

            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredUsers.map((user) => (

              <tr key={user.id}>

                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>{user.role}</td>

                <td>
                  <span className="online-badge">
                    {user.status}
                  </span>
                </td>

                <td>

                  <button
                    className="table-btn edit-btn"
                    onClick={() => openEditModal(user)}
                  >
                    <LuPencil />
                  </button>

                  <button
                    className="table-btn delete-btn"
                    onClick={() => {
  setUserToDelete(user);
  setShowDeleteModal(true);
}}
                  >
                    <LuTrash2 />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
      {showModal && (
        <div className="modal-overlay">

          <div className="user-modal">

            <div className="modal-header">

              <h2>
                {editingUser ? "Edit User" : "Add New User"}
              </h2>

              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                <LuX size={22} />
              </button>

            </div>

            <div className="modal-body">

              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
              />

              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />

                <label>Password</label>

<input
  type="password"
  name="password"
  placeholder="Enter password"
  value={formData.password}
  onChange={handleChange}
/>

              <label>Role</label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option>Admin</option>
                <option>User</option>
<option value="Developer">Developer</option>
<option value="Tester">Tester</option>
<option value="Technical Writer">Technical Writer</option>
<option value="Viewer">Viewer</option>
              </select>

              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>

            </div>

            <div className="modal-footer">

              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={saveUser}
              >
                {editingUser ? "Update User" : "Add User"}
              </button>

            </div>

          </div>

        </div>
      )}
        {showDeleteModal && (

<div className="modal-overlay">

  <div className="delete-modal">

    <h2>Delete User</h2>

    <p>
      Are you sure you want to delete
      <br />
      <strong>{userToDelete?.name}</strong>?
    </p>

    <div className="modal-actions">

      <button
        className="cancel-btn"
        onClick={()=>{
          setShowDeleteModal(false);
          setUserToDelete(null);
        }}
      >
        Cancel
      </button>

      <button
        className="delete-confirm-btn"
        onClick={deleteUser}
      >
        Delete
      </button>

    </div>

  </div>

</div>

)}
    </div>
  );
}

export default Users;