import React from 'react';
import { Provider } from 'react-redux';
import Home from './features/Home';
import store from './app/store';

export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
