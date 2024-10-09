import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/hooks/useAuthContext";
import { IoClose } from "react-icons/io5";
import { post } from "@/app/utils/api";
import { showErrorToast, showSuccessToast } from "@/app/utils/tost";
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
    maxWidth: "600px", // Adjust max-width as needed
    height: "60vh", // Set a specific height for the modal
    overflowY: "auto",
    backgroundColor: "#fff",
  },
};

export default function CheckoutForm({
  reservation_id,
  subtotal,
  AddpersonData,
  RadioValue,
  showStripeModal,
  handleClose,
  Booking,
  setBookingStage,
  setReservationID,
  setPaidAmount,
  closeModal,
}) {
  const { dispatch, customer } = useAuthContext();
  const stripe = useStripe();

  const elements = useElements();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const [cardDetails, setCardDetails] = useState({});

  const addBooking = async (transactionId, amount) => {
    const newBooking = {
      ...Booking,
      transaction_id: transactionId,
      amount_paid: amount,
    };

    try {
      const response = await post("addbooking", newBooking);
      if (response) {
        showSuccessToast("Booking successful");
        handleClose();
        router.push("#ref");
        setBookingStage(2);
        setReservationID(response.reservationNumber);
        setPaidAmount(amount);
        console.log(setPaidAmount, "setPaidAmount");
      }
    } catch (error) {
      console.error("Error caught:", error);
      showErrorToast(error);
    }
  };

  const FetchAddperson = async () => {
    const formData = new FormData();

    formData.append("reservation_id", reservation_id);
    formData.append("name", AddpersonData.name);
    formData.append("surname", AddpersonData.surname);
    formData.append("birthday", AddpersonData.birthDate);
    formData.append("gender", AddpersonData.gender);
    formData.append("nationality", AddpersonData.nationality);
    formData.append(
      "person_type",
      AddpersonData.roomType == "1"
        ? "adult"
        : AddpersonData.roomType == "2"
        ? "child"
        : "baby"
    );
    formData.append("title", RadioValue.title);
    formData.append("price", RadioValue.price);
    formData.append("additional_order", RadioValue.order);
    formData.append("total", subtotal);

    try {
      const response = await POST.request({
        form: formData,
        url: "addperson",
      });
      if (response?.Status == "1") {
        showSuccessToast("Person was added successfully !!");
        closeModal();
        handleClose();
        setTimeout(() => {
          window.location.reload(); 
        }, 3500);
      } else {
        showErrorToast(response?.Message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    if (Booking) {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_URL}/`,
        },
        redirect: "if_required",
      });
      if (error) console.log(error);
      if (
        error &&
        (error.type === "card_error" || error.type === "validation_error")
      ) {
        showErrorToast("Payment already succeeded");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log(paymentIntent, "paymentIntent");
        console.log(paymentIntent.id, "paymentIntent.id");
        const newAmount = paymentIntent.amount / 100;
        showSuccessToast("Payment successful");
        addBooking(paymentIntent.id, newAmount);
      }
    }
    if (AddpersonData) {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_URL}/`,
        },
        redirect: "if_required",
      });
      if (error) console.log(error);
      if (
        error &&
        (error.type === "card_error" || error.type === "validation_error")
      ) {
        showErrorToast("Payment already succeeded");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log(paymentIntent, "paymentIntent");
        console.log(paymentIntent.id, "paymentIntent.id");
        const newAmount = paymentIntent.amount / 100;
        showSuccessToast("Payment successful");
        FetchAddperson();
      }
    }

    setIsProcessing(false);
  };

  return (
    <Modal
      isOpen={showStripeModal}
      onRequestClose={handleClose}
      style={customStyles}
      contentLabel="Pending Payment Modal"
    >
      <button onClick={handleClose}>
        <IoClose size={20} />
      </button>

      <form
        className="position-relative"
        id="payment-form"
        onSubmit={handleSubmit}
      >
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
        <button
          className="button -sm -info-2 bg-accent-1 text-dark my-4  w-100"
          disabled={isProcessing || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Pay now"}
          </span>
        </button>
      </form>
    </Modal>
  );
}
