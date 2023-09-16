import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@material-tailwind/react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
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
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
