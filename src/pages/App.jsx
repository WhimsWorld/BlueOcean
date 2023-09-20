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
  const [likedStories, setLikedStories] = useState({});
  const [likeUpdate, setLikeUpdate] = useState('');
  const [isChecked, setIsChecked] = useState(showCheck);

  useEffect(() => {
    axios.get('/api/leaderboard')
      .then((response) => {
        setLeaderboard(response.data);
      });
  }, [likeUpdate]);

  useEffect(() => {
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
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const dataParams = {
      params: {
        userId: 'user3_id', //need to update this later
      },
    };
    axios.get('api/likes', dataParams)
      .then((response) => {
        setLikedStories(response.data);
      })
      .catch(() => {});
  }, []); //can i base this on a change of user in redux?

  // const storyId = useSelector((state) => state.story.storyId);

  useEffect(() => {
    const dataParams = {
      params: {
        category,
        filter,
        myStoriesFilter,
        userId: 'user3_id', //need to update this later
      },
    };
    axios.get('/api/stories', dataParams)
      .then((response) => {
        setStories(response.data);
      })
      .catch(() => {});
  }, [category, filter, myStoriesFilter, likeUpdate]);

  return (
    <div>
      <StickyNavbar />
      <div className="grid grid-cols-[25%_50%_25%]">
        <div className="item1 border-solid border-2 bg-auto grid" style={{ backgroundImage: `url(${left})` }}>
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
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            setMyStoriesFilter={setMyStoriesFilter}
          />
          <Filter setFilter={setFilter} />
          <Search
            category={category}
            filter={filter}
            myStoriesFilter={myStoriesFilter}
            setIsChecked={setIsChecked}
            setMyStoriesFilter={setMyStoriesFilter}
            setNoCheck={setNoCheck}
            setStories={setStories}
          />
          {stories.map((story) => (
            <StoryCard
              story={story}
              likedStories={likedStories}
              likeUpdate={likeUpdate}
              setLikeUpdate={setLikeUpdate}
              setLikedStories={setLikedStories}
              key={story.story_id}
            />
          ))}
        </div>
        <div className="item3 border-solid border-2 bg-auto" style={{ backgroundImage: `url(${right})` }}>
          <Leaderboard leaderboard={leaderboard} />
        </div>
      </div>
    </div>
  );
}

// imageURLs for background panels Categories and LeaderBoard
const left = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695191085/imgonline-com-ua-TextureSeamless-MkFWyZCWhQi_btfbva.png';
const right = 'https://res.cloudinary.com/dnr41r1lq/image/upload/v1695192325/image_uot0j6.png';
