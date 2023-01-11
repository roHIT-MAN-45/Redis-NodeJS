import { User } from "../Models/User.js";

// Bcrypt
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate("posts");

    res.status(200).json({ message: "Success", data: users });
  } catch (error) {
    res.status(500).send({ error: "Error getting users" });
    console.log(error.message);
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user)
      return res.status(404).json({ message: `User with ${id} not found` });

    res.status(200).json({ message: "Success", user: user });
  } catch (error) {
    res.status(500).send({ error: "Error getting user" });
    console.log(error.message);
  }
};

export const createUser = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  // The more rounds the more strong password
  const saltRounds = 10;
  try {
    let user;
    // Hashing password before storing it in DB
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        user = new User({
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          email: email,
          password: hash,
        });

        user.save();
      });
    });

    res.status(201).json({ message: "Success", data: user });
  } catch (error) {
    res.status(500).send({ error: "Error creating user" });
    console.log(error.message);
  }
};

export const updateUser = async (req, res) => {
  const body = req.body;
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user)
      return res.status(404).json({ message: `User with ${id} not found` });

    Object.assign(user, body);

    await user.save();

    res.status(200).json({ message: "Success", data: user });
  } catch (error) {
    res.status(500).send({ error: "Error updating user" });
    console.log(error.message);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user)
      return res.status(404).json({ message: `User with ${id} not found` });

    await user.remove();

    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).send({ error: "Error deleting user" });
  }
};
