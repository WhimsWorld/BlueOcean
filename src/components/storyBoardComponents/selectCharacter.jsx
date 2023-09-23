import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import axios from 'axios';
import {
  Card, List, ListItem, ListItemPrefix, Avatar, Typography, Button, CardFooter, Tooltip,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { loadCharactersByUserId } from '../../app/slices/characterSlice';

export default function SelectCharacter({ storyId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const characters = useSelector((state) => state.characters);
  const [audio] = useState(new Audio());
  const [loggedIn, setLoggedIn] = useState(Cookies.get('userId'));
  const [hasCharInStory, setHasCharInStory] = useState(false);
  const [storyCharLimit, setStoryCharLimit] = useState(1);
  const [storyCharCount, setStoryCharCount] = useState(0);
  const [maxCharsReached, setMaxCharsReached] = useState(false);
  const [userID, setUserID] = useState(Cookies.get('userId'));

  useEffect(() => {
    dispatch(loadCharactersByUserId(storyId));
  }, [dispatch]);
  useEffect(() => {
    const dataParams = {
      params: {
        storyID: storyId,
        userID,
      },
    };
    axios.get('/api/characters/story/user', dataParams)
      .then((characterData) => {
        if (characterData.data.char_id === undefined) {
          setHasCharInStory(false);
        } else {
          setHasCharInStory(true);
        }
      })
      .catch(() => console.log('couldnt fetch characters'));
  }, [storyId, userID]);

  useEffect(() => {
    const dataParams = {
      params: {
        storyID: storyId,
      },
    };
    axios.get('/api/storiescharmax', dataParams)
      .then((characterData) => {
        setStoryCharLimit(characterData.data.max_characters);
      })
      .catch(() => console.log('couldnt fetch character limit'));
  }, [storyId]);

  useEffect(() => {
    const dataParams = {
      params: {
        storyID: storyId,
      },
    };
    axios.get('/api/storiescharcount', dataParams)
      .then((characterData) => {
        setStoryCharCount(characterData.data.count);
        if (characterData.data.count < storyCharLimit) {
          setMaxCharsReached(false);
        } else {
          setMaxCharsReached(true);
        }
      })
      .catch(() => console.log('couldnt fetch character count'));
  }, [storyId, storyCharLimit]);

  function parseSWString(s) {
    return s.replace(/^{|}$/g, '').split(',').map((item) => item.trim().replace(/^"|"$/g, ''));
  }

  const playAudio = (soundUrl) => {
    audio.src = soundUrl;
    audio.play();
  };

  const handleCreateCharacter = () => {
    if (loggedIn) {
      navigate(`/characterCreation/${storyId}`);
    } else {
      console.log('select character not logged in');
      navigate(`/login/storyBoard/${storyId}`);
    }
  };
  return (
    <Card
      className="rounded-none rounded-l-xl max-w-sm"
      style={{
        justifySelf: 'flex-end',
        backgroundImage: `url(${leftPanel})`,
        backgroundSize: 'auto',
        backgroundRepeat: 'round',
      }}
    >
      <span style={{ fontSize: '20px' }} className="font-croissant self-center pt-5 pb-3 underline font-body"><b>Characters</b></span>
      <List className="p-1 ">

        {characters.map((character) => (
          <ListItem
            key={character.char_id}
            className="bg-white rounded-lg mt-1 ml- bg-opacity-50"
            onClick={() => playAudio(`https://docs.google.com/uc?export=open&id=${character.sound_url}`)}
          >
            <ListItemPrefix className="self-top">
              <Avatar variant="circular" alt={character.char_name} src={character.image_url} size="xl" />
            </ListItemPrefix>
            <div>
              <Typography
                style={{
                  background: '#F4E3ED', justifyContent: 'end', color: '#101A4B', paddingLeft: '2rem', fontSize: '0.9rem', clipPath: 'polygon(100% 0%, 0 0%, 0 100%, 100% 100%, 92% 50%)', border: '1px solid #101A4B',
                }}
                variant="h6"
                color="blue-gray"
                className="font-croissant"
              >
                {character.char_name}

              </Typography>

              <div className="">
                <Typography variant="small" color="gray" className="font-croissant">
                  <b>Race:</b>
                </Typography>
                <Typography variant="small" color="gray" className="font-serif">
                  {character.char_race ? character.char_race : 'unknown'}
                </Typography>
              </div>

              <div className="">
                <Typography variant="small" color="gray" className="font-croissant">
                  <b>Gender:</b>
                </Typography>
                <Typography variant="small" color="gray" className="font-serif">
                  {character.char_sex ? character.char_sex : 'unknown'}
                </Typography>
              </div>

              <div className="">
                <Typography variant="small" color="gray" className="font-croissant">
                  <b>Strength:</b>
                </Typography>
                <Typography variant="small" color="gray" className="font-serif">
                  {character.strength && character.strength !== '{}' ? parseSWString(character.strength).join(', ') : 'unknown'}
                </Typography>
              </div>

              <div className="">
                <Typography variant="small" color="gray" className="font-croissant">
                  <b>Weakness:</b>
                </Typography>
                <Typography variant="small" color="gray" className="font-serif">
                  {character.weakness && character.weakness !== '{}' ? parseSWString(character.weakness).join(', ') : 'unknown'}
                </Typography>
              </div>

              <Tooltip
                placement="right-start"
                className="w-96 bg-indigo-100 text-black p-4 text-justify border ml-4"
                content={character.backstory}
              >
                <Button variant="text" className="text-left font-croissant text-whimsilightblue">Read Backstory →</Button>
              </Tooltip>
            </div>
          </ListItem>
        ))}
      </List>
      <span style={{ fontSize: '15px' }} className="font-croissant pb-3 pt-3 self-center font-body">
        {storyCharCount}
        /
        {storyCharLimit}
        {' '}
        characters
        {' '}
      </span>
      <CardFooter className="pt-0">
        {hasCharInStory || maxCharsReached ? null : (
          <div className="flex justify-center items-center">
            <Button
          // fullWidth
          // variant="text"
              onClick={() => handleCreateCharacter()}
              style={{ backgroundImage: `url(${buttonBG})`, backgroundSize: 'auto' }}
              className="shadow-gray hover-shadow-sm hover:shadow-black hover:text-whimsiorange"
            >
              Create Character
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
const leftPanel = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695243090/paperLeft_uz9wcj.png';
const buttonBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695320647/button_mljj6c.png';
