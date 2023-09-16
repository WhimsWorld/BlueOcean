import React from 'react';
import {
  Navbar,
  Typography,
} from '@material-tailwind/react';

function StickyNavbar() {
  return (
    <Navbar className="sticky top-0 h-max max-w-full">
      <div className="flex items-center justify-center text-blue-gray-900">
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
          href="/StoryBoard"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Current Story
        </Typography>
      </div>
    </Navbar>
  );
}

export default StickyNavbar;
