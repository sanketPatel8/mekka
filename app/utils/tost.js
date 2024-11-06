// utils/toast.js
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const showSuccessToast = (translate,messageKey) => {

  console.log("translate in tost file " , translate);
  
  const message = translate(messageKey);

  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    zIndex: 9999,
  });
};

export const showErrorToast = (translate,messageKey) => {
  const message = translate(messageKey);

  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    zIndex: 10000,
  });
};
