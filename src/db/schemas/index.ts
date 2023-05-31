import { getModelForClass } from "@typegoose/typegoose";
import { Post } from "./Post.js";
import { Review } from "./Review.js";

export const PostModel = getModelForClass(Post);
export const ReviewModel = getModelForClass(Review);
