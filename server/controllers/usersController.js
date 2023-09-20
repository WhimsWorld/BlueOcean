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

export const addUser = async (req, res) => {
  console.log('userid', req.body);
  const userId = req.body.user_id;
  const username = req.body.display_name;
  // const { user_id: userId, username: display_name } = req.body;
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
