import axios from "axios";

const API_URL = "http://localhost:8080/obligations";

export async function deleteObligation(id) {
  return await axios.delete(`${API_URL}/${id}`);
}

export async function getObligation(id) {
  return await axios.get(`${API_URL}/${id}`);
}

export async function updateObligation(id, obligation) {
  return await axios.post(`${API_URL}/${id}`, obligation);
}

export async function getObligationsByCustomerId(customerId) {
  return await axios.get(`${API_URL}/customers/${customerId}/obligations`);
}

export async function createObligationForCustomer(
  customerId,
  obligationRequest
) {
  return await axios.post(
    `${API_URL}/customers/${customerId}/obligations`,
    obligationRequest
  );
}
