import express from 'express';
import { getAllUsers, getUserById, addUser, updateUser, deleteUser, getUserGrowth } from '../controller/UserController.js';

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/growth', getUserGrowth);

router.get('/users/:id', getUserById);

router.post('/users', addUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
