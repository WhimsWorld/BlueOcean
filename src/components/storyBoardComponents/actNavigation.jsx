import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';

export default function ActNavigation() {
  return (
    <Card className="mt-6 w-full max-w-md mx-auto">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Act Navigation
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button>Read More</Button>
      </CardFooter>
    </Card>
  );
}
