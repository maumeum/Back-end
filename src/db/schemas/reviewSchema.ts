import mongoose, { Schema, Types } from 'mongoose';

interface DBReview {
  title: string;
  content: string;
  images: string[];
  volunteer_id: Types.ObjectId;
  user_id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<DBReview>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  images: [{ type: String }],
  volunteer_id: { type: Schema.Types.ObjectId, ref: 'Volunteer' },
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Review = mongoose.model<DBReview>('Review', ReviewSchema);

export default Review;
