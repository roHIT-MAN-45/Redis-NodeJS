import { User } from "../Models/User.js";

export const requireAuth = async (req, res, next) => {
  const body = req.body;

  if (body.author !== "" || body.author !== null || body.author !== undefined) {
    const user = await User.findById(body.author);

    if (!user)
      return res
        .status(404)
        .json({ message: `User with id ${body.author} not found` });

    req.user = user;
    next();
  } else {
    req.user = null;
    next();
  }
};
