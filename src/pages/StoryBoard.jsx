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
    <div>
      <StickyNavbar />
      <div className="grid grid-cols-[25%_50%_25%]">
        <div className="item1 border-solid border-2 bg-auto grid" style={{ backgroundImage: `url(${left})` }}>
          <SelectCharacter storyId={storyId} />
          {/* <ActNavigation /> */}
        </div>
        <div id="mid_column" className="flex-1">
          <StoryBanner storyId={storyId} />
          <StorySection />
        </div>
        <div className="item3 border-solid border-2 bg-auto" style={{ backgroundImage: `url(${right})` }}>
          <LiveChat storyId={storyId} />
        </div>
      </div>
    </div>
  );
}

// imageURLs for background panels Categories and LeaderBoard
const left = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695191085/imgonline-com-ua-TextureSeamless-MkFWyZCWhQi_btfbva.png';
const right = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695192325/image_uot0j6.png';
const storybg = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695235263/paper2_kag1pb.jpg';
