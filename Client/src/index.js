import React from "react";
import ReactDOM from "react-dom/client";

// React Router
import { BrowserRouter as Router } from "react-router-dom";

// React Toastify
import { ToastContainer } from "react-toastify";

// React Toastify CSS
import "react-toastify/dist/ReactToastify.css";

// Context API 😁
import { AuthContextProvider } from "./Context/AuthContext";
import { ToastContextProvider } from "./Context/ToastContext";

// Entry Point 😉
import App from "./App";

// Global Styles 🎨
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      {/* Auth Context Provider  */}
      <AuthContextProvider>
        {/* Toast Context Provider  */}
        <ToastContextProvider>
          {/* APP */}
          <App />

          {/* Toast Container  */}
          <ToastContainer />
        </ToastContextProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
);
