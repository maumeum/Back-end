import {
  prop,
  getModelForClass,
  Ref,
  modelOptions,
} from '@typegoose/typegoose';
import mongoose from 'mongoose';

@modelOptions({ schemaOptions: { timestamps: true } })
class PostComment {
  @prop({ required: true })
  public content!: string;

  // @prop({ ref: () => , type: () => String })
  // public user_id? :Ref< User>;

  // @prop({ ref: () => , type: () => String })
  // public post_id? :Ref<Post>;
}

export { PostComment };
