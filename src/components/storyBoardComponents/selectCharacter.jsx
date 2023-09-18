import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card, List, ListItem, ListItemPrefix, Avatar, Typography,
} from '@material-tailwind/react';
import { loadCharactersByUserId } from '../../app/slices/characterSlice';

export default function SelectCharacter() {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters);

  useEffect(() => {
    dispatch(loadCharactersByUserId(1));
  }, [dispatch]);

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
              <Typography variant="small" color="gray" className="font-normal">
                {character.backstory}
              </Typography>
            </div>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
