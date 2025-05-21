import express from 'express';
import * as controller from './user.controller.js';

const router = express.Router();

router.post('/', controller.createUser);

router.get('/', controller.getAllUsers);

router.get('/:id', controller.getUserById); 

router.put('/:id', controller.updateUser);

router.delete('/:id', controller.deleteUser);

export default router;