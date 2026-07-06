import { useState, useEffect } from "react";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Collections from "./pages/Collections";
import Endpoints from "./pages/Endpoints";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import CreateCollection from "./pages/CreateCollection";
import AddEndpoint from "./pages/AddEndpoint";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Users from "./pages/Users";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notifications from "./pages/Notifications";
import SignUp from "./pages/SignUp";
import EditCollection from "./pages/EditCollection";
import ApiPlayground from "./pages/ApiPlayground";
import ApiDetails from "./pages/ApiDetails";
import EndpointDetails from "./pages/EndpointDetails";
import EditEndpoint from "./pages/EditEndpoint";
import AssignApi from "./pages/AssignApi";
function App() {
  
  const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("currentUser");
  return savedUser ? JSON.parse(savedUser) : null;
});

  const [darkMode, setDarkMode] = useState(false);
  const [systemOnline, setSystemOnline] = useState(true);
  const [search, setSearch] = useState("");
  
  const [assignedApis, setAssignedApis] = useState(
  JSON.parse(localStorage.getItem("assignedApis")) || []
);
 const [apiCollections, setApiCollections] = useState(() => {
  const saved = localStorage.getItem("apiCollections");

  if (saved) {
    return JSON.parse(saved);
  }

  return [];
});
const [activities, setActivities] = useState(() => {
  const saved = localStorage.getItem("activities");
  return saved ? JSON.parse(saved) : [];
});
  useEffect(() => {
  localStorage.setItem(
    "apiCollections",
    JSON.stringify(apiCollections)
  );
}, [apiCollections]);
useEffect(() => {
  localStorage.setItem(
    "activities",
    JSON.stringify(activities)
  );
}, [activities]);
console.log("Current user:", user);
if (!user) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login setUser={setUser} />}
        />

        <Route
          path="/login"
          element={<Login setUser={setUser} />}
        />

        <Route
          path="/signup"
          element={<SignUp />}
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />
    </BrowserRouter>
  );
}

  return (
    <BrowserRouter>
      <div className={darkMode ? "app dark-mode" : "app"}>
        <Navbar
          user={user}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          search={search}
          setSearch={setSearch}
        />

        <div className="main-layout">
          <Sidebar user={user} systemOnline={systemOnline} setUser={setUser} />

          <div className="content">
            <Routes>

              <Route
                path="/"
                element={
                  <Dashboard
                    user={user}
                    apiCollections={apiCollections}
                    systemOnline={systemOnline}
                    setSystemOnline={setSystemOnline}
                    activities={activities}
                    setActivities={setActivities}
                  />
                }
              />
            <Route
  path="/assign-api"
  element={
    <AssignApi
      user={user}
      apiCollections={apiCollections}
      assignedApis={assignedApis}
      setAssignedApis={setAssignedApis}
      setActivities={setActivities}
    />
  }
/>
              <Route
                path="/create-collection"
                element={
                  <CreateCollection
                    apiCollections={apiCollections}
                    setApiCollections={setApiCollections}
                    setActivities={setActivities}
                    
                  />
                }
              />

              <Route
                path="/collections"
                element={
                  <Collections
                    user={user}
                    apiCollections={apiCollections}
                    setApiCollections={setApiCollections}
                    search={search}
                    setActivities={setActivities}
                  />
                }
              />

              <Route
  path="/myapis"
  element={
    <Collections
      user={user}
      apiCollections={apiCollections}
      assignedApis={assignedApis}
    />
  }
/>

                <Route
  path="/edit-collection/:id"
  element={
    <EditCollection
      apiCollections={apiCollections}
      setApiCollections={setApiCollections}
      setActivities={setActivities}
    />
  }
/>

              <Route
                path="/analytics"
                element={
                  <Analytics
                    apiCollections={apiCollections}
                  />
                }
              />

              <Route
                path="/endpoints"
                element={<Endpoints apiCollections={apiCollections}
                user={user}
                 setApiCollections={setApiCollections}
                 search={search}
                 setActivities={setActivities}
                 />
                }
              />
            <Route
  path="/api/:id/endpoints"
  element={
    <Endpoints
      apiCollections={apiCollections}
      user={user}
      setApiCollections={setApiCollections}
      search={search}
      setActivities={setActivities}
    />
  }
/>

                <Route
  path="/add-endpoint"
  element={
    <AddEndpoint
    user={user}
      apiCollections={apiCollections}
      setApiCollections={setApiCollections}
      setActivities={setActivities}
    />
  }
/>
<Route
  path="/edit-endpoint/:id"
  element={
    <EditEndpoint
      apiCollections={apiCollections}
      setApiCollections={setApiCollections}
      setActivities={setActivities}
    />
  }
/>
<Route path="/ai-api-generator"
element={<ApiPlayground />}
/>
        <Route path="/api/:id"
        element={
          <ApiDetails apiCollections={apiCollections}
          user = {user}
          />
        }
        />
        
        <Route
  path="/endpoints/:id"
  element={
    <EndpointDetails
      apiCollections={apiCollections}
    />
  }
/>

              <Route
                path="/settings"
                element={
                  <Settings
                    user={user}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                  />
                }
              />
              <Route path="/users" element={<Users />}
              />
              <Route path="/notifications"
              element={<Notifications user={user} />}
              />
            </Routes>
          </div>
        </div>
      </div>
      <ToastContainer
  position="top-right"
  autoClose={3000}
  theme="dark"
/>
    </BrowserRouter>
  );
}

export default App;