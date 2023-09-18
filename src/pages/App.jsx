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
      <div className="grid grid-cols-[25%_50%_25%]">
        <div className="item1 border-solid border-2">
          {/*Left Column*/}
        </div>
        <div className="item2 border-solid border-2"></div>
          {/*Center Column*/}
        <div className="item3 border-solid border-2">
          {/*Right Column*/}
          <Categories />
          <Mystories />
          <Filter />
          <Search />
          <Leaderboard />
          <StoryCard />
        </div>
      </div>
    </div>
  );
}
