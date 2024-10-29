import { Router } from 'express';
import {
  getChannelStats,
  getChannelVideos,
} from '../controllers/dashboard.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

// router.use(upload.fields([]), verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route('/stats/:channelId').post(upload.fields([]), verifyJWT, getChannelStats);
router.route('/videos/:channelId').post(upload.fields([]), verifyJWT, getChannelVideos);

export default router;
