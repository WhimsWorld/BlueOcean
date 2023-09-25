import React from 'react';
import { Avatar } from '@material-tailwind/react';

export default function GifsMenu({ gifs, selectedGif, setSelectedGif }) {
  const clickHandler = (gifId) => {
    setSelectedGif(gifId === selectedGif ? null : gifId);
  };

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {gifs.map((gif) => (
        <Avatar
          key={gif.id}
          src={gif.url}
          style={{
            border: selectedGif === gif.id ? 'solid 3px teal' : 'solid 3px transparent',
            cursor: 'pointer',
          }}
          size="lg"
          onClick={() => clickHandler(gif.id)}
        />
      ))}
    </div>
  );
}
