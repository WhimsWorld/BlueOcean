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
  const [filter, setFilter] = useState('Top');
  const [styleSel, setStyelSel] = useState('red');

  useEffect(() => {
    const data = {
      data: {
        categoryStory: { category },
        filterStory: { filter },
        // userId: { userId },
      },
    };

    axios.get('/api/stories')
      .then((response) => {
        setStories(response.data);
      });
    axios.get('/api/categories')
      .then((response) => {
        const tempCategories = response.data;
        for (let i = 0; i < tempCategories.length; i += 1) {
          tempCategories[i].selected = false;
          tempCategories[i].style = 'white';
        }

        const all = {
          name: 'All Categories',
          selected: true,
        };
        tempCategories.unshift(all);
        tempCategories[0].style = 'red';
        setCategories(tempCategories);
      });
  }, []);

  return (
    <div>
      <StickyNavbar />
      <div className="grid grid-cols-[25%_50%_25%]">
        <div className="item1 border-solid border-2">
          <Categories
            categories={categories}
            styleSel={styleSel}
            setCategory={setCategory}
            setCategories={setCategories}
          />
        </div>
        <div className="item2 border-solid border-2">
          <Mystories />
          <Filter />
          <Search />
          {stories.map((story, i) => <StoryCard story={story} />)}
        </div>
        <div className="item3 border-solid border-2">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}
