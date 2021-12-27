import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./reducers/index";
import { Provider } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./components/Payment";
ReactDOM.render(
  <Provider store={store}>
  <Elements stripe={stripePromise} 
  >
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Elements>
    </Provider>,

  document.getElementById("root")
);
