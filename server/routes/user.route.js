import express from 'express';
import { addprofile, getvideo, stream } from '../controllers/user.controller.js';
import { upload } from '../middleware/multer.js';

export const userRouter = express.Router();
userRouter.post('/addprofile',upload.single('video'),addprofile)
.get('/allvideos',getvideo)
.get('/stream',stream)
