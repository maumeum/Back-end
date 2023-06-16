import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { User } from "./userSchema.js";
import mongoose from "mongoose";

@modelOptions({ schemaOptions: { timestamps: true } })
class Post {
  @prop({ required: true })
  public title!: string;

  @prop({
    ref: () => User,
    type: () => mongoose.Types.ObjectId,
    required: true,
  })
  public user_id!: Ref<User>;

  @prop({ required: true })
  public content!: string;

  @prop({ required: false, type: () => [String] })
  public images!: string[];

  @prop({ required: false })
  public postType!: string;

  @prop({ required: true, default: false })
  public isReported!: boolean;
}

export { Post };
