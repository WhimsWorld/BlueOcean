import React from 'react';
import {
  Card,
  Input,
  Textarea,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function StoryCreationForm() {
  return (
    <Card color="transparent" shadow={false} className="w-2/3 mt-1">
      <Typography variant="h4" color="blue-gray">
        Create a new Story
      </Typography>
      <form className="mt-8 mb-2 w-full max-w-screen-lg ">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Title" />
          <Textarea variant="outlined" label="Description" />
          <Input size="lg" label="Image URL" />
          <Input size="lg" label="Thumbnail URL" />
        </div>
        <Button className="mt-6">
          Create
        </Button>
      </form>
    </Card>
  );
}
