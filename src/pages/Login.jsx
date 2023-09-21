import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from '@material-tailwind/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Cookies from 'js-cookie';
import StickyNavbar from '../components/StickyNavbar';
import { auth } from '../utils/firebase';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const path = window.location.href.split('login')[1];
  async function toLogin(e) {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Cookies.set('userId', userCredential.user.uid, { expires: 1 });
        if (path.length > 5) {
          navigate(`${path}`);
        } else {
          navigate('/home');
        }
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <div className="h-screen bg-cover" style={{ backgroundImage: `url(${loginBg})` }}>
      <StickyNavbar />
      <Card
        className="w-96 m-auto mt-48 "
        style={{
          backgroundImage: `url(${cardBG})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
      >
        <CardHeader
          variant="gradient"
          className="my-4 grid h-28 place-items-center"
          style={{ backgroundImage: `url(${buttonBG})`, boxShadow: 'none' }}
        >
          <Typography variant="h3" color="white" className="font-logo" style={{ fontSize: '40px' }}>
            Login
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input label="Email" size="lg" onChange={(e) => setEmail(e.target.value)} />
          <Input label="Password" size="lg" onChange={(e) => setPassword(e.target.value)} />
          {/* <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div> */}
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth onClick={ toLogin } className="font-logo text-md" style={{ backgroundImage: `url(${buttonBG})`, boxShadow: 'none'}}>
            Sign in
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&#39;t have an account?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
              onClick={() => navigate('/signup')}
            >
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}

//styling assets
const loginBg = 'https://i.ibb.co/6bsxsgR/pirate3-min.png';
const buttonBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695229025/bronzetexture_cc3urf.webp';
const cardBG = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695235263/paper2_kag1pb.jpg';
