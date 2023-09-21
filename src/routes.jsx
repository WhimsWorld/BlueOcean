import React from 'react';
import {
  createBrowserRouter,
} from 'react-router-dom';
import Landing from './pages/Landing';
import App from './pages/App';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateStory from './pages/CreateStory';
import StoryBoard from './pages/StoryBoard';
import ErrorPage from './pages/errorPage';
import CharacterCreation from './pages/CharacterCreation';
import CreatePost from './pages/CreatePost';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/home',
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
    path: '/storyBoard/:storyId',
    element: <StoryBoard />,
    errorElement: <errorPage />,
  },
  {
    path: '/characterCreation/:storyId',
    element: <CharacterCreation />,
    errorElement: <errorPage />,
  },
  {
    path: '/createPost/:storyId',
    element: <CreatePost />,
    errorElement: <errorPage />,
  },
]);

export default router;
