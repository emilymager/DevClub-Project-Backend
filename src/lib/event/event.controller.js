import Event from './event.model.js';

export async function createEvent(req, res) {
    try {
        const { host, participants, invitationPicture, date, location, description, eventType, budget, visibility } = req.body;

        const event = new Event({
            host,
            participants,
            invitationPicture,
            date,
            location,
            description,
            eventType,
            budget,
            visibility
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
        const { host, participants, invitationPicture, date, location, description, eventType, budget, visibility } = req.body;

        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

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