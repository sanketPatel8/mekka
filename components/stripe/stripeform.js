import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import CheckoutForm from './checkoutform';
import { useCurrency } from '@/app/context/currencyContext';

function Stripeform({RadioValue, showStripeModal, subtotal ,  handleClose, amount, setPaidAmount,  setPaymentStatus,stripePromise,Booking,setBookingStage,setReservationID , reservation_id , AddpersonData }) {
  console.log(amount, 'amount')
  const [newStripePromise, setNewStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const {currency} = useCurrency();
  console.log(currency, 'currency')
  const getClientSecret = async () => {
    const api = axios.create({
      baseURL: 'https://api.stripe.com/v1/',
    });

    if (amount) {

    
        const newAmount = parseInt(amount) * 100;

      const data = {
        "amount": Math.round(newAmount),
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
    } else {
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
      />
    </Elements>
  )
}

export default Stripeform