import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const handleCreation = async () => {
    navigate(`/create/${customerId}`);
  };

  return (
    <header className="header">
      <div className="container">
        <span>Obligations</span>
        <button onClick={handleCreation} className="btn">
          <i className="bi bi-plus-square"></i> Add New
        </button>
      </div>
    </header>
  );
};

export default Header;
