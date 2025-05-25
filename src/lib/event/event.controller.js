import Event from './event.model.js';

export async function createEvent(req, res) {
    try {
        const { title, host, participants, invitationPicture, date, location, description, eventType, budget, visibility,suppliers } = req.body;

        const event = new Event({
            title,
            host,
            participants,
            invitationPicture,
            date,
            location,
            description,
            eventType,
            budget,
            visibility,
            suppliers
        });

        await event.save();
        res.status(201).json({ message: 'Event created successfully', event });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create Event' });
    }
}


export async function getAllEvents(req, res) {
    try {
        const { page = 1, limit = 10 } = req.query;

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);

        const skip = (pageNum - 1) * limitNum;

        const totalEvents = await Event.countDocuments();

        const events = await Event.find().skip(skip) .limit(limitNum).sort({ createdAt: -1 });

        const totalPages = Math.ceil(totalEvents / limitNum);

        res.status(200).json({
            events,
            page: pageNum,
            totalPages,
            totalEvents
        });
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch events' });
    }
}

export async function getEventById(req, res) {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);

        if (!event) 
            return res.status(404).json({ message: 'Event not found' });

        res.status(200).json(event);
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch event' });
    }
}

export async function updateEvent(req, res) {
    try {
        const { id } = req.params;
        const { title, host, participants, invitationPicture, date, location, description, eventType, budget, visibility } = req.body;

        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (title) 
            event.title = title;

        if (host) 
            event.host = host;
        
        if (participants) 
            event.participants = participants;

        if (invitationPicture) 
            event.invitationPicture = invitationPicture;

        if (date) 
            event.date = date;

        if (location) 
            event.location = location;

        if (description) 
            event.description = description;

        if (eventType) 
            event.eventType = eventType;

        if (budget) 
            event.budget = budget;

        if (visibility) 
            event.visibility = visibility;
        
        await event.save();

        res.status(200).json({ message: 'Event updated successfully', event });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update event' });
    }
}


export async function deleteEvent(req, res) {
    try {
        const { id } = req.params;

        const event = await Event.findByIdAndDelete(id);

        if (!event) 
            return res.status(404).json({ message: 'Event not found' });

        res.status(200).json({ message: 'Event deleted successfully' });
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete event' });
    }
}

export async function addSupplierToEvent(req, res) {
    try {
      const { supplierId, eventId } = req.body;
  
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      if (!event.suppliers.includes(supplierId)) {
        event.suppliers.push(supplierId);
        await event.save();
      }
  
      res.status(200).json({ message: 'Supplier added successfully', event });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add supplier to event' });
    }
  }
  
  export async function removeSupplierFromEvent(req, res) {
    try {
      const { supplierId, eventId } = req.body;
  
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      event.suppliers = event.suppliers.filter(supplier => supplier.toString() !== supplierId);
  
      await event.save();
  
      res.status(200).json({ message: 'Supplier removed successfully', event });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to remove supplier from event' });
    }
  }

  export async function addParticipantToEvent(req, res) {
    try {
      const { userId, eventId } = req.body;
  
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      if (!event.participants.includes(userId)) {
        event.participants.push(userId);
        await event.save();
      }
  
      res.status(200).json({ message: 'Participant added successfully', event });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add participant to event' });
    }
  }
  
  export async function deleteParticipantByHost(req, res) {
    try {
      const { userId, eventId } = req.body;
  
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      if (event.host.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Only the host can remove participants' });
      }
  
      event.participants = event.participants.filter(participant => participant.toString() !== userId);
  
      await event.save();
  
      res.status(200).json({ message: 'Participant removed successfully', event });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to remove participant from event' });
    }
  }

  export async function addEventPicture(req, res) {
    try {
      const { pictureId, eventId } = req.body;
  
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      if (!event.eventPictures.includes(pictureId)) {
        event.eventPictures.push(pictureId);
        await event.save();
      }
  
      res.status(200).json({ message: 'Event picture added successfully', event });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add event picture' });
    }
  }
  
  export async function removeEventPicture(req, res) {
    try {
      const { pictureId, eventId } = req.body;
  
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      event.eventPictures = event.eventPictures.filter(picture => picture.toString() !== pictureId);
  
      await event.save();
  
      res.status(200).json({ message: 'Event picture removed successfully', event });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to remove event picture' });
    }
  }
  
  export async function addInvitationPicture(req, res) {
    try {
      const { image, eventId } = req.body;
  
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      event.invitationPicture = image;
  
      await event.save();
  
      res.status(200).json({ message: 'Invitation picture added successfully', event });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add invitation picture' });
    }
  }

  export async function removeInvitationPicture(req, res) {
    try {
      const { eventId } = req.body;
  
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      event.invitationPicture = null;
  
      await event.save();
  
      res.status(200).json({ message: 'Invitation picture removed successfully', event });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to remove invitation picture' });
    }
  }
  
  export async function putInvitationPicture(req, res) {
    try {
      const { image, eventId } = req.body;
  
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      event.invitationPicture = image;
  
      await event.save();
  
      res.status(200).json({ message: 'Invitation picture updated successfully', event });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update invitation picture' });
    }
  }
  