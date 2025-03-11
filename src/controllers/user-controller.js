/**
 * Fetches all users from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
// const getUsers = async (req, res) => {};

/**
 * Fetches a user by their ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>}
 */
//const getUserById = async (req, res, next) => {};

/**
 * Adds a new user to the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>}
 */
//const addUser = async (req, res, next) => {};

/**
 * Edits an existing user by their ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
//const editUser = (req, res) => {};

/**
 * Deletes a user by their ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
//const deleteUser = (req, res) => {};

import bcrypt from 'bcryptjs';
//import {validationResult} from 'express-validator';
import {
  insertUser,
  selectAllUsers,
  selectUserById,
} from '../models/user-model.js';
import {customError} from '../middlewares/error-handler.js';


// kaikkien käyttäjätietojen haku
const getUsers = async (req, res) => {
  // in real world application, password properties should never be sent to client
  const users = await selectAllUsers();
  res.json(users);
};

// Userin haku id:n perusteella
const getUserById = async (req, res, next) => {
  console.log('getUserById', req.params.id);

  try {
    const user = await selectUserById(req.params.id);
    console.log('User found:', user);
    // jos user löytyi, eli arvo ei ole undefined, lähetetään se vastauksena
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    next(error);
  }
};

// käyttäjän lisäys (rekisteröinti)
const addUser = async (req, res, next) => {
  console.log('addUser request body', req.body);
  // esitellään 3 uutta muuttujaa, johon sijoitetaan req.body:n vastaavien propertyjen arvot
  const {username, password, email} = req.body;
  // luodaan selväkielisestä sanasta tiiviste, joka tallennetaan kantaan
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // luodaan uusi käyttäjä olio ja lisätään se tietokantaa käyttäen modelia
  const newUser = {
    username,
    password: hashedPassword,
    email,
  };
  try {
    const result = await insertUser(newUser);
    res.status(201);
    return res.json({message: 'New user added. id: ' + result});
  } catch (error) {
    return next(customError(error.message, 400));
  }
};

// Userin muokkaus id:n perusteella (TODO: käytä DB)
const editUser = async (req, res) => {
  console.log('editUser request body', req.body);
  const users = await selectAllUsers();
  const user = users.find((user) => user.id == req.params.id);
  if (user) {
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    res.json({message: 'User updated.'});
  } else {
    res.status(404).json({message: 'User not found'});
  }
};

// Userin poisto id:n perusteella (TODO: käytä DB)
const deleteUser = async (req, res) => {
  console.log('deleteUser', req.params.id);
  const users = await selectAllUsers();
  const index = users.findIndex((user) => user.id == req.params.id);
  //console.log('index', index);
  // findIndex returns -1 if user is not found
  if (index !== -1) {
    // remove one user from array based on index
    users.splice(index, 1);
    res.json({message: 'User deleted.'});
  } else {
    res.status(404).json({message: 'User not found'});
  }
};

export {getUsers, getUserById, addUser, editUser, deleteUser};
