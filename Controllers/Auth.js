import { User } from "../Models/User.js";

// Bcrypt
import bcrypt from "bcrypt";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    // Compares plain text password with hashed password in database
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.log(err.message);
      }

      if (result) {
        res.status(200).json({ message: "success", user: user });
        return;
      }

      res.status(404).json({ message: `user with ${email} not found` });
    });
  } catch (error) {
    res.status(500).json({ message: "failed" });
    console.log(error.message);
  }
};
