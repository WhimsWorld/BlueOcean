import React from 'react';
import {
  createBrowserRouter,
} from 'react-router-dom';
import App from './App';
import Login from './Login';
import ErrorPage from './errorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
