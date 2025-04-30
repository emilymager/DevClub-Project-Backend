const express = require('express');
const { createEventPicture, getAllEventPictures, getEventPictureById, updateEventPicture, deleteEventPicture } = require('./eventpicture.controller');

const router = express.Router();

router.post('/eventpicture', createEventPicture);

router.get('/eventpicture', getAllEventPictures);

router.get('/eventpicture/:id', getEventPictureById); 

router.put('/eventpicture/:id', updateEventPicture);

router.delete('/eventpicture/:id', deleteEventPicture);

module.exports = router;