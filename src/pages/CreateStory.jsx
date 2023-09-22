import React, { useState } from 'react';
import Cookies from 'js-cookie';
import StickyNavbar from '../components/StickyNavbar';
import StoryCreationForm from '../components/storyCreationComponents/StoryCreationForm';

export default function CreateStory() {
  const [loggedIn, setLoggedIn] = useState(Cookies.get('userId'));

  return (
    <div className="h-screen bg-cover min-h-[80rem]" style={{ backgroundImage: `url(${storyCreationBg})` }}>
      <StickyNavbar
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      <div className="flex justify-center bg-none">
        <StoryCreationForm />
      </div>
    </div>
  );
}

// background asset
const storyCreationBg = 'https://i.ibb.co/f1j6Zbr/pirate2-min.png';
