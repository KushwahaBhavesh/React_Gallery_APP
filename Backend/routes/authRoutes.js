import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModels from "../models/userModels.js";
import { authenticate } from "../middleware/authMiddleware.js";

const route = express.Router();
// Route: POST /api/auth/signup
// Description: Register a new user

route.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(200).json({
        success: false,
        msg: "Invalid Email & Password",
      });
    }

    let user = await userModels.findOne({ email });
    if (user) {
      return res
        .status(200)
        .json({ success: false, msg: "User already exists" });
    }

    user = new userModels({
      email,
      password,
    });

    // encrypting password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    return res
      .status(201)
      .json({ success: true, msg: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Server Error",
    });
  }
});

// Route: POST /api/auth/login
// Description: Authenticate user and get JWT token
route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(200).json({
        success: false,
        msg: "Invalid Email & Password",
      });
    }

    let user = await userModels.findOne({ email });
    if (user) {
      const isPassword = await bcrypt.compare(password, user.password);
      if (isPassword) {
        const accesstoken = jwt.sign(
          { userId: user.id },
          process.env.USER_SECRET_KEY,
          { expiresIn: "2h" }
        );
        const refreshToken = jwt.sign(
          { userId: user.id },
          process.env.USER_REFRESH_SECRET_KEY,
          { expiresIn: "2h" }
        );
        res.cookie("accessToken", accesstoken);
        res.cookie("refreshToken", refreshToken, {
          maxAge: 300000,
          httpOnly: true,
        });
        return res.status(200).json({
          success: true,
          msg: "Login Successful",
          user,
          accesstoken,
        });
      } else {
        return res
          .status(200)
          .json({ success: false, msg: "Invalid Password" });
      }
    } else {
      return res
        .status(200)
        .json({ success: false, msg: "Email Not Registered" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Server Error",
    });
  }
});

// protected route htmlFor using verify token

route.get("/protected", authenticate, (req, res) => {
   return res.status(200).json({ success: true, msg: "Authenticated route", user: req.user });
});

// Logout
route.post("/logout", (req, res) => {
  return res
    .clearCookie("accessToken")
    .status(200)
    .json({ success: true, msg: "logout Successfully 😁😁 🍀" });
});

export default route;
