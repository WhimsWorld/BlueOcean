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
import Cookies from 'js-cookie';
import StickyNavbar from '../components/StickyNavbar';
import SoundsMenu from '../components/characterCreationComponents/SoundsMenuChars';
import Tooltip from '../components/characterCreationComponents/Tooltip';

export default function CharacterCreation({ storyBoardURL }) {
  const navigate = useNavigate();
  const storyID = window.location.href.split('characterCreation/')[1];
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('');
  const [str, setStr] = useState([]);
  const [weak, setWeak] = useState([]);
  const [race, setRace] = useState('');
  const [sex, setSex] = useState('');
  const [characterIcon, setCharacterIcon] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [images, setImages] = useState([]);
  const [sounds, setSounds] = useState([]);
  const [selectedSound, setSelectedSound] = useState(false);
  const [backgroundURL, setBackgroundURL] = useState('');
  const [audio] = useState(new Audio());
  const [loggedIn, setLoggedIn] = useState(Cookies.get('userId'));

  const [isCheckedS1, setIsCheckedS1] = useState(false);
  const [isCheckedS2, setIsCheckedS2] = useState(false);
  const [isCheckedS3, setIsCheckedS3] = useState(false);
  const [isCheckedS4, setIsCheckedS4] = useState(false);
  const [isCheckedS5, setIsCheckedS5] = useState(false);
  const [isCheckedS6, setIsCheckedS6] = useState(false);
  const [isCheckedS7, setIsCheckedS7] = useState(false);
  const [isCheckedS8, setIsCheckedS8] = useState(false);
  const [isCheckedS9, setIsCheckedS9] = useState(false);
  const [isCheckedS10, setIsCheckedS10] = useState(false);
  const [strCount, setStrCount] = useState(0);

  const [isCheckedW1, setIsCheckedW1] = useState(false);
  const [isCheckedW2, setIsCheckedW2] = useState(false);
  const [isCheckedW3, setIsCheckedW3] = useState(false);
  const [isCheckedW4, setIsCheckedW4] = useState(false);
  const [isCheckedW5, setIsCheckedW5] = useState(false);
  const [isCheckedW6, setIsCheckedW6] = useState(false);
  const [isCheckedW7, setIsCheckedW7] = useState(false);
  const [isCheckedW8, setIsCheckedW8] = useState(false);
  const [isCheckedW9, setIsCheckedW9] = useState(false);
  const [isCheckedW10, setIsCheckedW10] = useState(false);
  const [weakCount, setWeakCount] = useState(0);

  const [radioCheck1, setRadioCheck1] = useState(false);
  const [radioCheck2, setRadioCheck2] = useState(false);
  const [radioCheck3, setRadioCheck3] = useState(false);
  const [radioCheck4, setRadioCheck4] = useState(false);

  useEffect(() => {
    axios.get('/api/images')
      .then((imagesData) => {
        setImages(imagesData.data);
      })
      .catch(() => console.log('couldnt fetch images'));
  }, []);

  useEffect(() => {
    const dataParams = {
      params: {
        storyID,
      },
    };
    axios.get('/api/category', dataParams)
      .then((categoryData) => {
        if (categoryData.data.category_id === 1) {
          setBackgroundURL(fantasyBG);
        } else if (categoryData.data.category_id === 2) {
          setBackgroundURL(forestBG);
        } else if (categoryData.data.category_id === 3) {
          setBackgroundURL(pirateBG);
        } else if (categoryData.data.category_id === 4) {
          setBackgroundURL(steampunkBG);
        } else {
          setBackgroundURL(cloudBG);
        }
      })
      .catch(() => console.log('couldnt fetch category'));
  }, [storyID]);

  useEffect(() => {
  }, [backgroundURL]);

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
  async function toPost(e) {
    e.preventDefault();
    if (!name) {
      document.getElementById('setName').focus();
    } else if (!race) {
      document.getElementById('setRace').focus();
    } else if (!origin) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      document.getElementById('setOrigin').focus();
    } else if (!sex) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      document.getElementById('Male').focus();
    } else if (str.length < 2) {
      window.scrollTo({
        top: -100,
        behavior: 'smooth',
      });
      document.getElementById('Courageous').focus();
    } else if (weak.length < 2) {
      window.scrollTo({
        top: -100,
        behavior: 'smooth',
      });
      document.getElementById('Cowardice').focus();
    } else if (!characterIcon) {
      document.getElementById('2').focus();
    } else {
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
        .then(() => {
          navigate(`/storyBoard/${storyID}`);
          window.scrollTo(0, 0);
        })
        .catch((err) => {});
    }
  }

  const clickHandler = (imageId) => {
    setCharacterIcon(imageId === characterIcon ? null : imageId);
  };

  const changeRace = (e) => {
    setRace(e);
  };

  const radioHandler = (e) => {
    if (e.target.value === 'Male') {
      setRadioCheck1(true);
      setRadioCheck2(false);
      setRadioCheck3(false);
      setRadioCheck4(false);
      setSex(e.target.value);
    } else if (e.target.value === 'Female') {
      setRadioCheck1(false);
      setRadioCheck2(true);
      setRadioCheck3(false);
      setRadioCheck4(false);
      setSex(e.target.value);
    } else if (e.target.value === 'Non-binary') {
      setRadioCheck1(false);
      setRadioCheck2(false);
      setRadioCheck3(true);
      setRadioCheck4(false);
      setSex(e.target.value);
    } else {
      setRadioCheck1(false);
      setRadioCheck2(false);
      setRadioCheck3(false);
      setRadioCheck4(true);
      setSex(e.target.value);
    }
  };

  const chooseStrength1 = (e) => {
    isCheckedS1 ? setIsCheckedS1(false) : setIsCheckedS1(true);
    isCheckedS1
      ? setStrCount((prevCount) => prevCount - 1) : setStrCount((prevCount) => prevCount + 1);
    if (str.includes(e.target.value)) {
      setStr(str.filter((strength) => strength !== e.target.value));
    } else {
      setStr((str) => [...str, e.target.value]);
    }
  };
  const chooseStrength2 = (e) => {
    isCheckedS2 ? setIsCheckedS2(false) : setIsCheckedS2(true);
    isCheckedS2
      ? setStrCount((prevCount) => prevCount - 1) : setStrCount((prevCount) => prevCount + 1);
    if (str.includes(e.target.value)) {
      setStr(str.filter((strength) => strength !== e.target.value));
    } else {
      setStr((str) => [...str, e.target.value]);
    }
  };
  const chooseStrength3 = (e) => {
    isCheckedS3 ? setIsCheckedS3(false) : setIsCheckedS3(true);
    isCheckedS3
      ? setStrCount((prevCount) => prevCount - 1) : setStrCount((prevCount) => prevCount + 1);
    if (str.includes(e.target.value)) {
      setStr(str.filter((strength) => strength !== e.target.value));
    } else {
      setStr((str) => [...str, e.target.value]);
    }
  };
  const chooseStrength4 = (e) => {
    isCheckedS4 ? setIsCheckedS4(false) : setIsCheckedS4(true);
    isCheckedS4
      ? setStrCount((prevCount) => prevCount - 1) : setStrCount((prevCount) => prevCount + 1);
    if (str.includes(e.target.value)) {
      setStr(str.filter((strength) => strength !== e.target.value));
    } else {
      setStr((str) => [...str, e.target.value]);
    }
  };
  const chooseStrength5 = (e) => {
    isCheckedS5 ? setIsCheckedS5(false) : setIsCheckedS5(true);
    isCheckedS5
      ? setStrCount((prevCount) => prevCount - 1) : setStrCount((prevCount) => prevCount + 1);
    if (str.includes(e.target.value)) {
      setStr(str.filter((strength) => strength !== e.target.value));
    } else {
      setStr((str) => [...str, e.target.value]);
    }
  };

  const chooseStrength6 = (e) => {
    isCheckedS6 ? setIsCheckedS6(false) : setIsCheckedS6(true);
    isCheckedS6
      ? setStrCount((prevCount) => prevCount - 1) : setStrCount((prevCount) => prevCount + 1);
    if (str.includes(e.target.value)) {
      setStr(str.filter((strength) => strength !== e.target.value));
    } else {
      setStr((str) => [...str, e.target.value]);
    }
  };

  const chooseStrength7 = (e) => {
    isCheckedS7 ? setIsCheckedS7(false) : setIsCheckedS7(true);
    isCheckedS7
      ? setStrCount((prevCount) => prevCount - 1) : setStrCount((prevCount) => prevCount + 1);
    if (str.includes(e.target.value)) {
      setStr(str.filter((strength) => strength !== e.target.value));
    } else {
      setStr((str) => [...str, e.target.value]);
    }
  };

  const chooseStrength8 = (e) => {
    isCheckedS8 ? setIsCheckedS8(false) : setIsCheckedS8(true);
    isCheckedS8
      ? setStrCount((prevCount) => prevCount - 1) : setStrCount((prevCount) => prevCount + 1);
    if (str.includes(e.target.value)) {
      setStr(str.filter((strength) => strength !== e.target.value));
    } else {
      setStr((str) => [...str, e.target.value]);
    }
  };

  const chooseStrength9 = (e) => {
    isCheckedS9 ? setIsCheckedS9(false) : setIsCheckedS9(true);
    isCheckedS9
      ? setStrCount((prevCount) => prevCount - 1) : setStrCount((prevCount) => prevCount + 1);
    if (str.includes(e.target.value)) {
      setStr(str.filter((strength) => strength !== e.target.value));
    } else {
      setStr((str) => [...str, e.target.value]);
    }
  };

  const chooseStrength10 = (e) => {
    isCheckedS10 ? setIsCheckedS10(false) : setIsCheckedS10(true);
    isCheckedS10
      ? setStrCount((prevCount) => prevCount - 1) : setStrCount((prevCount) => prevCount + 1);
    if (str.includes(e.target.value)) {
      setStr(str.filter((strength) => strength !== e.target.value));
    } else {
      setStr((str) => [...str, e.target.value]);
    }
  };

  const chooseWeakness1 = (e) => {
    isCheckedW1 ? setIsCheckedW1(false) : setIsCheckedW1(true);
    isCheckedW1
      ? setWeakCount((prevCount) => prevCount - 1) : setWeakCount((prevCount) => prevCount + 1);
    if (weak.includes(e.target.value)) {
      setWeak(weak.filter((weakness) => weakness !== e.target.value));
    } else {
      setWeak((weak) => [...weak, e.target.value]);
    }
  };

  const chooseWeakness2 = (e) => {
    isCheckedW2 ? setIsCheckedW2(false) : setIsCheckedW2(true);
    isCheckedW2
      ? setWeakCount((prevCount) => prevCount - 1) : setWeakCount((prevCount) => prevCount + 1);
    if (weak.includes(e.target.value)) {
      setWeak(weak.filter((weakness) => weakness !== e.target.value));
    } else {
      setWeak((weak) => [...weak, e.target.value]);
    }
  };

  const chooseWeakness3 = (e) => {
    isCheckedW3 ? setIsCheckedW3(false) : setIsCheckedW3(true);
    isCheckedW3
      ? setWeakCount((prevCount) => prevCount - 1) : setWeakCount((prevCount) => prevCount + 1);
    if (weak.includes(e.target.value)) {
      setWeak(weak.filter((weakness) => weakness !== e.target.value));
    } else {
      setWeak((weak) => [...weak, e.target.value]);
    }
  };

  const chooseWeakness4 = (e) => {
    isCheckedW4 ? setIsCheckedW4(false) : setIsCheckedW4(true);
    isCheckedW4
      ? setWeakCount((prevCount) => prevCount - 1) : setWeakCount((prevCount) => prevCount + 1);
    if (weak.includes(e.target.value)) {
      setWeak(weak.filter((weakness) => weakness !== e.target.value));
    } else {
      setWeak((weak) => [...weak, e.target.value]);
    }
  };

  const chooseWeakness5 = (e) => {
    isCheckedW5 ? setIsCheckedW5(false) : setIsCheckedW5(true);
    isCheckedW5
      ? setWeakCount((prevCount) => prevCount - 1) : setWeakCount((prevCount) => prevCount + 1);
    if (weak.includes(e.target.value)) {
      setWeak(weak.filter((weakness) => weakness !== e.target.value));
    } else {
      setWeak((weak) => [...weak, e.target.value]);
    }
  };

  const chooseWeakness6 = (e) => {
    isCheckedW6 ? setIsCheckedW6(false) : setIsCheckedW6(true);
    isCheckedW6
      ? setWeakCount((prevCount) => prevCount - 1)
      : setWeakCount((prevCount) => prevCount + 1);
    if (weak.includes(e.target.value)) {
      setWeak(weak.filter((weakness) => weakness !== e.target.value));
    } else {
      setWeak((weak) => [...weak, e.target.value]);
    }
  };

  const chooseWeakness7 = (e) => {
    isCheckedW7 ? setIsCheckedW7(false) : setIsCheckedW7(true);
    isCheckedW7
      ? setWeakCount((prevCount) => prevCount - 1)
      : setWeakCount((prevCount) => prevCount + 1);
    if (weak.includes(e.target.value)) {
      setWeak(weak.filter((weakness) => weakness !== e.target.value));
    } else {
      setWeak((weak) => [...weak, e.target.value]);
    }
  };

  const chooseWeakness8 = (e) => {
    isCheckedW8 ? setIsCheckedW8(false) : setIsCheckedW8(true);
    isCheckedW8
      ? setWeakCount((prevCount) => prevCount - 1)
      : setWeakCount((prevCount) => prevCount + 1);
    if (weak.includes(e.target.value)) {
      setWeak(weak.filter((weakness) => weakness !== e.target.value));
    } else {
      setWeak((weak) => [...weak, e.target.value]);
    }
  };

  const chooseWeakness9 = (e) => {
    isCheckedW9 ? setIsCheckedW9(false) : setIsCheckedW9(true);
    isCheckedW9
      ? setWeakCount((prevCount) => prevCount - 1)
      : setWeakCount((prevCount) => prevCount + 1);
    if (weak.includes(e.target.value)) {
      setWeak(weak.filter((weakness) => weakness !== e.target.value));
    } else {
      setWeak((weak) => [...weak, e.target.value]);
    }
  };

  const chooseWeakness10 = (e) => {
    isCheckedW10 ? setIsCheckedW10(false) : setIsCheckedW10(true);
    isCheckedW10
      ? setWeakCount((prevCount) => prevCount - 1)
      : setWeakCount((prevCount) => prevCount + 1);
    if (weak.includes(e.target.value)) {
      setWeak(weak.filter((weakness) => weakness !== e.target.value));
    } else {
      setWeak((weak) => [...weak, e.target.value]);
    }
  };

  const nameHandler = (e) => {
    if (e.target.value.length > 20) {
      setName('');
      setErrorMessage(true);
    } else {
      setName(e.target.value);
      setErrorMessage(false);
    }
  };

  const playAudio = (soundUrl) => {
    audio.src = soundUrl;
    audio.play();
  };

  return (

    <div className="h-max bg-cover bg-fixed" style={{ backgroundImage: `url(${backgroundURL})` }}>
      <StickyNavbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <div
        className="min-h-screen"
        style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '1000px', margin: 'auto', minHeight: '100vh',
        }}
      >
        <Card
          style={{
            alignItems: 'center',
            width: '100%',
            margin: 'auto',
            height: 'max-content',
            background: `url(${cardBG})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            clipPath: 'polygon(59% 2%, 68% 3%, 75% 0, 83% 2%, 90% 3%, 100% 0, 100% 16%, 100% 34%, 99% 53%, 98% 74%, 100% 100%, 83% 99%, 72% 96%, 63% 100%, 54% 96%, 44% 100%, 36% 100%, 30% 96%, 17% 98%, 7% 96%, 0 100%, 1% 71%, 0 43%, 1% 0, 9% 2%, 18% 0, 31% 3%, 48% 0)',
          }}
          shadow={false}
        >
          <Typography variant="h4" color="blue-gray" className="font-croissant " style={{ marginTop: '2em', fontSize: '32px' }}>
            Character Creation
          </Typography>
          <form className="mt-4 mb-2 max-w-screen-2xl sm:w-full lg:w-3/4 xl:w-2/3 mx-auto">
            <div className="mb-4 flex flex-col gap-6" style={{ margin: 'auto', width: '60%', marginBottom: '1em' }}>
              <Input color="teal" size="sm" label="Name" id="setName" onChange={(e) => nameHandler(e)} style={{ backgroundColor: 'white' }} />
              <Typography color="red" className="-mt-6 -mb-4 font-serif" style={{ minHeight: '26px' }}>
                {errorMessage ? 'Character name length is limited to 20 characters.' : ''}
              </Typography>
              <Select color="teal" label="Select Race" className="focus:outline-none focus:ring focus:ring-teal-500" id="setRace" onChange={changeRace} style={{ backgroundColor: 'white' }}>
                <Option value="Human">Human</Option>
                <Option value="Elf">Elf</Option>
                <Option value="Orc">Orc</Option>
                <Option value="Dwarf">Dwarf</Option>
                <Option value="Tiefling">Tiefling</Option>
                <Option value="DragonBorn">Dragonborn</Option>
              </Select>
            </div>
            <div className="mb-4 flex flex-col gap-6">
              <Textarea color="teal" id="setOrigin" style={{ backgroundColor: 'white' }} size="lg" label="Character Origin Story" type="text" onChange={(e) => setOrigin(e.target.value)} />
            </div>
            <div className="flex w-max gap-4" style={{ margin: 'auto' }}>
              <Radio
                id="Male"
                label="Male"
                value="Male"
                color="teal"
                checked={radioCheck1}
                onClick={(e) => radioHandler(e)}
                className="focus:outline-none focus:ring focus:ring-teal-100"
              />
              <Radio
                id="Female"
                label="Female"
                value="Female"
                color="teal"
                checked={radioCheck2}
                className="focus:outline-none focus:ring focus:ring-teal-100"
                onClick={(e) => radioHandler(e)}
              />
              <Radio
                id="Non-binary"
                label="Non-binary"
                value="Non-binary"
                color="teal"
                checked={radioCheck3}
                onClick={(e) => radioHandler(e)}
                className="focus:outline-none focus:ring focus:ring-teal-100"
              />
              <Radio
                id="Other"
                label="Other"
                value="Other"
                color="teal"
                checked={radioCheck4}
                onClick={(e) => radioHandler(e)}
                className="focus:outline-none focus:ring focus:ring-teal-100"
              />
            </div>
            <div>
              <Typography id="str" color="gray" className="mt-1 font-bold font-croissant">
                Choose your Strengths
                {' '}
                <em>(Select 2)</em>
              </Typography>
              <Tooltip text="Courageous individuals face fear head-on, demonstrating unwavering bravery in adversity. They inspire others with their determination and self-assuredness, showing the power of confronting challenges with integrity.">
                <Checkbox
                  label="Courageous"
                  id="Courageous"
                  value="Courageous"
                  onClick={chooseStrength1}
                  checked={isCheckedS1}
                  disabled={!isCheckedS1 && strCount === 2}
                  style={{ backgroundColor: isCheckedS1 ? 'teal' : null, border: isCheckedS1 ? 'none' : ' ' }}
                  className="focus:outline-none focus:ring focus:ring-teal-500"
                />
              </Tooltip>
              <Tooltip text="This character has a vast pool of knowledge, be it from books, experiences, or teachings. They always have a piece of information that can help the group.">
                <Checkbox
                  label="Knowledgeable"
                  id="Knowledgeable"
                  value="Knowledgeable"
                  onClick={chooseStrength2}
                  disabled={!isCheckedS2 && strCount === 2}
                  checked={isCheckedS2}
                  style={{ backgroundColor: isCheckedS2 ? 'teal' : null, border: isCheckedS2 ? 'none' : ' ' }}
                  className="focus:outline-none focus:ring focus:ring-teal-500"
                />
              </Tooltip>
              <Tooltip text="With just a smile or a few words, they can win over even the toughest of crowds. Their charm is their strength, allowing them to negotiate, inspire, and lead with ease.">
                <Checkbox
                  label="Charismatic"
                  id="Charismatic"
                  value="Charismatic"
                  onClick={chooseStrength3}
                  disabled={!isCheckedS3 && strCount === 2}
                  checked={isCheckedS3}
                  style={{ backgroundColor: isCheckedS3 ? 'teal' : null, border: isCheckedS3 ? 'none' : ' ' }}
                  className="focus:outline-none focus:ring focus:ring-teal-500"
                />
              </Tooltip>
              <Tooltip text="Their words, actions, or mere presence can lift the spirits of those around them. They’re a beacon of hope and strength for their group.">
                <Checkbox
                  label="Inspiring"
                  id="Inspiring"
                  value="Inspiring"
                  onClick={chooseStrength4}
                  disabled={!isCheckedS4 && strCount === 2}
                  checked={isCheckedS4}
                  style={{ backgroundColor: isCheckedS4 ? 'teal' : null, border: isCheckedS4 ? 'none' : ' ' }}
                  className="focus:outline-none focus:ring focus:ring-teal-500"
                />
              </Tooltip>
              <Tooltip text="No matter the odds, this character can make do with what they have. They can often find unconventional solutions to problems.">
                <Checkbox
                  label="Resourceful"
                  id="Resourceful"
                  value="Resourceful"
                  onClick={chooseStrength5}
                  disabled={!isCheckedS5 && strCount === 2}
                  checked={isCheckedS5}
                  style={{ backgroundColor: isCheckedS5 ? 'teal' : null, border: isCheckedS5 ? 'none' : ' ' }}
                  className="focus:outline-none focus:ring focus:ring-teal-500"
                />
              </Tooltip>
              <Tooltip text="Physically and mentally tough, this character can endure hardships that would break most. They recover quickly from setbacks, always ready for the next challenge.">
                <Checkbox
                  label="Resiliant"
                  id="Resiliant"
                  value="Resiliant "
                  onClick={chooseStrength6}
                  checked={isCheckedS6}
                  disabled={!isCheckedS6 && strCount === 2}
                  style={{ backgroundColor: isCheckedS6 ? 'teal' : null, border: isCheckedS6 ? 'none' : ' ' }}
                  className="focus:outline-none focus:ring focus:ring-teal-500"
                />
              </Tooltip>
              <Tooltip text="Fiercely loyal and protective, they’ll go to great lengths to ensure the safety of their loved ones and allies.">
                <Checkbox
                  label="Protective"
                  id="Protective"
                  value="Protective"
                  onClick={chooseStrength7}
                  checked={isCheckedS7}
                  disabled={!isCheckedS7 && strCount === 2}
                  style={{ backgroundColor: isCheckedS7 ? 'teal' : null, border: isCheckedS7 ? 'none' : ' ' }}
                  className="focus:outline-none focus:ring focus:ring-teal-500"
                />
              </Tooltip>
              <Tooltip text="No matter the situation, this character can adjust and make the best out of it. They’re quick on their feet, thinking of solutions on the go.">
                <Checkbox
                  label="Adaptable"
                  id="Adaptable"
                  value="Adaptable"
                  onClick={chooseStrength8}
                  checked={isCheckedS8}
                  disabled={!isCheckedS8 && strCount === 2}
                  style={{ backgroundColor: isCheckedS8 ? 'teal' : null, border: isCheckedS8 ? 'none' : ' ' }}
                  className="focus:outline-none focus:ring focus:ring-teal-500"
                />
              </Tooltip>
              <Tooltip text="This character can intuitively understand and feel what others are going through. Their ability to connect with others on a deeper level can help in negotiations or understanding hidden motives.">
                <Checkbox
                  label="Empathetic"
                  id="Empathetic"
                  value="Empathetic"
                  onClick={chooseStrength9}
                  checked={isCheckedS9}
                  disabled={!isCheckedS9 && strCount === 2}
                  style={{ backgroundColor: isCheckedS9 ? 'teal' : null, border: isCheckedS9 ? 'none' : ' ' }}
                  className="focus:outline-none focus:ring focus:ring-teal-500"
                />
              </Tooltip>
              <Tooltip text="Always three steps ahead, this character is excellent at planning and strategizing, making sure the group is always in a favorable position.">
                <Checkbox
                  label="Strategic"
                  id="Strategic"
                  value="Strategic"
                  onClick={chooseStrength10}
                  checked={isCheckedS10}
                  disabled={!isCheckedS10 && strCount === 2}
                  style={{ backgroundColor: isCheckedS10 ? 'teal' : null, border: isCheckedS10 ? 'none' : ' ' }}
                  className="focus:outline-none focus:ring focus:ring-teal-500"
                />
              </Tooltip>
            </div>
            <div>
              <Typography color="gray" className="mt-1 font-bold font-croissant">
                Choose your Weaknesses
                {' '}
                <em>(Select 2)</em>
              </Typography>
              <Tooltip text="Nobody likes a coward. But overcoming cowardice is a significant flaw to have since sometimes it just can make the encounters a bit more challenging, and in the process, create even more conflict. Not only this is a great supporting character flaw that might inspire others to change the coward into something better.">
                <Checkbox
                  label="Cowardice"
                  id="Cowardice"
                  value="Cowardice"
                  onClick={chooseWeakness1}
                  checked={isCheckedW1}
                  disabled={!isCheckedW1 && weakCount === 2}
                  style={{ backgroundColor: isCheckedW1 ? 'teal' : null, border: isCheckedW1 ? 'none' : ' ' }}
                  className="focus:outline-none focus:ring focus:ring-teal-500"
                />
              </Tooltip>
              <Tooltip text="Incompetence is an outstanding flaw for a character, just because it stirs up some chaos into the campaigns because failed rolls might create not only funny moments but also dramatic moments. And depending on an incompetent character in a time of need is a tremendous opportunity for great story moments.">
                <Checkbox
                  label="Incompetence"
                  id="Incompetence"
                  value="Incompetence"
                  onClick={chooseWeakness2}
                  checked={isCheckedW2}
                  disabled={!isCheckedW2 && weakCount === 2}
                  style={{ backgroundColor: isCheckedW2 ? 'teal' : null, border: isCheckedW2 ? 'none' : ' ' }}
                  className="focus:outline-none focus:ring focus:ring-teal-500"
                />
              </Tooltip>
              <Tooltip text="Being lazy might be a bit whiny trait for a character to have, but simply a bard that will not do any physical labor could provide more roleplaying opportunities for others to interact with these lazy tendencies and provide more challenge to the party in the process.">
                <Checkbox
                  label="Lazy"
                  id="Lazy"
                  value="Lazy"
                  onClick={chooseWeakness3}
                  checked={isCheckedW3}
                  disabled={!isCheckedW3 && weakCount === 2}
                  style={{ backgroundColor: isCheckedW3 ? 'teal' : null, border: isCheckedW3 ? 'none' : ' ' }}
                  className="focus:outline-none focus:ring focus:ring-teal-500"
                />
              </Tooltip>
              <Tooltip text="Rebellious and Rogish characters are loveable by all. This trait is excellent to roleplay in your party since this trait creates tremendous opportunities to deviate from the DM structure due to the character’s beliefs and ideals in a fun way.">
                <Checkbox
                  label="Rebellious"
                  id="Rebellious"
                  value="Rebellious"
                  onClick={chooseWeakness4}
                  checked={isCheckedW4}
                  disabled={!isCheckedW4 && weakCount === 2}
                  style={{ backgroundColor: isCheckedW4 ? 'teal' : null, border: isCheckedW4 ? 'none' : ' ' }}
                  className="focus:outline-none focus:ring focus:ring-teal-500"
                />
              </Tooltip>
              <Tooltip text="This trait is better than some of the characteristics like being “secretive” or “manipulative.” These two traits might be roleplayed in a more passive way, where coming up with new lies are a great character development tool. Think of Saul Goodman from Breaking Bad as an example.">
                <Checkbox
                  label="Compulsive Liar"
                  id="Compulsive Liar"
                  value="Compulsive Liar"
                  onClick={chooseWeakness5}
                  checked={isCheckedW5}
                  disabled={!isCheckedW5 && weakCount === 2}
                  style={{ backgroundColor: isCheckedW5 ? 'teal' : null, border: isCheckedW5 ? 'none' : ' ' }}
                  className="focus:outline-none focus:ring focus:ring-teal-500"
                />
              </Tooltip>
              <Tooltip text="Being Vengeful could be an interesting character trait to have since this provides an opportunity to find some of the wrongdoings that might seem small to others but show to other players and DM what this character values for its ideals and create conflict. Think Gladiator as an example to draw inspiration from.">
                <Checkbox
                  label="Vengeful"
                  id="Vengeful"
                  value="Vengeful"
                  onClick={chooseWeakness6}
                  checked={isCheckedW6}
                  disabled={!isCheckedW6 && weakCount === 2}
                  style={{ backgroundColor: isCheckedW6 ? 'teal' : null, border: isCheckedW6 ? 'none' : ' ' }}
                  className="focus:outline-none focus:ring focus:ring-teal-500"
                />
              </Tooltip>
              <Tooltip text="This trait is basically bards. However, exploring vanity’s themes is an excellent trait since it provides a significant character development opportunity to care about somebody other than your character in the story.">
                <Checkbox
                  label="Vanity"
                  id="Vanity"
                  value="Vanity"
                  onClick={chooseWeakness7}
                  checked={isCheckedW7}
                  disabled={!isCheckedW7 && weakCount === 2}
                  style={{ backgroundColor: isCheckedW7 ? 'teal' : null, border: isCheckedW7 ? 'none' : ' ' }}
                  className="focus:outline-none focus:ring focus:ring-teal-500"
                />
              </Tooltip>
              <Tooltip text="Being dependent on something is a great character trait for players to tie some of the players together in an exciting way. Whatever happens to the entity the character is dependent on will impact the character in some meaningful way creating great stories on the way.">
                <Checkbox
                  label="Dependent"
                  id="Dependent"
                  value="Dependent"
                  onClick={chooseWeakness8}
                  checked={isCheckedW8}
                  disabled={!isCheckedW8 && weakCount === 2}
                  style={{ backgroundColor: isCheckedW8 ? 'teal' : null, border: isCheckedW8 ? 'none' : ' ' }}
                  className="focus:outline-none focus:ring focus:ring-teal-500"
                />
              </Tooltip>
              <Tooltip text="One of the better flaws to have for any character is a flaw that lets the DM take advantage of the character to create either more conflict at the table. A gullible cleric, righteous, might even follow an evil entity without knowing. Or a proud nobleman might not be street smart at all, falling for every parlor trick made on him.">
                <Checkbox
                  label="Gullible"
                  id="Gullible"
                  value="Gullible"
                  onClick={chooseWeakness9}
                  checked={isCheckedW9}
                  disabled={!isCheckedW9 && weakCount === 2}
                  style={{ backgroundColor: isCheckedW9 ? 'teal' : null, border: isCheckedW9 ? 'none' : ' ' }}
                  className="focus:outline-none focus:ring focus:ring-teal-500"
                />
              </Tooltip>
              <Tooltip text="This is an excellent trait for any character, a bounty or artifact hunter, annoying cleric worshiping a deity, or merely an artificer being enthusiastic about small magical details creating more roleplaying opportunities for others at the table to interact with.">
                <Checkbox
                  label="Obsessed"
                  id="Obsessed"
                  value="Obsessed"
                  onClick={chooseWeakness10}
                  checked={isCheckedW10}
                  disabled={!isCheckedW10 && weakCount === 2}
                  style={{ backgroundColor: isCheckedW10 ? 'teal' : null, border: isCheckedW10 ? 'none' : ' ' }}
                  className="focus:outline-none focus:ring focus:ring-teal-500"
                />
              </Tooltip>

            </div>
            <div style={{
              margin: 'auto', marginBottom: '2%', marginTop: '3%', display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', gap: '5px',
            }}
            >
              {images && images.map((image, index) => (
                <Avatar
                  src={image.image_url}
                  id={image.image_id}
                  alt="avatar"
                  size="lg"
                  onClick={() => clickHandler(image.image_id)}
                  style={{
                    border: `solid 4px ${characterIcon === image.image_id ? 'teal' : 'transparent'}`,
                    cursor: 'pointer',
                  }}
                  className="focus:outline-none focus:ring focus:ring-teal-500"
                  key={index}
                />
              ))}
            </div>
            <div style={{
              display: 'flex', flexDirection: 'column', margin: 'auto', width: '50%', height: '150px',
            }}
            >
              <SoundsMenu
                style={{ marginLeft: '30px'}}
                sounds={sounds}
                setSelectedSound={setSelectedSound}
              />
              {selectedSound ? (
                <div style={{
                  display: 'flex', gap: '0.5em', marginTop: '0.5em', justifyContent: 'center', alignItems: 'center',
                }}
                >
                  <button
                    onClick={() => playAudio(`https://docs.google.com/uc?export=open&id=${selectedSound.sound_url}`)}
                    type="button"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                      style={{ width: '30px', height: '20px', fill: 'teal' }}
                    >
                      <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                    </svg>
                  </button>
                  <div className="font-croissant" style={{ fontWeight: '500' }}>
                    Play:
                    <span className="font-croissant" style={{ marginLeft: '10px' }}>
                      {selectedSound.sound_name}
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
            <div style={{
              display: 'flex', justifyContent: 'center', margin: 'auto', marginBottom: '4em',
            }}
            >
              <Button
                className="-mt-8 text-lg font-croissant shadow-gray focus:outline-none"
                color="teal"
                style={{
                  backgroundImage: `url(${buttonBG})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center center',
                  opacity: 0.8,
                  fontSize: '18px',
                  width: '350px',
                  color: sex && race && name && origin && characterIcon && str.length > 1 && weak.length > 1 ? 'gold' : 'white',
                  boxShadow: sex && race && name && origin && characterIcon && str.length > 1 && weak.length > 1 ? '0 0 5px 2px teal' : 'none', // Set the box shadow for focus
                }}
                onClick={(e) => toPost(e)}
              >
                CREATE CHARACTER
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

const buttonBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695320647/button_mljj6c.png';
const cardBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695235263/paper2_kag1pb.jpg';
const fantasyBG = 'https://i.ibb.co/5r2KVVz/cave-min.png';
const forestBG = 'https://i.ibb.co/HdrwtLm/forest-min.png';
const pirateBG = 'https://i.ibb.co/0j5zyGz/pirate-min.png';
const steampunkBG = 'https://i.ibb.co/cc8Z860/steampunk.png';
const cloudBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695192325/image_uot0j6.png';
