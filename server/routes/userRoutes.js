import express from 'express';
import { createOrUpdateProfile, getAllUser, getProfile, getSinglePerson, likeUser, loginUser, logout, registerUser, uploadImage, verifyEmail } from '../controllers/userController.js';
import { authUser } from '../middlewares/auth.js';
import { upload } from '../config/multer.js';


const router = express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/logout',logout)
router.get('/verify-email/:token', verifyEmail);
router.post('/create-profile', upload.single("profilePicture"), authUser, createOrUpdateProfile);
router.post('/upload-photo', upload.single("image"), authUser, uploadImage);
router.get('/get-profile', authUser, getProfile);
router.get('/get-all-users', authUser, getAllUser);
router.get('/get-single-user/:id', authUser, getSinglePerson);
router.post('/like-user', authUser, likeUser);

export default router;