
import express from 'express';
import * as controller from './event.controller.js';
import { authenticate } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get(
  "/participant/me",
  authenticate,
  controller.getEventsByParticipant
);

router.get("/", controller.getAllEvents);

router.get("/:id", controller.getEventById);

router.put('/:id',authenticate, controller.updateEvent);

router.delete('/:id',authenticate, controller.deleteEvent);

router.post('/supplier/add', authenticate, controller.addSupplierToEvent);

router.post('/supplier/remove',authenticate, controller.removeSupplierFromEvent);

router.post('/:id/participant/add', authenticate, controller.addParticipantToEvent);


router.post('/participant/remove',authenticate, controller.deleteParticipantByHost);

router.post('/picture/add',authenticate, controller.addEventPicture);

router.post('/picture/remove',authenticate, controller.removeEventPicture);

router.post('/event/invitationPicture/add',authenticate, controller.addInvitationPicture);

router.post('/invitationPicture/remove',authenticate, controller.removeInvitationPicture);

router.put('/event/invitationPicture',authenticate, controller.putInvitationPicture);

export default router;