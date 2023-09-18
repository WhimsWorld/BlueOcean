import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
} from '@material-tailwind/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import StickyNavbar from '../components/StickyNavbar';

export default function CharacterCreation() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [backstory, setBackstory] = useState('');
  const [traits, setTraits] = useState([]);
  const [race, setRace] = useState('');
  const [sex, setSex] = useState('');

  const raceOptions = ['Human', 'Elf', 'Orc', 'Dwarf', 'Tiefling', 'Dragonborn'];

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

  function toPost() {
    fetchUser();
    axios.post('/', {
      user_uid: uid,
      username: displayName,
      title: storyTitle,
      summary: description,
      max_characters: participants,
    })
      .then(() => navigate('/'))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <StickyNavbar />
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Character Creation
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Design your character
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Name" onChange={(e) => setName(e.target.value)} />
            <Input size="lg" label="Choose character race" onChange={(e) => setRace(e.target.value)} />
            <Textarea size="lg" label="description" type="text" onChange={(e) => setBackstory(e.target.value)} />
            <Input size="lg" label="sex" type="range" type="range" />
          </div>
          <Button className="mt-6" fullWidth onClick={() => toPost()}>
            Submit Story
          </Button>
        </form>
      </Card>
    </div>
  );
}