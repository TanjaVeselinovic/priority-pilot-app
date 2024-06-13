import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "../../services/ToastService";
import FooterComponent from "../common/FooterComponent ";
import NavbarComponent from "../common/NavbarComponent";
import {
  updateObligation,
  getObligation,
} from "../../services/ObligationService";

function UpdateObligation() {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const [obligation, setObligation] = useState({
    id: "",
    description: "",
    title: "",
    priority: "",
    due: "",
  });

  const { id } = useParams();

  const fetchObligation = async (id) => {
    try {
      const { data } = await getObligation(id);
      setObligation(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      toastError("Error fetching obligation.");
    }
  };

  const handleNavigation = () => {
    navigate(`/profile/${customerId}`);
  };

  const onChange = (event) => {
    setObligation({ ...obligation, [event.target.name]: event.target.value });
  };

  const onUpdateObligation = async (event) => {
    event.preventDefault();
    await updateObligation(id, obligation);
    fetchObligation(id);
    navigate(`/profile/${customerId}`);
    toastSuccess("Obligation updated.");
  };

  useEffect(() => {
    fetchObligation(id);
  }, [id]);

  return (
    <>
      <NavbarComponent />
      <div className="profile">
        <div className="main__container">
          <div className="auth-container">
            <h2>Update Obligation</h2>
            <form onSubmit={onUpdateObligation} className="form">
              <input
                type="hidden"
                defaultValue={obligation.id}
                name="id"
                required
              />
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  value={obligation.title || ""}
                  onChange={onChange}
                  name="title"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  type="text"
                  value={obligation.description || ""}
                  onChange={onChange}
                  name="description"
                  required
                />
              </div>
              <div className="form-group">
                <label>Due:</label>
                <input
                  type="datetime-local"
                  value={obligation.due || ""}
                  onChange={onChange}
                  name="due"
                  required
                />
              </div>
              <div className="form-group">
                <label>Priority:</label>
                <select
                  value={obligation.priority || ""}
                  onChange={onChange}
                  name="priority"
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
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
export default UpdateObligation;
