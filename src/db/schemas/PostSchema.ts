import {
  modelOptions,
  prop,
  getModelForClass,
  Ref,
} from '@typegoose/typegoose';
import { User } from './userSchema.js';

@modelOptions({ schemaOptions: { timestamps: true } })
class Post {
  public _id!: string;
  @prop({ required: true })
  @prop({ ref: User })
  public user_id!: Ref<User>;
  public title!: string;
  @prop({ required: true })
  public content!: string;
  @prop()
  public images!: string[];
  @prop()
  public postType!: string[];
}

export { Post };
