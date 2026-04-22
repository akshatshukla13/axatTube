import { Router } from 'express';
import {
    addComment,
    deleteComment,
    getVideoComments,
    updateComment,
} from "../controllers/comment.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route("/:videoId").get(getVideoComments);
router.route("/:videoId").post(upload.fields([]), verifyJWT, addComment);
router
  .route("/c/:commentId")
  .delete(upload.fields([]), verifyJWT, deleteComment)
  .patch(upload.fields([]), verifyJWT, updateComment);

export default router
