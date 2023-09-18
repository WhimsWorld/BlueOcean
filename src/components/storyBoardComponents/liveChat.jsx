import React from 'react';
import {
  Card,
  CardBody,
  Typography,
} from '@material-tailwind/react';

export default function LiveChat() {
  return (
    <Card className="mt-6 w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Live Chat
        </Typography>
      </CardBody>
    </Card>
  );
}
