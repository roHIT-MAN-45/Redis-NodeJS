import express from "express";
import mongoose from "mongoose";
import env from "dotenv";
import cors from "cors";

import UserRouter from "./Routes/User.js";
import AuthRouter from "./Routes/Auth.js";
import PostRouter from "./Routes/Post.js";

import "./Utils/Cache.js";

env.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/post", PostRouter);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
    console.log("Connected to DB ⚡");
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  })
  .catch((error) => console.log(error.message));
