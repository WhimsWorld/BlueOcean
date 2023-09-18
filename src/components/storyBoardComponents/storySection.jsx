import React from 'react';
import {
  Card,
  CardBody,
  Typography,
} from '@material-tailwind/react';

export default function StorySection() {
  return (
    <Card className="mt-6 w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
            Story Section
            <audio className="player" controls preload="none">
              <source src="https://docs.google.com/uc?export=open&id=1B87ZLqTN741x7cwK_iH8rFyvbjKY9uRo" type="audio/mp3" />
            </audio>
        </Typography>
      </CardBody>
    </Card>
  );
}
