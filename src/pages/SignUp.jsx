import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleSignup = () => {
    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      toast.warning("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const alreadyExists = users.find(
      (user) => user.email === email
    );

    if (alreadyExists) {
      toast.error("Email already exists.");
      return;
    }

    users.push({
      id: Date.now(),
      name: fullName,
      email,
      password,
      role: "User",
      status: "Online",
      lastSeen:null,
    });

    localStorage.setItem(
  "users",
  JSON.stringify(users)
);

const newUser = {
...users[users.length - 1], 
role:"User",
};

localStorage.setItem(
  "currentUser",
  JSON.stringify(newUser)
);

toast.success("Account created successfully!");

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

          <h2>Create your account</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
          />

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
              type={
                showPassword ? "text" : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              style={{
                paddingRight: "48px",
              }}
            />

            <span
              onClick={() =>
                setShowPassword(!showPassword)
              }
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#9ca3af",
              }}
            >
              {showPassword ? (
                <LuEyeOff size={20} />
              ) : (
                <LuEye size={20} />
              )}
            </span>
          </div>

          <div
            style={{
              position: "relative",
              marginBottom: "18px",
            }}
          >
            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              style={{
                paddingRight: "48px",
              }}
            />

            <span
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#9ca3af",
              }}
            >
              {showConfirmPassword ? (
                <LuEyeOff size={20} />
              ) : (
                <LuEye size={20} />
              )}
            </span>
          </div>

          <button
            className="login-btn"
            onClick={handleSignup}
          >
            Create Account
          </button>

          <p
            style={{
              textAlign: "center",
              marginTop: "20px",
              color: "#d1d5db",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#ffffff",
                textDecoration: "underline",
                fontWeight: "600",
              }}
            >
              Sign In
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default SignUp;