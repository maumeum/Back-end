import { prop, Ref, modelOptions } from "@typegoose/typegoose";
import { User } from "./userSchema.js";
import { Post } from "./postSchema.js";
import mongoose from "mongoose";

@modelOptions({ schemaOptions: { timestamps: true } })
class PostComment {
  @prop({ ref: () => Post, type: () => mongoose.Types.ObjectId })
  public post_id!: Ref<Post>;

  @prop({ ref: () => User, type: () => mongoose.Types.ObjectId })
  public user_id!: Ref<User>;

  @prop({ required: true })
  public content!: string;
}

export { PostComment };
