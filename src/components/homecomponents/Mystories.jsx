import React from 'react';
import { Checkbox } from '@material-tailwind/react';

export default function Mystories({ myStoriesFilter, showCheck, setMyStoriesFilter }) {
  const clickHandler = () => {
    if (myStoriesFilter) {
      setMyStoriesFilter(false);
    } else {
      setMyStoriesFilter(true);
    }
  };
  return (
    <Checkbox
      label="My Stories"
      color="indigo"
      disabled={showCheck}
      onClick={clickHandler}
    />
  );
}
