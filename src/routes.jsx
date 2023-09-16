import React from 'react';
import {
  createBrowserRouter,
} from 'react-router-dom';
import App from './App';
import Login from './Login';
import CreateStory from './CreateStory';
import StoryBoard from './StoryBoard';
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
    path: '/createStory',
    element: <CreateStory />,
    errorElement: <errorPage />,
  },
  {
    path: '/storyBoard',
    element: <StoryBoard />,
    errorElement: <errorPage />,
  }
]);

export default router;
