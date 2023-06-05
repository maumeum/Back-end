import {
  modelOptions,
  prop,
  getModelForClass,
  Ref,
  mongoose,
} from '@typegoose/typegoose';
import { Volunteer } from './volunteerSchema.js';
import { User } from './userSchema.js';
import { ObjectId } from 'mongodb';

@modelOptions({ schemaOptions: { timestamps: true } })
class Review {
  @prop()
  public _id!: ObjectId;

  @prop({ required: true })
  public title!: string;

  @prop()
  public content!: string;

  @prop()
  public images?: string[];

  @prop({ ref: User })
  public user_id?: Ref<User>;

  @prop({ ref: Volunteer })
  public volunteer_id?: Ref<Volunteer>;
}

export { Review };
