import mongoose from 'mongoose';
import { DBReview, ReviewSchema } from './reviewSchema.js';
import { DBUser, UserSchema } from './userSchema.js';
import {
  DBVolunteerComment,
  VolunteerCommentSchema,
} from './volunteerCommentSchema.js';
//tsconfig.json의 moduleResolution이 nodenext면 확장자 필요

const UserModel = mongoose.model<DBUser>('User', UserSchema);
const ReviewModel = mongoose.model<DBReview>('Review', ReviewSchema);
const VolunteerCommentModel = mongoose.model<DBVolunteerComment>(
  'VolunteerComment',
  VolunteerCommentSchema
);

export { UserModel, ReviewModel, VolunteerCommentModel };
