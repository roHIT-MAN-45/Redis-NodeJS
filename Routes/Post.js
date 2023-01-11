import express from "express";

// Controllers
import {
  getAllPosts,
  getPost,
  getUserPosts,
  createPost,
  updatePost,
  deletePost,
} from "../Controllers/Post.js";

// Middlewares
import { cleanCache } from "../Middlewares/CleanCache.js";
import { requireAuth } from "../Middlewares/RequireAuth.js";

const router = express.Router();

router.get("/", getAllPosts);

router.get("/:id", getPost);

router.get("/social/:id", getUserPosts);

router.post("/create", requireAuth, cleanCache, createPost);

router.patch("/:id", requireAuth, cleanCache, updatePost);

router.delete("/:id", requireAuth, cleanCache, deletePost);

export default router;
