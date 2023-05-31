import { getModelForClass } from '@typegoose/typegoose';

import { Volunteer } from './Volunteer.js';
import { PostComment } from './PostComment.js';

export const PostModel = getModelForClass(Volunteer);
export const ReviewModel = getModelForClass(PostComment);
