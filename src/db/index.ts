import { getModelForClass } from '@typegoose/typegoose';
import { User } from './schemas/userSchema.js';
import { VolunteerComment } from './schemas/volunteerCommentSchema.js';
import { Post } from './schemas/postSchema.js';
import { Review } from './schemas/reviewSchema.js';
import { Volunteer } from './schemas/volunteerSchema.js';
import { PostComment } from './schemas/postCommentSchema.js';
import { VolunteerApplication } from './schemas/volunteerApplicationSchema.js';
import { TeamAuthorization } from './schemas/teamAuthorization.js';

const UserModel = getModelForClass(User);
const VolunteerCommentModel = getModelForClass(VolunteerComment);
const PostModel = getModelForClass(Post);
const ReviewModel = getModelForClass(Review);
const VolunteerModel = getModelForClass(Volunteer);
const PostCommentModel = getModelForClass(PostComment);
const VolunteerApplicationModel = getModelForClass(VolunteerApplication);
const TeamAuthorizationModel = getModelForClass(TeamAuthorization);

export {
  UserModel,
  VolunteerCommentModel,
  PostModel,
  ReviewModel,
  VolunteerModel,
  PostCommentModel,
  VolunteerApplicationModel,
  TeamAuthorizationModel,
};
