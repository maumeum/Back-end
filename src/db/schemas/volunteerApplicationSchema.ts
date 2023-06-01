import { prop, modelOptions, Ref } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { User } from './userSchema.js';

@modelOptions({ schemaOptions: { timestamps: true } })
class VolunteerApplication {
  @prop({
    required: true,
    ref: () => User,
    type: () => mongoose.Types.ObjectId,
  })
  public user_id!: Ref<User>;

  @prop({ required: true })
  public volunteerTitle!: string;

  @prop({ required: true })
  public volunteerCentName!: string;

  @prop({ required: true })
  public volunteerStatusName!: string;

  @prop({ required: true })
  public volunteerImage!: string;
}

export { VolunteerApplication };
