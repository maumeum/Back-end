import { getModelForClass } from '@typegoose/typegoose';
import { User } from './schemas/userSchema.js';
import { VolunteerComment } from './schemas/volunteerCommentSchema.js';
import { Post } from './schemas/PostSchema.js';
import { Review } from './schemas/ReviewSchema.js';

//tsconfig.json의 moduleResolution이 nodenext면 확장자 필요

const UserModel = getModelForClass(User);
const VolunteerCommentModel = getModelForClass(VolunteerComment);
const PostModel = getModelForClass(Post);
const ReviewModel = getModelForClass(Review);

export { UserModel, VolunteerCommentModel, PostModel, ReviewModel };
