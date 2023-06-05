import { ObjectId } from 'mongodb';
import { ReviewModel } from '../db/index.js';
import { CONSTANTS } from '../utils/Constants.js';
import { Review } from '../db/schemas/reviewSchema.js';

interface ReviewData {
  review_id?: ObjectId;
  user_id?: ObjectId;
  title?: string;
  content?: string;
  images?: string[];
  volunteer_id?: ObjectId;
}

class ReviewService {
  public async createReview(createInfo: ReviewData) {
    const createReview = await ReviewModel.create(createInfo);
    return createReview;
  }

  public async updateReview(review_id: ObjectId, updateInfo: ReviewData) {
    const updatedReview = await ReviewModel.findOneAndUpdate(
      { _id: review_id },
      updateInfo,
      { new: true },
    );
    return updatedReview;
  }

  public async deleteReview(review_id: ReviewData) {
    const createReview = await ReviewModel.deleteOne({ _id: review_id });
    return createReview;
  }

  public async getReviews() {
    const reviews = await ReviewModel.find();
    return reviews;
  }
}

export { ReviewService };
