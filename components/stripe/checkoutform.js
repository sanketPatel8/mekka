import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useAuthContext } from "@/app/hooks/useAuthContext";
import { POST } from "@/app/utils/api/post";
const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "40%",
      right: "auto",
      bottom: "auto",
      marginLeft: "10%",
      transform: "translate(-50%, -50%)",
      padding: "10px",
      // borderRadius: '10px',
      width: "100%", // Adjust width as needed
      maxWidth: "700px", // Adjust max-width as needed
      height: "50vh", // Set a specific height for the modal
      overflowY: "auto",
      backgroundColor: "#fff",
    },
  };
  
export default function CheckoutForm({  showStripeModal, handleClose,   }) {
    const { dispatch, customer } = useAuthContext();
    const stripe = useStripe();

    const elements = useElements();

    const [isProcessing, setIsProcessing] = useState(false);
    const [saveCard, setSaveCard] = useState(false);
    const [cardDetails, setCardDetails] = useState({});






    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);




            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${process.env.NEXT_PUBLIC_URL}/`,
                },
                redirect: "if_required",
            });
            if (error) console.log(error);
            if (error && (error.type === "card_error" || error.type === "validation_error")) {
                toast.error("Payment already succeeded");
            } else if (paymentIntent && paymentIntent.status === "succeeded") {
                toast.success("Payment successful");
                handleClose();
            }
   

        setIsProcessing(false);
    };

    return (

        <Modal  isOpen={showStripeModal}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Pending Payment Modal">

            



                <form className="position-relative" id="payment-form" onSubmit={handleSubmit}>
                    <PaymentElement id="payment-element" />

                    {/* <div className="mb-3">
                                <input
                                    type="checkbox"
                                    id="save-card"
                                    name="save-card"
                                    value={saveCard}
                                    onChange={(e) => setSaveCard(e.target.checked)}
                                />
                                <label htmlFor="save-card">Save card for future purchases</label>
                            </div> */}
                    <button className="py-3 my-4 vendorBtn fw_700 b4 w-100" disabled={isProcessing || !stripe || !elements} id="submit">
                        <span id="button-text">{isProcessing ? "Processing ... " : "Pay now"}</span>
                    </button>

                </form>


          

        </Modal>
    )


}
