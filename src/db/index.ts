import { getModelForClass } from '@typegoose/typegoose';
import { User } from './schemas/userSchema.js';
import { VolunteerComment } from './schemas/volunteerCommentSchema.js';
import { Post } from './schemas/PostSchema.js';
import { Review } from './schemas/ReviewSchema.js';
import { Volunteer } from './schemas/Volunteer.js';
import { PostComment } from './schemas/PostComment.js';

//tsconfig.json의 moduleResolution이 nodenext면 확장자 필요

const UserModel = getModelForClass(User);
const VolunteerCommentModel = getModelForClass(VolunteerComment);
const PostModel = getModelForClass(Post);
const ReviewModel = getModelForClass(Review);
const VolunteerModel = getModelForClass(Volunteer);
const PostCommentModel = getModelForClass(PostComment);

export {
  UserModel,
  VolunteerCommentModel,
  PostModel,
  ReviewModel,
  VolunteerModel,
  PostCommentModel,
};
