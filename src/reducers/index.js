import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import signin_reducer from "./login";

const reducers = combineReducers({ signin_reducer });

const store = () => {
  return createStore(reducers, composeWithDevTools());
};

export default store();
