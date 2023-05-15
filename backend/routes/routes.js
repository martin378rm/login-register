import express from "express";
import { getUsers, registerUser, userLogin, userLogout } from "../controller/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js"
import {refreshToken} from "../controller/RefreshToken.js"


const router = express.Router();
router.get('/users', verifyToken, getUsers);
router.post('/users', registerUser);
router.post('/login', userLogin); 
router.get('/token', refreshToken); 
router.delete('/logout', userLogout); 

export default router; 