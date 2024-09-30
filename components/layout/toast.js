import React from 'react'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function Toast() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={1100}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        // className="toaster_style"

        />
    )
}

export default Toast