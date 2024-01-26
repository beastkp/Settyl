import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          exact
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
