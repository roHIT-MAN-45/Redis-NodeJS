import express from "express";
import mongoose from "mongoose";
import env from "dotenv";

import UserRouter from "./Routes/User.js";
import PostRouter from "./Routes/Post.js";

import "./Utils/Cache.js";

env.config();

const app = express();

app.use(express.json());

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/post", PostRouter);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
    console.log("Connected to DB ⚡");
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  })
  .catch((error) => console.log(error.message));
