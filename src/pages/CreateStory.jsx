import React, { useState } from 'react';
import Cookies from 'js-cookie';
import StickyNavbar from '../components/StickyNavbar';
import StoryCreationForm from '../components/storyCreationComponents/StoryCreationForm';

export default function CreateStory() {
  const [loggedIn, setLoggedIn] = useState(Cookies.get('userId'));

  return (
    <div>
      <StickyNavbar
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      <div className="flex justify-center">
        <StoryCreationForm />
      </div>
    </div>
  );
}
