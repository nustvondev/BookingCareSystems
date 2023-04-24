import express from 'express';
let router = express.Router();
// import { regiser, login } from '../controllers/auth.controller.js';
import usersController from '../controllers/users.controller.js';

router.get('/get-all-user', usersController.handleGetAllUsers);
router.post('/create-new-user', usersController.handleCreateNewUser);
router.post('/edit-user', usersController.handleEditUser);
router.post('/delete-user', usersController.handleDeleteUser);

// router.post('/login', usersController.login);
// router.post('/logout', usersController.logout);

export default router;
