import express from 'express';
import * as controller from './event.controller.js';

const router = express.Router();

router.post('/event', controller.createEvent);

router.get('/event', controller.getAllEvents);

router.get('/event/:id', controller.getEventById); 

router.put('/event/:id', controller.updateEvent);

router.delete('/event/:id', controller.deleteEvent);

router.post('/event/supplier/add', controller.addSupplierToEvent);

router.post('/event/supplier/remove', controller.removeSupplierFromEvent);

router.post('/event/participant/add', controller.addParticipantToEvent);

router.post('/event/participant/remove', controller.deleteParticipantByHost);

router.post('/event/picture/add', controller.addEventPicture);

router.post('/event/picture/remove', controller.removeEventPicture);

router.post('/event/invitationPicture/add', controller.addInvitationPicture);

router.post('/event/invitationPicture/remove', controller.removeInvitationPicture);

router.put('/event/invitationPicture', controller.putInvitationPicture);

export default router;