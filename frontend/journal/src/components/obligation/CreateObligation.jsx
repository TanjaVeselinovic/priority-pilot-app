import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createObligationForCustomer } from "../../services/ObligationService";
import FooterComponent from "../common/FooterComponent ";
import NavbarComponent from "../common/NavbarComponent";
import { toastError, toastSuccess } from "../../services/ToastService";
import { ToastContainer } from "react-toastify";

function CreateObligation() {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const [values, setValues] = useState({
    id: "",
    description: "",
    title: "",
    priority: "",
    due: "",
  });

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleNavigation = () => {
    navigate(`/profile/${customerId}`);
  };

  const handleNewContact = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (
        values.priority === "low" ||
        values.priority === "medium" ||
        values.priority === "high"
      ) {
        data = await createObligationForCustomer(customerId, values);
      } else {
        console.log("Invalid priority");
        toastError("Select priority");
        return;
      }

      const formData = new FormData();
      formData.append("id", data.id);

      setValues({
        description: "",
        title: "",
        priority: "",
        due: "",
      });
      toastSuccess("Obligation created.");
      navigate(`/profile/${customerId}`);
    } catch (error) {
      console.log(error);
      toastError("Error creating obligations.");
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="profile">
        <div className="main__container">
          <div className="auth-container">
            <h2>New Obligation</h2>
            <form onSubmit={handleNewContact} className="form">
              <div className="user-details">
                <div className="form-group">
                  <label>Title:</label>
                  <input
                    type="text"
                    value={values.title || ""}
                    onChange={onChange}
                    name="title"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <textarea
                    type="text"
                    value={values.description || ""}
                    onChange={onChange}
                    name="description"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Due:</label>
                  <input
                    type="datetime-local"
                    value={values.due || ""}
                    onChange={onChange}
                    name="due"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Priority:</label>
                  <select
                    value={values.priority || ""}
                    onChange={onChange}
                    name="priority"
                    required
                  >
                    <option value="0">Chose priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div className="form__footer">
                <button className="btn" type="submit">
                  Save
                </button>
                <button
                  onClick={handleNavigation}
                  className="btn-danger"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <FooterComponent />
      <ToastContainer />
    </>
  );
}

export default CreateObligation;
