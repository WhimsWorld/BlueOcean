import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
  Radio,
  Select,
  Option,
  Avatar,
  Checkbox,
} from '@material-tailwind/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import StickyNavbar from '../components/StickyNavbar';

// The storyBoardURL is so that when the character is created, We will be able to
// redirect the user back to the specific story they created a character for.
export default function CharacterCreation({ storyBoardURL }) {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [backstory, setBackstory] = useState('');
  const [traits, setTraits] = useState([]);
  const [race, setRace] = useState('');
  const [sex, setSex] = useState('');
  const [characterIcon, setCharacterIcon] = useState('');
  const [images, setImages] = useState(['https://previews.123rf.com/images/aalbedouin/aalbedouin1801/aalbedouin180100599/93976760-personality-traits-icon-symbol-premium-quality-isolated-personal-character-element-in-trendy-style.jpg', 'https://previews.123rf.com/images/aalbedouin/aalbedouin1801/aalbedouin180100599/93976760-personality-traits-icon-symbol-premium-quality-isolated-personal-character-element-in-trendy-style.jpg', 'https://previews.123rf.com/images/aalbedouin/aalbedouin1801/aalbedouin180100599/93976760-personality-traits-icon-symbol-premium-quality-isolated-personal-character-element-in-trendy-style.jpg','https://previews.123rf.com/images/aalbedouin/aalbedouin1801/aalbedouin180100599/93976760-personality-traits-icon-symbol-premium-quality-isolated-personal-character-element-in-trendy-style.jpg', 'https://previews.123rf.com/images/aalbedouin/aalbedouin1801/aalbedouin180100599/93976760-personality-traits-icon-symbol-premium-quality-isolated-personal-character-element-in-trendy-style.jpg', 'https://previews.123rf.com/images/aalbedouin/aalbedouin1801/aalbedouin180100599/93976760-personality-traits-icon-symbol-premium-quality-isolated-personal-character-element-in-trendy-style.jpg', 'https://previews.123rf.com/images/aalbedouin/aalbedouin1801/aalbedouin180100599/93976760-personality-traits-icon-symbol-premium-quality-isolated-personal-character-element-in-trendy-style.jpg', 'https://previews.123rf.com/images/aalbedouin/aalbedouin1801/aalbedouin180100599/93976760-personality-traits-icon-symbol-premium-quality-isolated-personal-character-element-in-trendy-style.jpg', 'https://previews.123rf.com/images/aalbedouin/aalbedouin1801/aalbedouin180100599/93976760-personality-traits-icon-symbol-premium-quality-isolated-personal-character-element-in-trendy-style.jpg','https://previews.123rf.com/images/aalbedouin/aalbedouin1801/aalbedouin180100599/93976760-personality-traits-icon-symbol-premium-quality-isolated-personal-character-element-in-trendy-style.jpg', 'https://previews.123rf.com/images/aalbedouin/aalbedouin1801/aalbedouin180100599/93976760-personality-traits-icon-symbol-premium-quality-isolated-personal-character-element-in-trendy-style.jpg', 'https://previews.123rf.com/images/aalbedouin/aalbedouin1801/aalbedouin180100599/93976760-personality-traits-icon-symbol-premium-quality-isolated-personal-character-element-in-trendy-style.jpg']);
  // useEffect(() => {
  //   axios.get('/api/images')
  //     .then((imagesData) => setImages(imagesData.data))
  //     .catch(() => console.log('couldnt fetch images'));
  // }, []);

  let uid;
  let displayName;

  async function fetchUser() {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        uid = user.uid;
        displayName = user.displayName;
      } else {
        navigate('/login');
      }
    });
  }

  async function toPost() {
    await fetchUser();
    axios.post('/api/characters', {
      user_uid: uid,
      username: displayName,
      characterName: name,
      origin: backstory,
      characterRace: race,
      characterSex: sex,
      characterPortrait: characterIcon,
      charcterTraits: traits,

    })
      .then(() => navigate('/'))
      .catch((err) => console.log(err));
  }

  function mouseOver(e) {
    e.target.style.background = 'blue';
    setCharacterIcon(e.target.src);
  }

  const traitSelection = (e) => {
    console.log('target', e.target.value);
    if (e.target.checked < 3) {
      setTraits([traits, e.target.value]);
    }
  };

  return (
    <div>
      <StickyNavbar />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card style={{ alignItems: 'center', width: '50%', margin: 'auto' }} color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Character Creation
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Design your character
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            {/* This div is for basic background info */}
            <div className="mb-4 flex flex-col gap-6">
              <Input size="lg" label="Name" onChange={(e) => setName(e.target.value)} />
              <Select color="blue" label="Select Race">
                <Option>Human</Option>
                <Option>Elf</Option>
                <Option>Orc</Option>
                <Option>Dwarf</Option>
                <Option>Tiefling</Option>
                <Option>Dragonborn</Option>
              </Select>
            </div>
            {/* This div is for character races */}
            <div className="mb-4 flex flex-col gap-6">
              <Textarea size="lg" label="Character Origin Story" type="text" onChange={(e) => setBackstory(e.target.value)} />
            </div>
            {/* This div is for character sex */}
            <div className="flex w-max gap-4">
              <Radio name="color" color="teal" label="male" value="male" defaultChecked onClick={(e) => setSex(e.target.value)} />
              <Radio name="color" color="green" label="female" value="female" onClick={(e) => setSex(e.target.value)} />
            </div>
            {/* This div is for character traits ///// Need additional work on this section!!!!! */}
            <div>
              <Typography color="gray" className="mt-1 font-normal">
                Choose your traits <em>(Limit 2)</em>
              </Typography>
              <Checkbox label="Trait 1" value="trait 1" color="purple" onClick={traitSelection} />
              <Checkbox label="Trait 2" value="trait 2" onClick={traitSelection} />
              <Checkbox label="Trait 3" value="trait 3" onClick={traitSelection} />
              <Checkbox label="Trait 4" value="trait 4" onClick={traitSelection} />
              <Checkbox label="Trait 5" value="trait 5" onClick={traitSelection} />
            </div>
            {/* This div is to render the character icons */}
            <div>
              {images && images.map((image, index) => (
                <>
                  {index % 6 === 0 && <br />}
                  <Avatar src={image} alt="avatar" size="lg" onClick={(e) => mouseOver(e)} key={index} />
                </>
              ))}
            </div>
            {/* Submit character */}
            <Button className="mt-6" fullWidth onClick={() => toPost()}>
              Create Character
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
