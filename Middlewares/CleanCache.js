import { clearHash } from "../Utils/Cache.js";

export const cleanCache = async (req, res, next) => {
  await next();

  const user = req.user;

  clearHash(user._id);
};
