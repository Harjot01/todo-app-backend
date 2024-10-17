import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import { ErrorHandler } from "../middlewares/err.js";

// registering a new user
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User Already Exists", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    sendCookie(user, res, "User Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

// logging in an existing user
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));
    sendCookie(user, res, "User Logged In Successfully", 200);
  } catch (error) {
    next(error);
  }
};

// fetching profile details
export const getMyProfile = (req, res) => {
  // if the user is authenticated then only show the profile

  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const Logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: process.env.NODE_ENV === "Production" ? true : false,
      sameSite: process.env.NODE_ENV === "Production" ? "None" : "Lax",
    })
    .json({
      success: true,
      message: "User Successfully Logged Out",
    });
};
