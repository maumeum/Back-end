import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Volunteer } from './volunteerSchema.js';
import { User } from './userSchema.js';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

@modelOptions({ schemaOptions: { timestamps: true } })
class Review {
  @prop({ required: true })
  public _id!: ObjectId;

  @prop({ required: true })
  public title!: string;

  @prop()
  public content!: string;

  @prop()
  public images?: string[];

  @prop({ ref: Volunteer, type: mongoose.Types.ObjectId })
  public volunteer_id?: Ref<Volunteer>;

  @prop({ ref: () => User, type: () => mongoose.Types.ObjectId })
  public register_user_id?: Ref<User>;
}

export { Review };
