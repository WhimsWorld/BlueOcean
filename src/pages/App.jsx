import React from 'react';
import Leaderboard from '../components/Leaderboard';
import StoryCard from '../components/StoryCard';
import StickyNavbar from '../components/StickyNavbar';

export default function App() {
  return (
    <div>
      <StickyNavbar />
      <Leaderboard />
      <StoryCard />
    </div>
  );
}
