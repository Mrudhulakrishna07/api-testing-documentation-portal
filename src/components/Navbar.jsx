import { useNavigate } from "react-router-dom";
import { FiSearch,FiUser } from "react-icons/fi";
import { useState } from "react";
import {BsRobot} from "react-icons/bs";
function Navbar({ search,setSearch, user }) {
  const navigate = useNavigate();
  
  return (
    <div className="navbar">
      <div>
        <h2>Management Portal</h2>
      </div>

      <div className="navbar-right">

       <div className="navbar-search">
  <FiSearch className="navbar-search-icon" />

  <input className="navbar-search-input"
  type="text"
  placeholder="Search APIs..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
</div>

        <button
  className="profile-badge"
  onClick={() =>navigate("/ai-api-generator")}
>
  
  <BsRobot size={24} />
</button>


        <div className="profile-section">

    <div className="profile-badge"
    onClick={() => navigate("/settings")}
    title="View Profile & Settings">
  <FiUser size={18} /> 
</div>
</div>

      </div>
    </div>
  );
}

export default Navbar;