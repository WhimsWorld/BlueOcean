import React from 'react';
import Leaderboard from '../components/homecomponents/Leaderboard';
import StoryCard from '../components/homecomponents/StoryCard';
import StickyNavbar from '../components/StickyNavbar';
import Filter from '../components/homecomponents/Filter';
import Search from '../components/homecomponents/Search';
import Mystories from '../components/homecomponents/Mystories';
import Categories from '../components/homecomponents/Categories';

export default function App() {
  return (
    <div>
      <StickyNavbar />
      <Categories />
      <Mystories />
      <Filter />
      <Search />
      <Leaderboard />
      <StoryCard />
    </div>
  );
}
