import express from "express";
import { getUsers, registerUser } from "../controller/UserController.js";


const router = express.Router();
router.get('/users', getUsers);
router.post('/users', registerUser)

export default router; 