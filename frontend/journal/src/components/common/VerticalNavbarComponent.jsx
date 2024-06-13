import React, { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../images/Obligation.png";


function VerticalNavbarComponent() {
    const navigate = useNavigate();
    const [isUserMenuOpen, setUserMenuOpen] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { customerId } = useParams();
  
    const toggleUserMenu = () => {
      setUserMenuOpen(!isUserMenuOpen);
    };
  
    const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    };
  
    const handleLogout = () => {
      navigate("/login");
    };
  
    return (
      <div className="navbar-container">
        <div className="navbar-ver">
          <FaBars className="menu-icon-ver" onClick={toggleSidebar} />
          <div className="name-div-ver">
          <span>Priority Pilot</span>
          <img src={Logo} alt="Obligation.png" className="logo" />
          </div>
          <FaUser className="user-icon-ver" onClick={toggleUserMenu} />
          {isUserMenuOpen && (
            <div className="custom-menu-ver">
              <ul>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
        <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <div className="nav-links-sidebar">
            <Link to={`/home/${customerId}`} className="nav-link-ver" onClick={toggleSidebar}>Home</Link>
            <Link to={`/profile/${customerId}`} className="nav-link-ver" onClick={toggleSidebar}>Obligations</Link>
          </div>
        </div>
      </div>
    );
  }


export default VerticalNavbarComponent