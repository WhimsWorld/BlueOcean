import React from 'react';
import { Provider } from 'react-redux';
import Home from './features/Home';
import store from './app/store';
import StickyNavbar from './StickyNavbar';

export default function App() {
  return (
    <Provider store={store}>
      <StickyNavbar />
      <Home />
    </Provider>
  );
}
