import React, { useState } from 'react';
import Cookies from 'js-cookie';
import StickyNavbar from '../components/StickyNavbar';
import PostCreationForm from '../components/postCreationComponents/postCreationForm';

export default function CreatePost() {
  const [loggedIn, setLoggedIn] = useState(Cookies.get('userId'));

  return (
    <div>
      <StickyNavbar
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      <div className="flex justify-center">
        <PostCreationForm />
      </div>
    </div>
  );
}
