import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Axios
import axios from "axios";

export const AuthContext = createContext({
  loginUser: () => {},
  userDetails: null,
  setUserDetails: () => {},
});

export const AuthContextProvider = (props) => {
  const [userDetails, setUserDetails] = useState(null);

  // Navigation instance
  const navigate = useNavigate();

  // Function to log user in
  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/v1/auth/login`,
        { email: email, password: password }
      );

      if (response.status === 200) {
        setUserDetails(response.data.user);

        // Setting user details inside local storage
        localStorage.setItem("userDetails", JSON.stringify(response.data.user));

        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loginUser: loginUser,
        userDetails: userDetails,
        setUserDetails: setUserDetails,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
