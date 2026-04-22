import { Router } from 'express';
import {
    addComment,
    deleteComment,
    getVideoComments,
    updateComment,
} from "../controllers/comment.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { upload } from '../middlewares/multer.middleware.js';
import { writeRateLimiter } from "../middlewares/rateLimit.middleware.js";

const router = Router();

router.route("/:videoId").get(getVideoComments);
router
  .route("/:videoId")
  .post(writeRateLimiter, upload.fields([]), verifyJWT, addComment);
router
  .route("/c/:commentId")
  .delete(writeRateLimiter, upload.fields([]), verifyJWT, deleteComment)
  .patch(writeRateLimiter, upload.fields([]), verifyJWT, updateComment);

export default router
