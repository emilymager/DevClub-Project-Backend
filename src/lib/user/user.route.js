import express from 'express';
import * as controller from './user.controller.js';

const router = express.Router();

router.post('/user', controller.createUser);

router.get('/user', controller.getAllUsers);

router.get('/user/:id', controller.getUserById); 

router.put('/user/:id', controller.updateUser);

router.delete('/user/:id', controller.deleteUser);

export default router;