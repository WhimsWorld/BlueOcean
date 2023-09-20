import React, { useEffect } from 'react';
import { Checkbox } from '@material-tailwind/react';

export default function Mystories({
  myStoriesFilter, showCheck, setMyStoriesFilter, isChecked, setIsChecked,
}) {
  const clickHandler = () => {
    isChecked ? setIsChecked(false) : setIsChecked(true); // Toggle the isChecked state
  };

  useEffect(() => {
    setMyStoriesFilter(isChecked);
  }, [isChecked, setMyStoriesFilter]);

  return (
    <Checkbox
      label="My Stories"
      color="indigo"
      disabled={showCheck}
      checked={isChecked}
      onClick={clickHandler}
    />
  );
}
