import React, { useState } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import Logo from "../../images/Obligation.png";

function Navbar() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar">
        <span>Priority Pilot </span>
        <img src={Logo} alt="Obligation.png"></img>
        <div className="nav-icons">
        <div className="nav-links">
        <NavLink to={`/home/${customerId}`} className="nav-link" >Home</NavLink>
        <NavLink to={`/profile/${customerId}`} className="nav-link" >Obligations</NavLink>
        </div>
          <FaUser className="user-icon" onClick={toggleUserMenu} />
          {isUserMenuOpen && (
            <div className="custom-menu">
              <ul>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;

