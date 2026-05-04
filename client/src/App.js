import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DataEntry from "./pages/DataEntry";
import InstituteDashboard from "./pages/InstituteDashboard";
import NGODashboard from "./pages/NGODashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Institute only routes */}
      <Route
        path="/data-entry"
        element={
          <ProtectedRoute allowedRole="institute">
            <DataEntry />
          </ProtectedRoute>
        }
      />

      <Route
        path="/institute-dashboard"
        element={
          <ProtectedRoute allowedRole="institute">
            <InstituteDashboard />
          </ProtectedRoute>
        }
      />

      {/* NGO only route */}
      <Route
        path="/ngo-dashboard"
        element={
          <ProtectedRoute allowedRole="ngo">
            <NGODashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;