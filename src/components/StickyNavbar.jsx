import React, { useState } from 'react';
import {
  Navbar,
  Typography,
} from '@material-tailwind/react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function StickyNavbar({ loggedIn, setLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('userId');
    setLoggedIn(Cookies.get('userId'));
    navigate('/home');
  };
  return (
    <Navbar className="flex sticky top-0 h-max z-10 max-w-full pl-10 pr-10">
      <div className="flex items-center justify-self-start">
        <Typography
          as="a"
          href="/"
          className="cursor-pointer font-bold font-norican text-3xl text-whimsilightblue"
        >
          WhimsiWorld
        </Typography>
      </div>
      <div className="flex items-center group text-blue-gray-900 transition-all duration-300 ease-in-out" style={{ paddingLeft: 'calc((100% - 40%)/2)' }}>
        <Typography
          as="a"
          href="/"
          className={groupClass}
        >
          Home
        </Typography>
        {loggedIn ? (
          <Typography
            as="a"
            onClick={handleLogout}
            className={groupClass}
          >
            Logout
          </Typography>
        ) : (
          <Typography
            as="a"
            onClick={() => navigate('/login')}
            className={groupClass}
          >
            Login
          </Typography>
        )}
        <Typography
          as="a"
          href="/createStory"
          className={groupClass}
        >
          Create Story
        </Typography>
        <Typography
          as="a"
          href="/Signup"
          className={groupClass}
        >
          Sign Up
        </Typography>
      </div>
    </Navbar>
  );
}

export default StickyNavbar;

const groupClass = 'mr-4 cursor-pointer py-1.5 font-medium font-semibold font-poiret bg-left-bottom bg-gradient-to-r from-whimsilightblue to-whimsilightblue bg-[length:0%_2px] bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-500 ease-out active:bg-[length:100%_2px]';
