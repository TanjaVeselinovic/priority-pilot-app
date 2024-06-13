import axios from "axios";

const API_URL = "http://localhost:8080/customers";

export async function getAllCustomers() {
  return await axios.get(`${API_URL}/all`);
}

export async function getCustomerByEmailAndPassword(email, password) {
  return await axios.get(
    `${API_URL}/get?email=${encodeURIComponent(
      email
    )}&password=${encodeURIComponent(password)}`
  );
}

export async function registerNewCustomer(customer) {
  return await axios.post(`${API_URL}/add`, customer);
}
