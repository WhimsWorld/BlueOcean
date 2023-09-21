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
          backgroundImage: `url(${buttonBG})`, backgroundSize: 'auto', opacity: 0.8, fontSize: '14px', color: 'white', width: '260px', marginLeft: '20px',
        }}
        >
          Select a Sound
        </Button>
      </MenuHandler>
      <MenuList className="max-h-96">
        {sounds.map((sound) => (
          <MenuItem
            key={sound.id}
            onClick={() => clickHandler(sound)}
          >
            {sound.id}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

const buttonBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695229025/bronzetexture_cc3urf.webp';