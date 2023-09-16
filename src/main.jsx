import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@material-tailwind/react';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import router from './routes.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <ThemeProvider>
    </ThemeProvider> */}
  </React.StrictMode>,
);
