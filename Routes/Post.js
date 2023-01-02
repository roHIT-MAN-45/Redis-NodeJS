import express from "express";
import {
  getAllPosts,
  getPost,
  getUserPosts,
  createPost,
  updatePost,
  deletePost,
} from "../Controllers/Post.js";

import { cleanCache } from "../Middlewares/CleanCache.js";
import { requireAuth } from "../Middlewares/RequireAuth.js";

const router = express.Router();

router.get("/", getAllPosts);

router.get("/:id", getPost);

router.get("/user/:id", getUserPosts);

router.post("/create", requireAuth, cleanCache, createPost);

router.patch("/:id", updatePost);

router.delete("/:id", deletePost);

export default router;
