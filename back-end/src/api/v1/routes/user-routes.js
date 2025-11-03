import express from "express"
import { register, login, home } from "../../../controllers/user-controller.js";
export const userRoutes = express.Router();


// userRoutes('/',home);
userRoutes.post('/',home);
userRoutes.post('/register',register);
userRoutes.post('/login',login);
