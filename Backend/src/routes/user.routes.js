import { Router } from "express";
import { loginUser, logout, refreshAccessToken, register, updatePassword, updateProfile } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name : "profile",
            maxCount :1
        }
    ]),register
)
router.route("/login").post(loginUser)
router.route("/logout").post(isAuthenticated,logout)
router.route("/update").post(isAuthenticated,
    upload.fields([
        {
            name : "resume",
            maxCount : 1
        },
        {
            name : "profile",
            maxCount :1
        }
    ]),updateProfile
)
router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(isAuthenticated,updatePassword)

export default router