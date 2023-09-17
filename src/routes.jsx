import React from 'react';
import {
  createBrowserRouter,
} from 'react-router-dom';
import App from './App';
import Login from './Login';
import Signup from './Signup';
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
  {
    path: '/Signup',
    element: <Signup />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
