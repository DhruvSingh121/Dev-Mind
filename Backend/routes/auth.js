import bcrypt from "bcrypt";
import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// SIGN UP

router.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      return res.status(400).json({ message: "User Already Exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();
    console.log("Signup password:", password);
    return res.status(201).json({ message: "User Saved !!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// LOGIN

router.post("/login", async (req, res) => {
  try {
    let { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Entered Pass:", password);
    console.log("Stored Pass:", user.password);
    console.log("Match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Password Incorrect" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "login Successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

export default router;
