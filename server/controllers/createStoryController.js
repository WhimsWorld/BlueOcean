import * as createStoryModel from '../models/createStoryModel.js';

export const getAllThemeImages = async (req, res) => {
  try {
    const images = await createStoryModel.getThemeImages();
    res.json(images);
  } catch (err) {
    res.status(500).send('Error retrieving theme images.');
  }
};

export const getAllThumbnailImages = async (req, res) => {
  try {
    const images = await createStoryModel.getThumbnailImages();
    res.json(images);
  } catch (err) {
    res.status(500).send('Error retrieving thumbnail images.');
  }
};

export const getAllGifs = async (req, res) => {
  try {
    const images = await createStoryModel.getGifs();
    res.json(images);
  } catch (err) {
    res.status(500).send('Error retrieving thumbnail images.');
  }
};

export const addStory = async (req, res) => {
  try {
    const story = await createStoryModel.createStory(req.body);
    res.json(story);
  } catch (err) {
    res.status(500).send('Error posting story');
  }
};
