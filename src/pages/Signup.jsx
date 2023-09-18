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
import { NavLink, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function toSubmit(e) {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        console.log('user: ', userCredential);
        navigate('/login');
      // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  }
  return (
    <Card className="w-96">
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Sign Up
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

        <Button variant="gradient" fullWidth onClick={toSubmit()}>
          Sign Up
        </Button>
        <Typography variant="small" className="mt-6 flex justify-center">
          Already have an account?
          <Typography
            as="a"
            href="#signup"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
            onClick={navigate('/login')}
          >
            Sign in
          </Typography>
        </Typography>
      </CardFooter>
    </Card>
  );
}
