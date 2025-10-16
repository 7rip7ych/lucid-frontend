import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Index from "./views/Index";
import Doc from "./views/Doc";
import Login from "./views/Login";
import Register from "./views/Register";
import Logout from "./views/components/Logout";
import auth from "./views/models/auth";

export default function App() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/lucid-frontend/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/lucid-frontend/login" element={<Login  />} />
            <Route path="/lucid-frontend/logout" element={<Logout />} />
            <Route path="/lucid-frontend/register" element={<Register />} />
            <Route path="/lucid-frontend/:id" element={<ProtectedRoute><Doc /></ProtectedRoute>} />
        </Routes>
    </BrowserRouter>
    );
}

function ProtectedRoute({ children }) {
  const token = auth.token;

  if (!token) {
    return <Navigate to="/lucid-frontend/login" replace />;
  }

  return children;
}
