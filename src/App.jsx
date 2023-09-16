import React from 'react';
import { Provider } from 'react-redux';
import Counter from './counter';
import store from './app/store';

export default function App() {
  return (
      <Provider store={store}>
        <Counter />
      </Provider>
  );
}
