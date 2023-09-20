import React, { useState } from 'react';
import StickyNavbar from '../components/StickyNavbar';
import PostCreationForm from '../components/postCreationComponents/postCreationForm';

export default function CreatePost() {
  return (
    <div>
      <StickyNavbar />
      <div className="flex justify-center">
        <PostCreationForm />
      </div>
    </div>
  );
}
