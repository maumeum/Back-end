import { prop, modelOptions, Ref } from '@typegoose/typegoose';
import { User } from './userSchema.js';
import { Volunteer } from './volunteerSchema.js';
import mongoose from 'mongoose';

@modelOptions({ schemaOptions: { timestamps: true } })
class VolunteerComment {
  @prop({ ref: () => Volunteer, type: mongoose.Types.ObjectId })
  public volunteer_id!: Ref<Volunteer>;

  @prop({
    ref: () => User,
    type: () => mongoose.Types.ObjectId,
    required: true,
  })
  public user_id!: Ref<User>;

  @prop({ required: true })
  public content!: string;
}

export { VolunteerComment };
