import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";

export const stripePromise = loadStripe(
  "pk_test_51KBEWgBlTfbXgfFB3lobAEuagRzrzjcO1fz1dlHx6X0qckRqw4it9S42AN5ykJHAUlRpL1MvOTCC3ilX3dgT3N7l00016Vs2EE"
);

const Payment = () => {
  const projectId = useParams().projectId;
  const donate = useParams().donate;

  const [clientSecret, setClientSecret] = useState("");

  const [secret, setSecret] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm projectId={projectId} donate={donate} />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
