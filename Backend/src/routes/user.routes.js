import { Router } from "express";
import { loginUser, register } from "../controllers/user.controller.js";
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

export default router