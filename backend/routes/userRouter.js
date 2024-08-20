import { Router } from "express";
import { register } from "../controllers/userController.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "resume",
            maxCount: 1
        }, 
    ]),
    register
    )


export default router