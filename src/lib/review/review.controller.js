import Review from './review.model.js';
import Supplier from '../supplier/supplier.model.js';

export async function createReview(req, res) {
  try {
    const { rank, supplier, description } = req.body;

    if (!supplier) {
      return res.status(400).json({ message: 'Supplier ID is required' });
    }

    const review = new Review({
      rank,
      user: req.user.id,
      supplier,
      description,
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
      .populate('supplier') 
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      total,
      page,
      pages: Math.ceil(total / limit),
      reviews,
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

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to update this review' });
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

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
   if (review.user.toString() !== req.user.id) {
     return res.status(403).json({ message: 'You are not authorized to delete this review' });
   }
   
   const isReviewOwner = review.user.toString() === req.user.id;

   const supplier = await Supplier.findById(review.supplier);
   const isSupplierHost = supplier && supplier.host === req.user.id;
   if (!isReviewOwner && !isSupplierHost) {
     return res.status(403).json({ message: 'You are not authorized to delete this review' });
   }

    await review.deleteOne();
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete review' });
  }
}

export async function getReviewsBySupplierId(req, res) {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Review.countDocuments({ supplier: id });

    const reviews = await Review.find({ supplier: id })
      .populate('supplier')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      total,
      page,
      pages: Math.ceil(total / limit),
      reviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch reviews for supplier' });
  }
}
