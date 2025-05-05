import Review from './review.model.js';

export async function createReview(req, res) {
    try {
        const { rank, user, supplier, description } = req.body;

        const review = new Review({
            rank,
            user,
            supplier,
            description
        });

        await review.save();

        res.status(201).json({ message: 'Review created successfully', review });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create review' });
    }
}

export async function getAllReviews(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const total = await Review.countDocuments();

        const reviews = await Review.find()
            .populate('user')
            .populate('supplier')
            .sort({ createdAt: -1 }) 
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            total,
            page,
            pages: Math.ceil(total / limit),
            reviews
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch reviews' });
    }
}

export async function getReviewById(req, res) {
    try {
        const { id } = req.params;

        const review = await Review.findById(id)
            .populate('user')
            .populate('supplier');

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch review' });
    }
}

export async function updateReview(req, res) {
    try {
        const { id } = req.params;
        const { rank, description } = req.body;

        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        review.rank = rank || review.rank;
        review.description = description || review.description;

        await review.save();

        res.status(200).json({ message: 'Review updated successfully', review });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update review' });
    }
}

export async function deleteReview(req, res) {
    try {
        const { id } = req.params;

        const review = await Review.findByIdAndDelete(id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete review' });
    }
}


