// @ts-nocheck
import { Router } from "express";
import * as userControllers from "../controllers/user"
import { uploadSingleFile } from "../utils/multer";
import { authenticate } from "../middlewares/user";

const userRoutes=Router();

userRoutes.post('/signup',userControllers.userSignup);
userRoutes.post('/login',userControllers.userLogin);
userRoutes.put('/updateProfile',authenticate,uploadSingleFile,userControllers.updateProfile);
userRoutes.get('/getProfile',authenticate,userControllers.getProfile);

export default userRoutes;