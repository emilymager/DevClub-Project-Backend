const Event = require('./event.model');

const createEventService = async (data) => {
  try {
    const event = new Event(data);
    return await event.save();
  } catch (error) {
    throw new Error('Error creating event: ' + error.message);
  }
};

const getAllEventsService = async () => {
  try {
    return await Event.find();
  } catch (error) {
    throw new Error('Error fetching events: ' + error.message);
  }
};

const getEventByIdService = async (id) => {
  try {
    return await Event.findById(id);
  } catch (error) {
    throw new Error('Error fetching event by ID: ' + error.message);
  }
};

const updateEventService = async (id, data) => {
  try {
    return await Event.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new Error('Error updating event: ' + error.message);
  }
};

const deleteEventService = async (id) => {
  try {
    return await Event.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting event: ' + error.message);
  }
};

const createEvent = async (req, res) => {
  try {
    const eventData = req.body;
    const event = await createEventService(eventData);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await getAllEventsService();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await getEventByIdService(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await updateEventService(req.params.id, req.body);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await deleteEventService(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
};
