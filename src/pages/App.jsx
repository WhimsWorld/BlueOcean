import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Leaderboard from '../components/homecomponents/Leaderboard';
import StoryCard from '../components/homecomponents/StoryCard';
import StickyNavbar from '../components/StickyNavbar';
import Filter from '../components/homecomponents/Filter';
import Search from '../components/homecomponents/Search';
import Mystories from '../components/homecomponents/Mystories';
import Categories from '../components/homecomponents/Categories';

export default function App() {
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [stories, setStories] = useState([]);
  const [myStoriesFilter, setMyStoriesFilter] = useState(false);
  const [filter, setFilter] = useState('Top');
  const [leaderboard, setLeaderboard] = useState([]);
  const [showCheck, setNoCheck] = useState(false);

  useEffect(() => {
    axios.get('/api/leaderboard')
      .then((response) => {
        setLeaderboard(response.data);
      });
    axios.get('/api/categories')
      .then((response) => {
        const tempCategories = response.data;
        for (let i = 0; i < tempCategories.length; i += 1) {
          tempCategories[i].selected = false;
        }
        const all = {
          cat_name: 'All Categories',
          selected: true,
        };
        tempCategories.unshift(all);
        setCategories(tempCategories);
      });
  }, []);

  useEffect(() => {
    const dataParams = {
      params: {
        category,
        filter,
        myStoriesFilter,
        userId: "user3_id", //need to update this later
      },
    };

    axios.get('/api/stories', dataParams)
      .then((response) => {
        setStories(response.data);
      });
  }, [category, filter, myStoriesFilter]);

  return (
    <div>
      <StickyNavbar />
      <div className="grid grid-cols-[25%_50%_25%]">
        <div className="item1 border-solid border-2">
          <Categories
            category={category}
            categories={categories}
            setCategory={setCategory}
            setCategories={setCategories}
          />
        </div>
        <div className="item2 border-solid border-2">
          <Mystories
            showCheck={showCheck}
            myStoriesFilter={myStoriesFilter}
            setMyStoriesFilter={setMyStoriesFilter}
          />
          <Filter setFilter={setFilter} />
          <Search
            category={category}
            filter={filter}
            setNoCheck={setNoCheck}
            setStories={setStories}
          />
          {stories.map((story) => <StoryCard story={story} key={story.story_id} />)}
        </div>
        <div className="item3 border-solid border-2">
          <Leaderboard leaderboard={leaderboard} />
        </div>
      </div>
    </div>
  );
}
