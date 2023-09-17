import React, { useState } from 'react';
import { Checkbox } from '@material-tailwind/react';

export default function Mystories() {
  const [storyState, setStoryState] = useState(false);

  const clickHandler = () => {
    if (storyState) {
      setStoryState(false);
    } else {
      setStoryState(true);
    }
  };
  return <Checkbox label="My Stories" color="indigo" onClick={clickHandler} />;
}
