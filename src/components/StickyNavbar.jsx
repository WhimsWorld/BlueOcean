import React from 'react';
import {
  Navbar,
  Typography,
} from '@material-tailwind/react';

function StickyNavbar() {
  return (
    <Navbar className="flex sticky top-0 h-max z-10 max-w-full pl-10 pr-10">
      <div className="flex items-center text-blue-gray-900 justify-self-start">
        <Typography
          as="a"
          href="/"
          className="cursor-pointer font-bold"
        >
          WhimsiWorld
        </Typography>
      </div>
      <div className="flex items-center text-blue-gray-900" style={{ paddingLeft: 'calc((100% - 35%)/2)' }}>
        <Typography
          as="a"
          href="/"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Home
        </Typography>
        <Typography
          as="a"
          href="/login"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Login
        </Typography>
        <Typography
          as="a"
          href="/createStory"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Create Story
        </Typography>
        <Typography
          as="a"
          href="/Signup"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Sign Up
        </Typography>
      </div>
    </Navbar>
  );
}

export default StickyNavbar;
