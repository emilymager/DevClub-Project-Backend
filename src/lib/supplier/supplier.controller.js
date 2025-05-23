import Supplier from './supplier.model.js';
import Review from '../review/review.model.js';
import Event from '../event/event.model.js';

export async function createSupplier(req, res) {
    try {
        const { name, supplierType, rank, description, image } = req.body;

        const supplier = new Supplier({
            name,
            supplierType,
            rank,
            description,
            image
        });

        await supplier.save();

        res.status(201).json({ message: 'Supplier created successfully', supplier });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create supplier' });
    }
}

export async function getAllSuppliers(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const suppliers = await Supplier.find()
            .skip(skip)
            .limit(limit);

        const total = await Supplier.countDocuments();

        res.status(200).json({
            total,
            page,
            pages: Math.ceil(total / limit),
            suppliers
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch suppliers' });
    }
}

export async function getSupplierById(req, res) {
    try {
        const { id } = req.params;
        const supplier = await Supplier.findById(id);

        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        res.status(200).json({
            supplier
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch supplier' });
    }
}

export async function updateSupplier(req, res) {
    try {
        const { id } = req.params;
        const { name, supplierType, rank, description, image } = req.body;

        const supplier = await Supplier.findById(id);

        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        supplier.name = name || supplier.name;
        supplier.supplierType = supplierType || supplier.supplierType;
        supplier.rank = rank || supplier.rank;
        supplier.description = description || supplier.description;
        supplier.image = image || supplier.image;

        await supplier.save();

        res.status(200).json({ message: 'Supplier updated successfully', supplier });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update supplier' });
    }
}

export async function deleteSupplier(req, res) {
    try {
        const { id } = req.params;

        const supplier = await Supplier.findByIdAndDelete(id);

        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        res.status(200).json({ message: 'Supplier deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete supplier' });
    }
}

export async function addReviewToSupplier(req, res) {
    try {
        const supplierId = req.params.id;
        const { rank, description, userId } = req.body;

        const supplier = await Supplier.findById(supplierId);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        const review = new Review({
            rank,
            description,
            user: userId,
            supplier: supplierId
        });

        await review.save();

        return res.status(201).json({ message: 'Review added successfully', review });
    } catch (error) {
        console.error('Error adding review:', error);
        return res.status(500).json({ message: 'Failed to add review', error: error.message });
    }
}

export async function addEventToHistory(req, res) {
    try {
        const { id } = req.params;
        const { eventId } = req.body;

        const supplier = await Supplier.findById(id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        supplier.history.push(eventId);
        await supplier.save();

        res.status(200).json({ message: 'Event added to history successfully', supplier });
    } catch (error) {
        console.error('Error adding event to history:', error);
        res.status(500).json({ message: 'Failed to add event to history', error: error.message });
    }
}

export async function getHistoryBySupplierId(req, res) {
    try {
        const { id } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const supplier = await Supplier.findById(id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        const totalEvents = supplier.history.length;
        const historyPage = supplier.history.slice(skip, skip + limit);

        const events = await Event.find({ _id: { $in: historyPage } });

        res.status(200).json({
            total: totalEvents,
            page,
            pages: Math.ceil(totalEvents / limit),
            history: events
        });
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ message: 'Failed to fetch history', error: error.message });
    }
}