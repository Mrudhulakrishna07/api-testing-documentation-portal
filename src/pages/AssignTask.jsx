import { useState, useEffect } from "react";
import { LuPlus, LuSearch, LuPencil, LuTrash2 } from "react-icons/lu";
import { toast } from "react-toastify";

function AssignTask() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved):
     [];
  });

  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    recipient: "",
    subject: "",
    priority: "Medium",
    dueDate: "",
    status: "Pending",
    description: ""
  });

  useEffect(() => {
    const savedUsers =
      JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const saveTask = () => {
    if (
      !formData.recipient ||
      !formData.subject ||
      !formData.dueDate ||
      !formData.description
    ) {
      toast.warning("Please fill all fields.");
      return;
    }

    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id
            ? { ...formData, id: editingTask.id }
            : task
        )
      );

      toast.success("Task updated successfully!");
    } else {
      const taskId = Date.now();

const newTask = {
  ...formData,
  id: taskId
};

setTasks([...tasks, newTask]);

const notifications = JSON.parse(localStorage.getItem("notifications")) || [];

notifications.push({
  id: taskId,
  recipient: formData.recipient,
  title: "New Task Assigned",
  message: formData.subject,
  description: formData.description,
  dueDate: formData.dueDate,
  status: "Unread",
  time: new Date().toLocaleString(),
});

localStorage.setItem(
  "notifications",
  JSON.stringify(notifications)
);

toast.success("Task assigned successfully!");

    }

    setEditingTask(null);

    setFormData({
      recipient: "",
      subject: "",
      priority: "Medium",
      dueDate: "",
      status: "Pending",
      description: ""
    });
  };

  const editTask = (task) => {
    setEditingTask(task);
    setFormData(task);
  };

  const deleteTask = (id) => {

  const taskToDelete = tasks.find(task => task.id === id);

  const updatedTasks = tasks.filter(task => task.id !== id);

  setTasks(updatedTasks);

  localStorage.setItem(
    "tasks",
    JSON.stringify(updatedTasks)
  );

  let notifications =
    JSON.parse(localStorage.getItem("notifications")) || [];

  notifications = notifications.filter(
    notification =>
      !(
        notification.recipient === taskToDelete.recipient &&
        notification.message === taskToDelete.subject &&
        notification.description === taskToDelete.description
      )
  );

  localStorage.setItem(
    "notifications",
    JSON.stringify(notifications)
  );

  toast.success("Task deleted successfully!");
};

  const filteredTasks = tasks.filter((task) => {
  const subject = task.subject || "";
  const recipient = task.recipient || "";

  return (
    subject.toLowerCase().includes(search.toLowerCase()) ||
    recipient.toLowerCase().includes(search.toLowerCase())
  );
});

  return (
    <div>

      <div className="hero-section">
        <h1>Assign Task</h1>
        <p>
          Assign project tasks to users and monitor work progress.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px"
        }}
      >
        <div
          style={{
            position: "relative",
            width: "300px"
          }}
        >
          <LuSearch
            style={{
              position: "absolute",
              left: "12px",
              top: "12px"
            }}
          />

          <input
            className="search-input"
            style={{ paddingLeft: "40px" }}
            placeholder="Search tasks..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>
      </div>

      <div className="panel">

        <h2 style={{ marginBottom: "20px" }}>
          {editingTask
            ? "Edit Task"
            : "Assign New Task"}
        </h2>

        <label>Recipient</label>

        <select
          name="recipient"
          value={formData.recipient}
          onChange={handleChange}
        >
          <option value="">
            Select User
          </option>

          {users.map((user) => (
            <option
              key={user.name}
              value={user.name}
            >
              {user.name}
            </option>
          ))}
        </select>

        <label>Task Subject</label>

        <input
          type="text"
          name="subject"
          placeholder="Enter task subject"
          value={formData.subject}
          onChange={handleChange}
        />

        <label>Priority</label>

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>

        <label>Due Date</label>

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />

        <label>Description</label>

        <textarea
          rows="5"
          name="description"
          placeholder="Enter task details..."
          value={formData.description}
          onChange={handleChange}
        />

        <button
          className="action-btn"
          style={{
            marginTop: "20px",
            width: "100%"
          }}
          onClick={saveTask}
        >
          <LuPlus />
          {editingTask
            ? " Update Task"
            : " Assign Task"}
        </button>
            
      </div>
      <div style={{ height: "30px" }}></div>

      <div className="panel">

        <h2 style={{ marginBottom: "20px" }}>
          Assigned Tasks
        </h2>

        <table className="user-table">

          <thead>
            <tr>
              <th>Recipient</th>
              <th>Subject</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {tasks.length === 0 ? (
    <tr>
      <td
        colSpan="6"
        style={{
          textAlign: "center",
          padding: "30px",
          color: "#9ca3af",
        }}
      >
        No tasks assigned yet.
      </td>
    </tr>

  ) : (

    filteredTasks.map((task) => (
                <tr key={task.id}>

                  <td>{task.recipient}</td>

                  <td>{task.subject}</td>

                  <td>

                    <span
                      className={
                        task.priority === "Critical"
                          ? "offline-badge"
                          : task.priority === "High"
                          ? "delete-badge"
                          : task.priority === "Medium"
                          ? "put-badge"
                          : "online-badge"
                      }
                    >
                      {task.priority}
                    </span>

                  </td>

                  <td>{task.dueDate}</td>

                  <td>

                    <span className="online-badge">
                      {task.status}
                    </span>

                  </td>

                  <td>

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                      }}
                    >

                      <button
                        className="table-btn edit-btn"
                        onClick={() => editTask(task)}
                      >
                        <LuPencil />
                      </button>

                      <button
                        className="table-btn delete-btn"
                        onClick={() => deleteTask(task.id)}
                      >
                        <LuTrash2 />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AssignTask;