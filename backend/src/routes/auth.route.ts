import { Router } from "express";
import { logIn, logOut, signUp, checkIsAuthenticated, updateProfile, updateProfilePicture } from "../controllers";
import { protectedRoute } from "../middleware";

const router = Router();

/*
 ** Signup user
 */
router.post("/signup", signUp);

/*
 ** Login user
 */
router.post("/login", logIn);

/*
 ** Logout user
 */
router.post("/logout", logOut);

/*
 ** Check user is authenticated or not
 */
router.get("/check", protectedRoute, checkIsAuthenticated)

/*
 ** Update user profile
 */
router.put("/update-profile", protectedRoute, updateProfile);

/*
 ** Update user profile picture
 */
router.put("/update-profile-picture", protectedRoute, updateProfilePicture);

export default router;
