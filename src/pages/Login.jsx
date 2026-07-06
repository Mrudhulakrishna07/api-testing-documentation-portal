import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";
function Login({ setUser, portal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

const handleLogin = () => {
  console.log("Login button clicked");
  if (!email || !password) {
  toast.warning("Please enter email and password.");
  return;
}

  let users = JSON.parse(localStorage.getItem("users"));

if (!users || users.length === 0) {
  users = [
    {
      id: 1,
      name: "Admin",
      email: "admin@company.com",
      password: "admin123",
      role: "Admin",
      status: "Active",
      online: false,
    },
    {
      id: 2,
      name: "Mrudhulakrishna S",
      email: "krishna@gmail.com",
      password: "krishna123",
      role: "User",
      status: "Active",
      online: false,
    },
  ];

  localStorage.setItem("users", JSON.stringify(users));
}
  
  const foundUser = users.find(
    (user) =>
      user.email === email &&
      user.password === password
  );
const updatedUsers = users.map((u) =>
  u.email === foundUser.email
    ? {
        ...u,
        status: "Online",
        lastSeen:null,
      }
    : u
);

localStorage.setItem(
  "users",
  JSON.stringify(updatedUsers)
);

const loggedInUser = updatedUsers.find(
  (u) => u.email === foundUser.email
);

  if (!foundUser) {
  toast.error("Invalid email or password.");
  return;
}




localStorage.setItem(
  "users",
  JSON.stringify(updatedUsers)
);



localStorage.setItem(
  "currentUser",
  JSON.stringify(loggedInUser)
);

toast.success("Login successful!");

setUser(loggedInUser);

window.location.href = "/";
};
  return (
    <div className="login-page">

      <div className="login-wrapper">

        <h1 className="portal-title">
          API Documentation Portal
        </h1>

        <p className="portal-subtitle">
          Securely manage and organize your APIs
        </p>

        <div className="login-card">
          <h2>Sign in to your account</h2>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <div
  style={{
    position: "relative",
    marginBottom: "18px",
  }}
>
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    style={{ paddingRight: "48px" }}
  />

  <span
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: "absolute",
      right: "15px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#9ca3af",
    }}
  >
    {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
  </span>
</div>
          <div className="login-options">

  <label className="remember-me">
    <input type="checkbox" />
    <span>Remember me</span>
  </label>

  <a href="#" className="forgot-password">
    Forgot Password?
  </a>

</div>
          <button
  className="login-btn"
  onClick={handleLogin}
>
  Sign In
</button>
<p
  style={{
    textAlign: "center",
    marginTop: "20px",
    color: "#d1d5db",
  }}
>
  Don't have an account?{" "}
  <Link
    to="/signup"
    style={{
      color: "#ffffff",
      fontWeight: "600",
      textDecoration: "underline",
    }}
  >
    Sign Up
  </Link>
</p>
        </div>

      </div>

    </div>
  );
}

export default Login;