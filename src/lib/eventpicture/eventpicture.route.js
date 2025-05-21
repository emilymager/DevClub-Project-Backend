import express from 'express';
import * as controller from'./eventpicture.controller.js';

const router = express.Router();

router.post('/', controller.createEventPicture);
router.get('/', controller.getAllEventPictures);
router.get('/:id', controller.getEventPictureById);
router.put('/:id', controller.updateEventPicture);
router.delete('/:id', controller.deleteEventPicture);

export default router;
