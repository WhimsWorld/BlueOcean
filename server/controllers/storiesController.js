// eslint-disable-next-line import/extensions
import * as storiesModel from '../models/storiesModel.js';

export const getStories = async (req, res) => {
  let catStory = null; // can rewrite as catStory = req.query.category || null;
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

export const getCategory = async (req, res) => {
  const { storyID } = req.query;
  try {
    const category = await storiesModel.getCategory(storyID);
    res.json(category);
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

export const getLikesByStoryId = async (req, res) => {
  try {
    const { storyId } = req.params;
    const likes = await storiesModel.getLikes(storyId);
    res.status(200).json(likes);
  } catch (err) {
    res.status(500).send('Error retrieving likes for the story');
  }
};

export const getMaxCharacters = async (req, res) => {
  try {
    const { storyID } = req.query;
    const maxCharCount = await storiesModel.getMaxCharacters(storyID);
    res.status(200).json(maxCharCount);
  } catch (err) {
    res.status(500).send('Error retrieving max character limit for the story');
  }
};

export const getCharactersCount = async (req, res) => {
  try {
    const { storyID } = req.query;
    const charCount = await storiesModel.getCharactersCount(storyID);
    res.status(200).json(charCount);
  } catch (err) {
    res.status(500).send('Error retrieving char count for the story');
  }
};
