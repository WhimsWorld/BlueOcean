import React from "react";
import Counter from "./counter";
import store from "./app/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
