import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
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
  useEffect(() => {
    dispatch(loadCharactersByUserId(storyId));
    console.log(characters);
  }, [dispatch]);

  function parseSWString(s) {
    return s.replace(/^{|}$/g, '').split(',').map((item) => item.trim().replace(/^"|"$/g, ''));
  }

  const playAudio = (soundUrl) => {
    audio.src = soundUrl;
    audio.play();
  };

  const handleCreateCharacter = () => {
    console.log('logged in in selectChar', loggedIn);
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
      <span style={{fontSize: '20px'}} className="font-croissant self-center pt-5 pb-3 underline font-body">Characters</span>
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
              >
                {character.char_name}

              </Typography>

              <div className="">
                <Typography variant="small" color="gray" className="font-normal">
                  <b>Race:</b>
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                  {character.char_race ? character.char_race : 'unknown'}
                </Typography>
              </div>

              <div className="">
                <Typography variant="small" color="gray" className="font-normal">
                  <b>Gender:</b>
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                  {character.char_sex ? character.char_sex : 'unknown'}
                </Typography>
              </div>

              <div className="">
                <Typography variant="small" color="gray" className="font-normal">
                  <b>Strength:</b>
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                  {character.strength && character.strength !== '{}' ? parseSWString(character.strength).join(', ') : 'unknown'}
                </Typography>
              </div>

              <div className="">
                <Typography variant="small" color="gray" className="font-normal">
                  <b>Weakness:</b>
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                  {character.weakness && character.weakness !== '{}' ? parseSWString(character.weakness).join(', ') : 'unknown'}
                </Typography>
              </div>

              <Tooltip
                placement="right-start"
                className="w-96 bg-indigo-100 text-black p-4 text-justify border ml-4"
                content={character.backstory}
              >
                <Button variant="text" className="text-left">Read Backstory →</Button>
              </Tooltip>
            </div>
          </ListItem>
        ))}
      </List>
      <CardFooter className="pt-0">
        <Button
          fullWidth
          onClick={() => handleCreateCharacter()}
          style={{ backgroundImage: `url(${buttonBG})`, backgroundSize: 'auto' }}
          className="shadow-gray hover-shadow-sm hover:shadow-black hover:text-whimsiorange"
        >
          Create Character

        </Button>
      </CardFooter>
    </Card>
  );
}
const leftPanel = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695243090/paperLeft_uz9wcj.png';
const buttonBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695320647/button_mljj6c.png';
