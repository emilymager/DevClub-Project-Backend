import express from 'express';
import * as controller from './event.controller.js';

const router = express.Router();

router.post('/', controller.createEvent);

router.get('/', controller.getAllEvents);

router.get('/eventTypes', controller.getEventTypes);


router.get('/:id', controller.getEventById); 

router.put('/:id', controller.updateEvent);

router.delete('/:id', controller.deleteEvent);

router.post('/supplier/add', controller.addSupplierToEvent);

router.post('/supplier/remove', controller.removeSupplierFromEvent);

router.post('/participant/add', controller.addParticipantToEvent);

router.post('/participant/remove', controller.deleteParticipantByHost);

router.post('/picture/add', controller.addEventPicture);

router.post('/picture/remove', controller.removeEventPicture);

router.post('/event/invitationPicture/add', controller.addInvitationPicture);

router.post('/invitationPicture/remove', controller.removeInvitationPicture);

router.put('/event/invitationPicture', controller.putInvitationPicture);

export default router;