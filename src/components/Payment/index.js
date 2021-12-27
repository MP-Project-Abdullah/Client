import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

import axios from "axios";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
export const stripePromise = loadStripe(
  "pk_test_51KBEWgBlTfbXgfFB3lobAEuagRzrzjcO1fz1dlHx6X0qckRqw4it9S42AN5ykJHAUlRpL1MvOTCC3ilX3dgT3N7l00016Vs2EE"
);

const Payment = () => {
    const [clientSecret, setClientSecret] = useState("");

  const [secret, setSecret] = useState("");


  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${process.env.REACT_APP_BASE_URL}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);


  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

//   const options = {
//     // passing the client secret obtained from the server
//     clientSecret: secret
//   };

//    const secretKey = async () => {
//     let res = await axios.post(
//       `${process.env.REACT_APP_BASE_URL}/create-payment-intent`,
//       {
//         items: "",
//       }
//     );
//     console.log(res.data.clientSecret);
//     setSecret(res.data.clientSecret);
//   };

//   useEffect(() => {
//     secretKey();
//   }, []);

//   const handleSubmit = async (event) => {
//     // We don't want to let default form submission happen here,
//     // which would refresh the page.
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       // Make sure to disable form submission until Stripe.js has loaded.
//       return;
//     }

//     const result = await stripe.confirmPayment({
//       //`Elements` instance that was used to create the Payment Element
//       elements,
//       confirmParams: {
//         return_url: "https://my-site.com/order/123/complete",
//       },
//     });

//     if (result.error) {
//       // Show error to your customer (for example, payment details incomplete)
//       console.log(result.error.message);
//     } else {
//       // Your customer will be redirected to your `return_url`. For some payment
//       // methods like iDEAL, your customer will be redirected to an intermediate
//       // site first to authorize the payment, then redirected to the `return_url`.
//     }
//   };

  return (
    // <Elements options={options}>
    //   <form onSubmit={handleSubmit}>
    //     <PaymentElement />
    //     <button disabled={!stripe}>Submit</button>
    //   </form>
    // </Elements>
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Payment;

// export default function InjectedCheckoutForm() {
//     return (
//       <ElementsConsumer>
//         {({stripe, elements}) => (
//           <CheckoutForm stripe={stripe} elements={elements} />
//         )}
//       </ElementsConsumer>
//     )
//   }
