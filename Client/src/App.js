import React, { useContext, useEffect, useCallback } from "react";

// React Router
import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./Pages/HomePage";
import SocialPage from "./Pages/SocialPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";

// Context API
import { AuthContext } from "./Context/AuthContext";

// Private Route
import PrivateRoute from "./PrivateRoute/PrivateRoute";

// Components
import Wrapper from "./Components/Wrapper";
import Navbar from "./Components/Navbar";

// Axios
import axios from "axios";

const App = () => {
  // Accessing context function
  const { setUserDetails } = useContext(AuthContext);

  // Fetches current user
  const getCurrentUser = useCallback(
    async (userId) => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/user/${userId}`
      );
      if (response.status === 200) {
        setUserDetails(response.data.user);

        // Updating localstorage data
        localStorage.setItem("userDetails", JSON.stringify(response.data.user));
      }
    },
    [setUserDetails]
  );

  // Running when app loads for first time
  useEffect(() => {
    // Accessing local storage for userId
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    // If user details exists only then getting current user
    if (userDetails) {
      getCurrentUser(userDetails?._id);
    }
  }, [setUserDetails, getCurrentUser]);

  return (
    <Wrapper>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/social"
          element={
            <PrivateRoute>
              <SocialPage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Wrapper>
  );
};
export default App;
