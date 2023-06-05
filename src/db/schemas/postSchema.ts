import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { User } from './userSchema.js';

@modelOptions({ schemaOptions: { timestamps: true } })
class Post {
  @prop({ required: true })
  public title!: string;

  @prop({ ref: User })
  public user_id!: Ref<User>;

  @prop({ required: true })
  public content!: string;

  @prop({ type: () => [String] })
  public images!: string[];

  @prop({ required: true })
  public postType!: string;
}

export { Post };
