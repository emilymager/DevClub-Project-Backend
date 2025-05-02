import express from 'express';
import * as controller from'./eventpicture.controller.js';

const router = express.Router();

router.post('/eventpicture', controller.createEventPicture);
router.get('/eventpicture', controller.getAllEventPictures);
router.get('/eventpicture/:id', controller.getEventPictureById);
router.put('/eventpicture/:id', controller.updateEventPicture);
router.delete('/eventpicture/:id', controller.deleteEventPicture);

export default router;
