import {
  prop,
  getModelForClass,
  Ref,
  modelOptions,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { User } from "./userSchema.js";
import { Post } from "./postSchema.js";

@modelOptions({ schemaOptions: { timestamps: true } })
class PostComment {
  @prop({ required: true })
  public content!: string;

  @prop({ ref: User })
  public user_id?: Ref<User>;

  @prop({ ref: Post })
  public post_id?: Ref<Post>;
}

export { PostComment };
