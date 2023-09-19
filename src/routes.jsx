import React from 'react';
import {
  createBrowserRouter,
} from 'react-router-dom';
import App from './pages/App';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateStory from './pages/CreateStory';
import StoryBoard from './pages/StoryBoard';
import ErrorPage from './pages/errorPage';
import CharacterCreation from './pages/CharacterCreation';

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
    path: '/signup',
    element: <Signup />,
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
  {
    path: '/characterCreation',
    element: <CharacterCreation />,
    errorElement: <errorPage />,
  },
]);

export default router;
