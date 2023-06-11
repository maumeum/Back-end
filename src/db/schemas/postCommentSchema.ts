import { prop, Ref, modelOptions } from '@typegoose/typegoose';
import { User } from './userSchema.js';
import { Post } from './postSchema.js';
import mongoose from 'mongoose';

@modelOptions({ schemaOptions: { timestamps: true } })
class PostComment {
  @prop({
    ref: () => Post,
    type: () => mongoose.Types.ObjectId,
    required: true,
  })
  public post_id!: Ref<Post>;

  @prop({
    ref: () => User,
    type: () => mongoose.Types.ObjectId,
    required: true,
  })
  public user_id!: Ref<User>;

  @prop({ required: true })
  public content!: string;

  @prop({ required: true, default: false })
  public isReported!: boolean;
}

export { PostComment };
