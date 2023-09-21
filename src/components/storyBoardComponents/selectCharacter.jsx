import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import {
  Card, List, ListItem, ListItemPrefix, Avatar, Typography,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { loadCharactersByUserId } from '../../app/slices/characterSlice';

export default function SelectCharacter({ storyId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const characters = useSelector((state) => state.characters);

  const [loggedIn, setLoggedIn] = useState(Cookies.get('userId'));
  useEffect(() => {
    dispatch(loadCharactersByUserId(1));
  }, [dispatch]);
  console.log('logged in outside of function', loggedIn);
  const handleCreateCharacter = () => {
    console.log('logged in in selectChar', loggedIn);
    if (loggedIn) {
      navigate(`/characterCreation/${storyId}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <Card className="w-96">
      <List>
        {characters.map((character) => (
          <ListItem key={character.char_id}>
            <ListItemPrefix>
              <Avatar variant="circular" alt={character.name} src={character.image_id} />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">{character.name}</Typography>

              <div className="flex">
                <Typography variant="small" color="gray" className="font-normal" style={{ width: '5rem' }}>
                  strength:
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                  {character.strength}
                </Typography>
              </div>

              <div className="flex">
                <Typography variant="small" color="gray" className="font-normal" style={{ width: '5rem' }}>
                  weakness:
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                  {character.weakness}
                </Typography>
              </div>

              <Typography variant="small" color="gray" className="font-normal">
                {character.backstory}
              </Typography>
            </div>
          </ListItem>
        ))}
      </List>
      <button onClick={() => handleCreateCharacter() }>Create Character</button>

    </Card>
  );
}
