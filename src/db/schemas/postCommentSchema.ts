import { prop, Ref, modelOptions } from '@typegoose/typegoose';
import { User } from './userSchema.js';
import { Post } from './postSchema.js';

@modelOptions({ schemaOptions: { timestamps: true } })
class PostComment {
  @prop({ ref: Post })
  public post_id?: Ref<Post>;

  @prop({ ref: User })
  public user_id?: Ref<User>;

  @prop({ required: true })
  public content!: string;
}

export { PostComment };
