import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./components/auth/LoginPage";
import ProfilePage from "./components/obligation/ProfilePage";
import RegistrationPage from "./components/auth/RegistrationPage";
import UpdateObligation from "./components/obligation/UpdateObligation";
import CreateObligation from "./components/obligation/CreateObligation";
import HomePage from "./components/HomePage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="content">
          <Routes>
            <Route exact path="/home/:customerId" element={<HomePage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/profile/:customerId" element={<ProfilePage />} />
            <Route path="/create/:customerId" element={<CreateObligation />} />
            <Route
              path="/update-obligation/:id/:customerId"
              element={<UpdateObligation />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
