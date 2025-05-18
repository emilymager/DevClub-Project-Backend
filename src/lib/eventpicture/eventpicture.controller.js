import EventPicture from './eventpicture.model.js';

export async function createEventPicture(req, res) {
    try {
        const { user, date } = req.body;

        const eventPic = new EventPicture({
            user,
            date
        });

        await eventPic.save();
        res.status(201).json({ message: 'Event Picture created successfully', eventPic });
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create event picture' });
    }
}

export async function getAllEventPictures(req, res) {
    try {
        
        const { page = 1, limit = 10 } = req.query;

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        
        const totalPictures = await EventPicture.countDocuments();

        
        const eventPictures = await EventPicture.find()
            .populate('user') 
            .skip(skip)
            .limit(limitNum)
            .sort({ createdAt: -1 });

        const totalPages = Math.ceil(totalPictures / limitNum);

        res.status(200).json({
            eventPictures,
            page: pageNum,
            totalPages,
            totalPictures
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch event pictures' });
    }
}

export async function getEventPictureById(req, res) {
    try {
        const { id } = req.params;
        const eventPic = await EventPicture.findById(id);

        if (!eventPic) 
            return res.status(404).json({ message: 'Event Picture not found' });

        res.status(200).json(eventPic);
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch event picture' });
    }
}

export async function updateEventPicture(req, res) {
    try {
        const { id } = req.params;
        const { user, date} = req.body;

        const eventPic = await EventPicture.findById(id);

        if (!eventPic) {
            return res.status(404).json({ message: 'Event Picture not found' });
        }

        if (user) 
            eventPic.user = user;
        
        if (date) 
            eventPic.date = date;
        
        await eventPic.save();

        res.status(200).json({ message: 'Event Picture updated successfully', eventPic });
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update event picture' });
    }
}

export async function deleteEventPicture(req, res) {
    try {
        const { id } = req.params;

        const eventPic = await EventPicture.findByIdAndDelete(id);

        if (!eventPic) 
            return res.status(404).json({ message: 'Event Picture not found' });

        res.status(200).json({ message: 'Event Picture deleted successfully' });
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete Event Picture' });
    }
}