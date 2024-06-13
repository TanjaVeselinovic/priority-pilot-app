import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toastError, toastSuccess } from "../../services/ToastService";
import { ToastContainer } from "react-toastify";
import Modal from "react-modal";
import NavbarComponent from "../common/NavbarComponent";
import FooterComponent from "../common/FooterComponent ";
import HeaderComponent from "../common/HeaderComponent";
import {
  getObligationsByCustomerId,
  deleteObligation,
} from "../../services/ObligationService";

Modal.setAppElement("#root");

function ProfilePage() {
  const [obligations, setObligations] = useState([]);
  const { customerId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [deletingObligationId, setDeletingObligationId] = useState(null);

  const fetchObligations = async () => {
    try {
      const response = await getObligationsByCustomerId(customerId);
      if (Array.isArray(response.data)) {
        const sortedObligations = response.data.sort((a, b) => {
          if (a.priority === "high") return -1;
          if (b.priority === "high") return 1;
          if (a.priority === "medium" && b.priority !== "high") return -1;
          if (b.priority === "medium" && a.priority !== "high") return 1;
          return 0;
        });
        setObligations(response.data);
      } else {
        console.error("Invalid obligations data:", response.data);
        toastError("Invalid obligations data.");
      }
    } catch (error) {
      console.error("Error fetching obligations:", error);
      toastError("Error fetching obligations.");
    }
  };

  useEffect(() => {
    fetchObligations();
  }, [customerId]);

  const handleConfirmDelete = async () => {
    try {
      await deleteObligation(deletingObligationId);
      fetchObligations();
      toastSuccess("Obligation deleted.");
      setShowModal(false);
    } catch (error) {
      toastError("Error deleting obligation.");
      console.error("Error deleting obligation:", error);
    }
  };

  const handleDeletingObligation = (id) => {
    setDeletingObligationId(id);
    setShowModal(true);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  return (
    <>
      <NavbarComponent />
      <HeaderComponent />
      <div className="obligation-management-container">
        {obligations.length === 0 ? (
          <p className="no-obligations">
          There are no current obligations. Please add a new obligation.
          </p>
        ) : (
          <div className="obligation-cards">
            {obligations.map((obligation) => (
              <div key={obligation.id} className="obligation-card">
                <h3>{obligation.title}</h3>
                <div className="card-priority">
                  <p
                    style={{
                      color:
                        obligation.priority === "high"
                          ? "var(--radical-red)"
                          : obligation.priority === "low"
                          ? "var(--light-gray)"
                          : "var(--selective-blue)",
                    }}
                  >
                    <i className="bi bi-exclamation-circle"></i>{" "}
                    {obligation.priority}
                  </p>
                </div>
                <p className="card-desc">{obligation.description}</p>
                <div className="card-actions">
                  <p>
                    <i className="bi bi-calendar-date"></i>{" "}
                    {new Date(obligation.due).toLocaleString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p>
                    <i className="bi bi-clock"></i>{" "}
                    {new Date(obligation.due).toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: false,
                    })}
                  </p>
                </div>
                <div className="card-actions">
                  <button className="btn">
                    <Link
                      to={`/update-obligation/${obligation.id}/${customerId}`}
                    >
                      <i className="bi bi-pencil"></i> Update
                    </Link>
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => handleDeletingObligation(obligation.id)}
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/*
          <div className="obligation-management-container">
        {obligations.length === 0 ? (
          <p className="no-obligations">
            No obligations. Please add a new obligation.
          </p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
                <th>Time</th>
                <th>Priority</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {obligations.map((obligation) => (
                <tr key={obligation.id}>
                  <td className="td-name">{obligation.title}</td>
                  <td className="td-content">{obligation.description}</td>
                  <td className="td-due">
                    {new Date(obligation.due).toLocaleString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="td-time">
                    {new Date(obligation.due).toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: false,
                    })}
                  </td>
                  <td
                    className="td-priority"
                    style={{
                      color:
                        obligation.priority === "high"
                          ? "var(--radical-red)"
                          : obligation.priority === "low"
                          ? "var( --light-gray)"
                          : "var(--selective-blue)",
                    }}
                  >
                    {obligation.priority}
                  </td>
                  <td className="td-actions">
                    <button className="btn">
                      <Link
                        to={`/update-obligation/${obligation.id}/${customerId}`}
                      >
                        <i className="bi bi-pencil"></i> Update
                      </Link>
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => handleDeletingObligation(obligation.id)}
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
*/}
      <FooterComponent />
      <Modal
        isOpen={showModal}
        onRequestClose={handleCancelDelete}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Delete</h2>
        <p>Are you sure you want to delete this obligation?</p>
        <div className="delete-container">
          <button onClick={handleConfirmDelete} className="btn">
            Yes
          </button>
          <button onClick={handleCancelDelete} className="btn-danger">
            No
          </button>
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default ProfilePage;
