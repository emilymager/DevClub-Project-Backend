const express = require('express');
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('./user.controller');

const router = express.Router();

console.log("ihf");
router.post('/user', createUser);

router.get('/user', getAllUsers);

router.get('/user/:id', getUserById); 

router.put('/user/:id', updateUser);

router.delete('/user/:id', deleteUser);

module.exports = router;