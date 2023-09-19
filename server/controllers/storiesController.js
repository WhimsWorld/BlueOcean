import * as storiesModel from '../models/storiesModel.js';

export const getStories = async (req, res) => {
  try {
    const stories = await storiesModel.getStories();
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
    res.status(500).send('Error retrieving stories.');
  }
};
