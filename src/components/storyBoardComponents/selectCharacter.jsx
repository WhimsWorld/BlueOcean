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
  const [loggedIn, setLoggedIn] = useState(Cookies.get('userId'));
  useEffect(() => {
    dispatch(loadCharactersByUserId(storyId));
  }, [dispatch]);

  const handleCreateCharacter = () => {
    console.log('logged in in selectChar', loggedIn);
    if (loggedIn) {
      navigate(`/characterCreation/${storyId}`);
    } else {
      navigate('/login');
    }
  };
  return (
    <Card
      className="rounded-l-xl w-full max-w-md mx-auto"
      style={{
        justifySelf: 'flex-end', backgroundImage: `url(${leftPanel})`, backgroundSize: 'auto', backgroundRepeat: 'round',
      }}
    >
      <List className="p-1 ">

        {characters.map((character) => (
          <ListItem key={character.char_id}>
            <ListItemPrefix className="self-top">
              <Avatar variant="circular" alt={character.char_name} src={character.image_url} />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">{character.char_name}</Typography>

              <div className="">
                <Typography variant="small" color="gray" className="font-normal">
                  <b>strength:</b>
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                  {character.strength}
                </Typography>
              </div>

              <div className="">
                <Typography variant="small" color="gray" className="font-normal">
                  <b>weakness:</b>
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                  {character.weakness}
                </Typography>
              </div>
              <Tooltip
                placement="right-start"
                className="w-96 bg-white text-black p-4 text-justify border ml-4"
                content={character.backstory}
              >
                <Button variant="text" className="text-left">Read Backstory →</Button>
              </Tooltip>
            </div>
          </ListItem>
        ))}
      </List>
      <CardFooter className="pt-0">
        <button onClick={() => handleCreateCharacter()}>Create Character</button>
      </CardFooter>
    </Card>
  );
}
const leftPanel = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695243090/paperLeft_uz9wcj.png';
