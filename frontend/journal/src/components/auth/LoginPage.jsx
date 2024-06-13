import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomerByEmailAndPassword } from "../../services/CustomerService";
import { toastError } from "../../services/ToastService";
import { ToastContainer } from "react-toastify";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await getCustomerByEmailAndPassword(email, password);
      const customerId = userData.data.id;
      console.log(userData.data);
      navigate(`/home/${customerId}`);
    } catch (error) {
      console.log(error);
      toastError("Login error. Check user credentials.");
    }
  };

  return (
    <>
      <div className="main__container">
        <div className="auth-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email: </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label>Password: </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button className="login__button" type="submit">
              Login
            </button>
          </form>
          <div className="redirection__link">
            <p className="registration__link">
              Don't have an account? <a href="/register">Register here</a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default LoginPage;
