import React, { useState } from 'react';
import StickyNavbar from '../components/StickyNavbar';
import StoryCreationForm from '../components/storyCreationComponents/StoryCreationForm';

export default function CreateStory() {
  return (
    <div>
      <StickyNavbar />
      <div className="flex justify-center">
        <StoryCreationForm />
      </div>
    </div>
  );
}
