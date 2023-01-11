import express from "express";

// Controllers
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../Controllers/User.js";

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getUser);

router.post("/create", createUser);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
