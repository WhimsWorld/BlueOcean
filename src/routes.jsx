import React from 'react';
import {
  createBrowserRouter,
} from 'react-router-dom';
<<<<<<< HEAD
import App from './App';
import Login from './Login';
import Signup from './Signup';
import ErrorPage from './errorPage';
=======
import App from './pages/App';
import Login from './pages/Login'
import CreateStory from './pages/CreateStory';
import StoryBoard from './pages/StoryBoard';
import ErrorPage from './pages/errorPage';
>>>>>>> 91d9ed31a163054c5b5d4b528786395110dc34ce

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
<<<<<<< HEAD
    path: '/Signup',
    element: <Signup />,
    errorElement: <ErrorPage />,
  },
=======
    path: '/createStory',
    element: <CreateStory />,
    errorElement: <errorPage />,
  },
  {
    path: '/storyBoard',
    element: <StoryBoard />,
    errorElement: <errorPage />,
  }
>>>>>>> 91d9ed31a163054c5b5d4b528786395110dc34ce
]);

export default router;
