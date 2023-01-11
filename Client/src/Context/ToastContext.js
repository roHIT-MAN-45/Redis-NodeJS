import { createContext } from "react";

// React Toastify
import { toast } from "react-toastify";

// React Toastify CSS
import "react-toastify/dist/ReactToastify.css";

// Toast Options
const ToastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export const ToastContext = createContext({
  showErrorToast: () => {},
});

export const ToastContextProvider = (props) => {
  const showErrorToast = (message) => {
    toast.error(message, ToastOptions);
  };
  return (
    <ToastContext.Provider value={{ showErrorToast: showErrorToast }}>
      {props.children}
    </ToastContext.Provider>
  );
};
