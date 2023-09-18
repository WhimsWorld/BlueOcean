import React, { useState } from 'react';
import StickyNavbar from '../components/StickyNavbar';
import SelectCharacter from '../components/storyBoardComponents/selectCharacter';
import ActNavigation from '../components/storyBoardComponents/actNavigation';
import StoryBanner from '../components/storyBoardComponents/storyBanner';
import StorySection from '../components/storyBoardComponents/storySection';
import LiveChat from '../components/storyBoardComponents/liveChat';

export default function StoryBoard() {
  return (
    <div className="relative grid min-h-[100vh] w-screen p-8">
      <StickyNavbar />
      <div className="flex">
        <div id="left_column" className="flex-1">
          <SelectCharacter />
          <ActNavigation />
        </div>
        <div id="mid_column" className="flex-1">
          <StoryBanner />
          <StorySection />
        </div>
        <div id="right column" className="flex-1">
          <LiveChat />
        </div>

      </div>
    </div>
  );
}
