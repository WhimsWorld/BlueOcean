import * as userModel from '../models/usersModel.js';

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
    console.log(err);
    res.status(500).send('Error retrieving user.');
  }
};

export const addUser = async (req, res) => {
  try {
    const user = await userModel.addUser(req.body.username);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).send('Cannot add user.');
  }
};
