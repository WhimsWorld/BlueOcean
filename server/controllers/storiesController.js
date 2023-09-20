// eslint-disable-next-line import/extensions
import * as storiesModel from '../models/storiesModel.js';

export const getStories = async (req, res) => {
  let catStory = null;
  let user = null;
  if (req.query.category) {
    catStory = req.query.category;
  }
  const filterStory = req.query.filter;
  const myStories = req.query.myStoriesFilter;
  if (req.query.userId) {
    user = req.query.userId;
  }
  try {
    const stories = await storiesModel.getStories(catStory, filterStory, myStories, user);
    res.json(stories);
  } catch (err) {
    res.status(500).send('Error retrieving stories.');
  }
};

export const getSearch = async (req, res) => {
  let catStory = null;
  if (req.query.category) {
    catStory = req.query.category;
  }
  const filterStory = req.query.filter;
  const searchQuery = req.query.search;
  try {
    const stories = await storiesModel.getSearch(catStory, filterStory, searchQuery);
    res.json(stories);
  } catch (err) {
    res.status(500).send('Error retrieving stories.');
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await storiesModel.getCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).send('Error retrieving stories');
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await storiesModel.getLeaderboard();
    res.json(leaderboard);
  } catch (err) {
    res.status(500).send('Error retrieving stories.like_count');
  }
};

export const getStoryById = async (req, res) => {
  const { storyId } = req.params;

  try {
    const story = await storiesModel.getStoryById(storyId);
    res.json(story);
  } catch (err) {
    res.status(500).send('Error retrieving story.');
  }
};

export const getLikedStories = async (req, res) => {
  const { userId } = req.query;
  try {
    const liked = await storiesModel.getLikedStories(userId);
    res.json(liked);
  } catch (err) {
    res.status(500).send('Error retriveiving liked stories');
  }
};

export const postLikedStory = async (req, res) => {
  const { userId, storyId } = req.body;

  try {
    const liked = await storiesModel.postLikedStory(userId, storyId);
    res.json(liked);
  } catch (err) {
    res.status(500).send('Error retriveiving liked stories');
  }
};

export const deleteLikedStory = async (req, res) => {
  const { userId, storyId } = req.body;
  try {
    const liked = await storiesModel.deleteLikedStory(userId, storyId);
    res.json(liked);
  } catch (err) {
    res.status(500).send('Error retriveiving liked stories');
  }
};
