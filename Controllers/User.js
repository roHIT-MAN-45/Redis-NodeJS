import { User } from "../Models/User.js";

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

    res.status(200).json({ message: "Success", data: user });
  } catch (error) {
    res.status(500).send({ error: "Error getting user" });
    console.log(error.message);
  }
};

export const createUser = async (req, res) => {
  const body = req.body;

  try {
    const user = new User(body);

    await user.save();

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
