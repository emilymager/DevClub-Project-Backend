import express from 'express';
import * as controller from './event.controller.js';

const router = express.Router();

router.post('/event', controller.createEvent);

router.get('/event', controller.getAllEvents);

router.get('/event/:id', controller.getEventById); 

router.put('/event/:id', controller.updateEvent);

router.delete('/event/:id', controller.deleteEvent);

export default router;