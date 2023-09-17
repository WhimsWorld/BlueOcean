import React from 'react';
import {
  createBrowserRouter,
} from 'react-router-dom';
import App from './pages/App';
import Login from './pages/Login';
import CreateStory from './pages/CreateStory';
import StoryBoard from './pages/StoryBoard';
import ErrorPage from './pages/errorPage';

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
  },
]);

export default router;
