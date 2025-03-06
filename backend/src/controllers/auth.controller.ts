import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { generateToken } from "../lib/utils";
import cloudinary from "../lib/utils/cloudinary";

/*
 ** Signup user function
 */
export async function signUp(req: Request, res: Response): Promise<any> {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ success: false, message: "Invalid payload" });
  try {
    if (password.length < 8)
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    if (!newUser)
      return res
        .status(400)
        .json({ success: false, message: "Invalid user data" });

    const token = generateToken(newUser._id, res);
    await newUser.save();

    return res.status(201).json({
      success: true,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
      },
    });
  } catch (error) {
    console.log("SIGNUP ERROR:", error);
    return res
      .status(400)
      .json({ success: false, message: "Internal Server Error" });
  }
}

/*
 ** Login user function
 */
export async function logIn(req: Request, res: Response): Promise<any> {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const isCorrectPassword = await bcrypt.compare(
      password,
      existingUser?.password!
    );
    if (!isCorrectPassword)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const token = generateToken(existingUser?._id!, res);
    return res.status(200).json({
      success: true,
      user: {
        id: existingUser?._id,
        username: existingUser?.username,
        email: existingUser?.email,
        profilePicture: existingUser?.profilePicture,
        token,
      },
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    return res.status(500).json({ success: false, error });
  }
}

/*
 ** Logout user function
 */
export async function logOut(req: Request, res: Response): Promise<any> {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.log("LOGOUT ERROR:", error);
    return res.status(500).json({ success: false, error });
  }
}

/*
 ** Check user is authenticated or not function
 */
export async function checkIsAuthenticated(
  req: Request,
  res: Response
): Promise<any> {
  try {
    return res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log("ERROR IN CHECK IS AUTHENTICATED:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

/*
 ** Update user profile function
 */
export async function updateProfile(req: Request, res: Response): Promise<any> {
  try {
    const { profilePicture } = req.body;
    const userId = req.user._id;
    if (!profilePicture)
      return res
        .status(400)
        .json({ success: false, message: "Profile picture is required" });

    const profileUploadResponse = await cloudinary.uploader.upload(
      profilePicture
    );
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePicture: profileUploadResponse.secure_url,
      },
      { new: true }
    );

    return res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.log("ERROR UPDATE PROFILE:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
