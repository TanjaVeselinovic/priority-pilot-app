import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarComponent from "./common/NavbarComponent";
import FooterComponent from "./common/FooterComponent ";
import Logo from "../images/Obligation.png";
function HomePage() {
  const { customerId } = useParams();
  const navigate = useNavigate();

  const handleRedirection = () => {
    navigate(`/profile/${customerId}`);
  };
  return (
    <>
      <NavbarComponent />
      <div className="home-page">
        <div className="auth-container">
          <h3>Welcome to Priority Pilot!</h3>
          <div className="home-image">
            <img src={Logo} alt="Obligation.png"></img>
          </div>
          <button onClick={handleRedirection} className="btn">
            Go to Obligations
          </button>
        </div>
      </div>
      <FooterComponent />
    </>
  );
}

export default HomePage;
