import express from 'express';
import { createUser, getAllUser, login, logout } from '../Controllers/UserController.js';
import { authorizeAdmin, isAuthenticated } from '../MiddleWare/Auth.js';


const router = express.Router();

router.route('/register').post(isAuthenticated,authorizeAdmin,createUser);
router.route('/users').get(isAuthenticated,authorizeAdmin,getAllUser);
router.route('/login').post(login);
router.route('/logout').get(isAuthenticated,logout);


export default router;