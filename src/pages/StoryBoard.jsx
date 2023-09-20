import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import StickyNavbar from '../components/StickyNavbar';
import SelectCharacter from '../components/storyBoardComponents/selectCharacter';
import ActNavigation from '../components/storyBoardComponents/actNavigation';
import StoryBanner from '../components/storyBoardComponents/storyBanner';
import StorySection from '../components/storyBoardComponents/storySection';
import LiveChat from '../components/storyBoardComponents/liveChat';

export default function StoryBoard() {
  const location = useLocation();
  const storyId = location.pathname.split('/').pop();
  return (
    <div className="relative grid min-h-[100vh] w-screen p-8">
      <StickyNavbar />
      <div className="flex">
        <div id="left_column" className="flex-1">
          <SelectCharacter />
          <ActNavigation />
        </div>
        <div id="mid_column" className="flex-1">
          <StoryBanner storyId={storyId} />
          <StorySection />
        </div>
        <div id="right column" className="flex-1">
          <LiveChat storyId={storyId} />
        </div>

      </div>
    </div>
  );
}
