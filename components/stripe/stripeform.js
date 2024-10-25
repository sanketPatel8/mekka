import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import CheckoutForm from './checkoutform';
import { useCurrency } from '@/app/context/currencyContext';

function Stripeform({RadioValue, closeModal,payableAmount,AddPersonAmount,fetchBookingDetails,closePaymentModal ,showStripeModal,paidData, subtotal ,  handleClose, amount, setPaidAmount,  setPaymentStatus,stripePromise,Booking,setBookingStage,setReservationID , reservation_id , AddpersonData }) {

  console.log(payableAmount, 'amount')

  const [newStripePromise, setNewStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const {currency} = useCurrency();

  const calculateTotalWithFee = (amount) => {
    const feePercentage = 0.03;
    const fee = amount * feePercentage; 
    return amount + fee; 
  };
  const getClientSecret = async () => {
    const api = axios.create({
      baseURL: 'https://api.stripe.com/v1/',
    });

    if (amount) {

    
      const newAmount = parseInt(amount) * 100; // Convert to cents
      const totalAmount = calculateTotalWithFee(newAmount); // Calculate total with fee
      console.log(totalAmount, 'totalAmount')
      const data = {
        "amount": Math.round(totalAmount),
        "currency": 'EUR',
        "payment_method_types[0]": 'card',
      }

      const res = await api.post('payment_intents', data, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`,
        },
      });

      if (res && res.data) {
        setClientSecret(res.data.client_secret);
      }
    } else if(payableAmount){
      const parseEuroAmount = (amountString) => {
        // Remove the thousands separator and replace the decimal separator
        const normalizedAmount = amountString.replace(/\./g, '').replace(',', '.');
        return parseFloat(normalizedAmount); // Convert to float
      };
    
      const parsedAmount = parseEuroAmount(payableAmount);
      console.log(parsedAmount) 
      const newAmount = parsedAmount * 100;

      const totalAmount = calculateTotalWithFee(newAmount); 
      console.log(totalAmount, 'totalAmount')
      const data = {
        "amount": Math.round(totalAmount),
        "currency": 'EUR',
        "payment_method_types[0]": 'card',
      }

      const res = await api.post('payment_intents', data, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`,
        },
      });

      if (res && res.data) {
        setClientSecret(res.data.client_secret);
      }

    } else if(AddPersonAmount){
      const newAmount = parseInt(AddPersonAmount) * 100; // Convert to cents
      const totalAmount = calculateTotalWithFee(newAmount); // Calculate total with fee
      console.log(totalAmount, 'totalAmount')
      const data = {
        "amount": Math.round(totalAmount),
        "currency": 'EUR',
        "payment_method_types[0]": 'card',
      }

      const res = await api.post('payment_intents', data, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`,
        },
      });

      if (res && res.data) {
        setClientSecret(res.data.client_secret);
      }

      
    }else{
      setClientSecret("");
    }
  }

  useEffect(() => {

    !stripePromise && setNewStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY));
  }, [stripePromise]);

  useEffect(() => {
    getClientSecret();
  }, [])
  return (
    clientSecret && <Elements stripe={stripePromise || newStripePromise} options={{ clientSecret }}>
      <CheckoutForm
        handleClose={handleClose}
        showStripeModal={showStripeModal}
        Booking={Booking}
        setBookingStage={setBookingStage}
        setReservationID={setReservationID}
        setPaidAmount={setPaidAmount}
        AddpersonData={AddpersonData}
        reservation_id={reservation_id}
        RadioValue={RadioValue}
        subtotal={subtotal}
        closeModal={closeModal}
        paidData = {paidData}
        closePaymentModal = {closePaymentModal}
        fetchBookingDetails={fetchBookingDetails}
        amount = {amount}
        payableAmount = {payableAmount}
        AddPersonAmount = {AddPersonAmount}
      />
    </Elements>
  )
}

export default Stripeform