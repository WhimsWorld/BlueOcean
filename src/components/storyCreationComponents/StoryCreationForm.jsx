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
  Carousel,
} from '@material-tailwind/react';
import { auth } from '../../utils/firebase.js';

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
        </div>
      </form>
      <h3>Select a theme image:</h3>
      <Carousel
        className="rounded-xl w-2/3 self-center"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        <img
          src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
          alt="something creative"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="even more creative"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
          alt="fill me in"
          className="h-full w-full object-cover"
        />
      </Carousel>
      <Button type="submit" className="mt-6 w-1/2 self-center" onClick={handleSubmit}>
        Create
      </Button>
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
