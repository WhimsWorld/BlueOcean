import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from '@material-tailwind/react';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import axios from 'axios';
import { auth } from '../utils/firebase';
import StickyNavbar from '../components/StickyNavbar';

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uid, setUID] = useState('');
  const addUser = (userID) => {
    axios.post('/api/users', {
      user_id: userID,
      display_name: username,
    })
      .then(() => console.log('successful post'))
      .catch((err) => console.log(err));
  };

  async function toSubmit(e) {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        addUser(userCredential.user.uid);
        navigate('/login');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
  return (
    <div>
      <StickyNavbar />
      <Card className="w-96" style={{margin: 'auto' }}>
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography
            variant="h3"
            color="white"
          >
            Sign Up
          </Typography>
        </CardHeader>
        <CardBody
          className="flex flex-col gap-4"
        >
          <Input
            label="Username"
            size="lg"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label="Email"
            size="lg"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            size="lg"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </CardBody>
        <CardFooter className="pt-0">

          <Button
            variant="gradient"
            fullWidth
            onClick={toSubmit}
          >
            Sign Up
          </Button>
          <Typography
            variant="small"
            className="mt-6 flex justify-center"
          >
            Already have an account?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
              onClick={() => navigate('/login')}
            >
              Sign in
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}
