import { getModelForClass } from "@typegoose/typegoose";
import { Post } from "./schemas/Post.js";
import { Review } from "./schemas/Review.js";

export const PostModel = getModelForClass(Post);
export const ReviewModel = getModelForClass(Review);
