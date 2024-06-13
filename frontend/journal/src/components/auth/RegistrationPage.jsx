import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerNewCustomer } from "../../services/CustomerService";
import { toastError, toastSuccess } from "../../services/ToastService";
import { ToastContainer } from "react-toastify";

function RegistrationPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerNewCustomer(formData);
      const customerId = response.data.id;
      console.log(response.data);
      toastSuccess("User registered successfully");
      navigate(`/home/${customerId}`);
    } catch (error) {
      console.error("Error registering user:", error);
      toastError("An error occurred while registering user.");
    }
  };

  return (
    <>
      <div className="main__container">
        <div className="auth-container">
          <h2>Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Firstname:</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                required
                placeholder="Enter your firstname"
              />
            </div>
            <div className="form-group">
              <label>Lastname:</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                required
                placeholder="Enter your lastname"
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>
            <button className="login__button" type="submit">
              Register
            </button>
          </form>
          <div className="redirection__link">
            <p className="registration__link">
              Already have an account? <a href="/login">Login here</a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default RegistrationPage;
