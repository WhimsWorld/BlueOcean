import React from 'react';
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
          onClick={() => navigate('/')}
          style={{ zIndex: 2 }}
          className="cursor-pointer font-bold font-norican text-3xl text-whimsilightblue"
        >
          WhimsiWorld
        </Typography>
      </div>
      <div className="flex items-center justify-center flex-grow" style={{ marginLeft: '-155px' }}>
        <Typography
          style={{ fontSize: '20px', color: 'black' }} // Added color property to set text to black
          as="a"
          href="/home"
          className={groupClass}
        >
          Home
        </Typography>
        {loggedIn ? (
          <Typography
            style={{ fontSize: '20px', color: 'black' }} // Added color property to set text to black
            as="a"
            href="/createStory"
            className={groupClass}
          >
            Create Story
          </Typography>
        ) : null}
        {loggedIn ? (
          <Typography
            style={{ fontSize: '20px', color: 'black' }} // Added color property to set text to black
            as="a"
            onClick={handleLogout}
            className={groupClass}
          >
            Logout
          </Typography>
        ) : (
          <Typography
            style={{ fontSize: '20px', color: 'black' }} // Added color property to set text to black
            as="a"
            onClick={() => navigate('/login')}
            className={groupClass}
          >
            Login
          </Typography>
        )}
        {!loggedIn ? (
          <Typography
            style={{ fontSize: '20px', color: 'black' }} // Added color property to set text to black
            as="a"
            href="/Signup"
            className={groupClass}
          >
            Sign Up
          </Typography>
        ) : null}
      </div>
    </Navbar>
  );
}

export default StickyNavbar;

const groupClass = 'mr-4 cursor-pointer py-1.5 font-medium font-semibold font-poiret bg-left-bottom bg-gradient-to-r from-whimsilightblue to-whimsilightblue bg-[length:0%_2px] bg-no-repeat hover:bg-[length:100%_2px] transition-all duration-500 ease-out active:bg-[length:100%_2px]';
