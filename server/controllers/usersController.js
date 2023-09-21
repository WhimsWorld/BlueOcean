import * as userModel from '../models/usersModel.js';
import * as characterModel from '../models/characterModel.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).send('Error retrieving users.');
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found.');
    }
  } catch (err) {
    res.status(500).send('Error retrieving user.');
  }
};

export const getCharactersByStoryId = async (req, res) => {
  try {
    const characters = await characterModel.getCharactersByStoryId(req.params.storyId);
    res.json(characters);
  } catch (err) {
    res.status(500).send('Error retrieving characters.');
  }
};

export const addUser = async (req, res) => {
  const userId = req.body.user_id;
  const username = req.body.display_name;
  userModel.addUser(userId, username)
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
};

export const getCharacters = async (req, res) => {
  try {
    const characters = await characterModel.getAllCharacters();
    res.json(characters);
  } catch (err) {
    res.status(500).send('Error retrieving characters.');
  }
};

export const getCharactersByUserId = async (req, res) => {
  try {
    const characters = await characterModel.getCharactersByUserId(req.params.userId);
    res.json(characters);
  } catch (err) {
    res.status(500).send('Error retrieving characters.');
  }
};

export const addCharacter = async (req, res) => {
  console.log('reqs are', req.body);
  try {
    const character = await characterModel.addCharacter(req.body);
    res.status(201).json(character);
  } catch (err) {
    res.status(500).send('Cannot add character.');
  }
};

export const getImages = async (req, res) => {
  try {
    const images = await characterModel.getImages();
    res.send(images);
  } catch (err) {
    res.sendStatus(404);
  }
};

export const updateUserPremiumStatus = async (req, res) => {
  const { premium } = req.body; // Extract the premium value from request body

  if (typeof premium !== 'boolean') {
    return res.status(400).send('Invalid premium value. Expected a boolean.');
  }

  try {
    const result = await userModel.updateUserPremiumStatus(req.params.userId, premium);
    if (result) {
      res.json({ message: `User premium status set to ${premium}.` });
    } else {
      res.status(404).send('User not found.');
    }
  } catch (err) {
    res.status(500).send('Error updating user premium status.');
  }
};
