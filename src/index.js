import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./reducers/index";
import { Provider } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./components/Payment";
// import PaumentTest from "./components/paymentTest"
import Payment from "./components/Payment"
// import {InjectedCheckoutForm} from "./components/Payment"
ReactDOM.render(
  <Provider store={store}>
  <Elements stripe={stripePromise} 
  // options={options}
  >
    {/* <Elements> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Elements>
    </Provider>,

  document.getElementById("root")
);
