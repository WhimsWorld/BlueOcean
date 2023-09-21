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
import Cookies from 'js-cookie';
import { auth } from '../utils/firebase';
import StickyNavbar from '../components/StickyNavbar';
import SoundsMenu from '../components/characterCreationComponents/SoundsMenuChars';

export default function CharacterCreation({ storyBoardURL }) {
  const navigate = useNavigate();
  const storyID = window.location.href.split('characterCreation/')[1];
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('');
  const [str, setStr] = useState([]);
  const [weak, setWeak] = useState([]);
  const [race, setRace] = useState('');
  const [sex, setSex] = useState('male');
  const [characterIcon, setCharacterIcon] = useState('');
  const [images, setImages] = useState(['https://previews.123rf.com/images/aalbedouin/aalbedouin1801/aalbedouin180100599/93976760-personality-traits-icon-symbol-premium-quality-isolated-personal-character-element-in-trendy-style.jpg', 'https://previews.123rf.com/images/aalbedouin/aalbedouin1801/aalbedouin180100599/93976760-personality-traits-icon-symbol-premium-quality-isolated-personal-character-element-in-trendy-style.jpg', 'https://previews.123rf.com/images/aalbedouin/aalbedouin1801/aalbedouin180100599/93976760-personality-traits-icon-symbol-premium-quality-isolated-personal-character-element-in-trendy-style.jpg', 'https://previews.123rf.com/images/aalbedouin/aalbedouin1801/aalbedouin180100599/93976760-personality-traits-icon-symbol-premium-quality-isolated-personal-character-element-in-trendy-style.jpg', 'https://previews.123rf.com/images/aalbedouin/aalbedouin1801/aalbedouin180100599/93976760-personality-traits-icon-symbol-premium-quality-isolated-personal-character-element-in-trendy-style.jpg', 'https://previews.123rf.com/images/aalbedouin/aalbedouin1801/aalbedouin180100599/93976760-personality-traits-icon-symbol-premium-quality-isolated-personal-character-element-in-trendy-style.jpg', 'https://previews.123rf.com/images/aalbedouin/aalbedouin1801/aalbedouin180100599/93976760-personality-traits-icon-symbol-premium-quality-isolated-personal-character-element-in-trendy-style.jpg', 'https://previews.123rf.com/images/aalbedouin/aalbedouin1801/aalbedouin180100599/93976760-personality-traits-icon-symbol-premium-quality-isolated-personal-character-element-in-trendy-style.jpg', 'https://previews.123rf.com/images/aalbedouin/aalbedouin1801/aalbedouin180100599/93976760-personality-traits-icon-symbol-premium-quality-isolated-personal-character-element-in-trendy-style.jpg', 'https://previews.123rf.com/images/aalbedouin/aalbedouin1801/aalbedouin180100599/93976760-personality-traits-icon-symbol-premium-quality-isolated-personal-character-element-in-trendy-style.jpg', 'https://previews.123rf.com/images/aalbedouin/aalbedouin1801/aalbedouin180100599/93976760-personality-traits-icon-symbol-premium-quality-isolated-personal-character-element-in-trendy-style.jpg', 'https://previews.123rf.com/images/aalbedouin/aalbedouin1801/aalbedouin180100599/93976760-personality-traits-icon-symbol-premium-quality-isolated-personal-character-element-in-trendy-style.jpg']);
  const [sounds, setSounds] = useState([]);
  const [selectedSound, setSelectedSound] = useState({});
  const [audio] = useState(new Audio());

  useEffect(() => {
    axios.get('/api/images')
      .then((imagesData) => {
        setImages(imagesData.data);
      })
      .catch(() => console.log('couldnt fetch images'));
  }, []);

  useEffect(() => {
    axios.get('/api/sounds')
      .then((soundData) => {
        setSounds(soundData.data);
      })
      .catch(() => console.log('couldnt fetch sounds'));
  }, [sounds.length]);

  useEffect(() => {
  }, [selectedSound]);

  const uid = Cookies.get('userId');
  async function toPost() {
    axios.post('/api/characters', {
      user_id: uid,
      story_id: storyID,
      char_name: name,
      backstory: origin,
      characterRace: race,
      characterSex: sex,
      image_id: characterIcon,
      sound_id: selectedSound.sound_id,
      strength: str,
      weakness: weak,
    })
      .then(() => navigate(`/storyBoard/${storyID}`))
      .catch((err) => console.log(err));
  }

  function mouseOver(e) {
    e.target.style.background = 'blue';
    setCharacterIcon(e.target.id);
  }

  const chooseStrength = (e) => {
    if (str.includes(e.target.value)) {
      setStr(str.filter((strength) => strength !== e.target.value));
    } else {
      setStr((str) => [...str, e.target.value]);
    }
  };

  const chooseWeakness = (e) => {
    if (weak.includes(e.target.value)) {
      setWeak(weak.filter((weakness) => weakness !== e.target.value));
    } else {
      setWeak((weak) => [...weak, e.target.value]);
    }
  };
  const changeRace = (e) => {
    setRace(e);
  };

  const playAudio = (soundUrl) => {
    audio.src = soundUrl;
    audio.play();
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
              <Select color="blue" label="Select Race" onChange={changeRace}>
                <Option value="Human">Human</Option>
                <Option value="Elf">Elf</Option>
                <Option value="Orc">Orc</Option>
                <Option value="Dwarf">Dwarf</Option>
                <Option value="Tiefling">Tiefling</Option>
                <Option value="DragonBorn">Dragonborn</Option>
                {/* {console.log('race', race)} */}
              </Select>
            </div>
            {/* This div is for character races */}
            <div className="mb-4 flex flex-col gap-6">
              <Textarea size="lg" label="Character Origin Story" type="text" onChange={(e) => setOrigin(e.target.value)} />
            </div>
            {/* This div is for character sex */}
            <div className="flex w-max gap-4">
              <Radio name="color" color="green" label="male" value="male" defaultChecked onClick={(e) => setSex(e.target.value)} />
              <Radio name="color" color="green" label="female" value="female" onClick={(e) => setSex(e.target.value)} />
              <Radio name="color" color="green" label="non-binary" value="non-binary" onClick={(e) => setSex(e.target.value)} />
              <Radio name="color" color="green" label="other" value="other" onClick={(e) => setSex(e.target.value)} />
            </div>
            {/* This div is for character strengths ///// Need additional work on this section!! */}
            <div>
              <Typography color="gray" className="mt-1 font-normal">
                Choose your Strengths
                {' '}
                <em>(Limit 2)</em>
              </Typography>
              <Checkbox label="Strength 1" value="Strength 1" color="purple" onClick={chooseStrength} />
              <Checkbox label="Strength 2" value="Strength 2" onClick={chooseStrength} />
              <Checkbox label="Strength 3" value="Strength 3" onClick={chooseStrength} />
              <Checkbox label="Strength 4" value="Strength 4" onClick={chooseStrength} />
              <Checkbox label="Strength 5" value="Strength 5" onClick={chooseStrength} />
            </div>
            {/* This div is for weaknesses */}
            <div>
              <Typography color="gray" className="mt-1 font-normal">
                Choose your Weaknesses
                {' '}
                <em>(Limit 2)</em>
              </Typography>
              <Checkbox label="Weakness 1" value="Weakness 1" color="purple" onClick={chooseWeakness} />
              <Checkbox label="Weakness 2" value="Weakness 2" onClick={chooseWeakness} />
              <Checkbox label="Weakness 3" value="Weakness 3" onClick={chooseWeakness} />
              <Checkbox label="Weakness 4" value="Weakness 4" onClick={chooseWeakness} />
              <Checkbox label="Weakness 5" value="Weakness 5" onClick={chooseWeakness} />
            </div>
            {/* This div is to render the character icons */}
            <div>
              {images && images.map((image, index) => (
                <>
                  {index % 6 === 0 && <br />}
                  <Avatar src={image.image_url} id={image.image_id} alt="avatar" size="lg" onClick={(e) => mouseOver(e)} key={index} />
                </>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '400px' }}>
              <SoundsMenu style={{ marginLeft: '30px'}} sounds={sounds} setSelectedSound={setSelectedSound} />
              <Button
                size="md"
                onClick={() => playAudio(`https://docs.google.com/uc?export=open&id=${selectedSound.sound_url}`)}
                style={{
                  backgroundImage: `url(${buttonBG})`, backgroundSize: 'auto', opacity: 0.8, marginTop: '20px',
                }}
              >
                PLAY SOUND
              </Button>
              {selectedSound.sound_name}
            </div>
            {/* Submit character */}
            <Button className="mt-6" style={{ backgroundImage: `url(${buttonBG})` }} fullWidth onClick={() => toPost()}>
              CREATE CHARACTER
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

const buttonBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695229025/bronzetexture_cc3urf.webp';
