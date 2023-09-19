import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import {
  Card,
  Input,
  Textarea,
  Button,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react';
import { auth } from '../../utils/firebase.js';

function ThemeMenu() {
  return (
    <Menu>
      <MenuHandler>
        <Button>Select a Theme</Button>
      </MenuHandler>
      <MenuList>
        <MenuItem>Menu Item 1 <img src="https://i.ibb.co/phRKFP3/PC2.png"></img></MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default function StoryCreationForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  let uid;
  let displayName;
  async function fetchUser() {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        uid = user.uid;
        displayName = user.displayName;
        console.log('uid', uid);
        console.log('display name:', displayName);
      } else {
        navigate('/login');
      }
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUser();
  };
  return (
    <Card color="transparent" className="w-2/3 mt-1 p-4 flex">
      <Typography variant="h4" color="blue-gray" className="self-center">
        Create a new Story
      </Typography>
      <form className="mt-8 mb-2 w-full max-w-screen-lg ">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea variant="outlined" label="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
          <Input type="number" label="Maximum Players" min="1" max="10" value={maxPlayers} onChange={(e) => setMaxPlayers(e.target.value)} />
          <ThemeMenu />
        </div>
        <Button type="submit" className="mt-6 w-1/2 self-center" onClick={handleSubmit}>
          Create
        </Button>
      </form>
    </Card>
  );
}
// import { useNavigate } from 'react-router-dom';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../utils/firebase';
// import StickyNavbar from '../components/StickyNavbar';

// export default function SimpleRegistrationForm() {
//   const navigate = useNavigate();

//   const [storyTitle, setStoryTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [participants, setParticipants] = useState(1);
