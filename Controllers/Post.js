import { Post } from "../Models/Post.js";
import { User } from "../Models/User.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});

    res.status(200).json({ message: "Success", data: posts });
  } catch (error) {
    res.status(500).send({ error: "Error getting posts" });
    console.log(error.message);
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);

    if (!post)
      return res.status(404).json({ message: `Post with ${id} not found` });

    res.status(200).json({ message: "Success", data: post });
  } catch (error) {
    res.status(500).send({ error: "Error getting post" });
    console.log(error.message);
  }
};

export const getUserPosts = async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await Post.find({ author: id }).cache({ key: id });

    res.status(200).json({ message: "Success", data: posts });
  } catch (error) {
    res.status(500).send({ error: "Error getting post" });
    console.log(error.message);
  }
};

export const createPost = async (req, res) => {
  const body = req.body;

  const user = req.user;

  try {
    const post = new Post(body);

    await post.save();

    user.posts.push(post._id);

    await user.save();

    res.status(201).json({ message: "Success", data: post });
  } catch (error) {
    res.status(500).send({ error: "Error creating post" });
    console.log(error.message);
  }
};

export const updatePost = async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  try {
    const post = await Post.findById(id);

    if (!post)
      return res.status(404).json({ message: `Post with ${id} not found` });

    Object.assign(post, body);

    await post.save();

    res.status(200).json({ message: "Success", data: post });
  } catch (error) {
    res.status(500).send({ error: "Error updating post" });
    console.log(error.message);
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  const currentUser = req.user;

  try {
    const user = await User.findById(currentUser._id);

    const post = await Post.findById(id);

    if (!post)
      return res.status(404).json({ message: `Post with ${id} not found` });

    await post.remove();

    user.posts.pull(id);

    await user.save();

    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).send({ error: "Error deleting post" });
  }
};
