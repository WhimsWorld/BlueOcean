import React, { useState, useEffect } from 'react';

import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react';

export default function SoundsMenu({ sounds, setSelectedSound }) {
  const clickHandler = ((sound) => {
    setSelectedSound(sound);
  });

  return (
    <Menu>
      <MenuHandler>
        <Button style={{
          backgroundImage: `url(${buttonBG})`, backgroundSize: 'auto', fontSize: '14px', color: 'white', width: '260px', marginLeft: '20px',
        }}
        >
          Select a Sound
        </Button>
      </MenuHandler>
      <MenuList className="max-h-96">
        {sounds.map((sound) => (
          <MenuItem
            key={sound.name}
            onClick={() => clickHandler(sound)}
          >
            {sound.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

const buttonBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695320647/button_mljj6c.png';
