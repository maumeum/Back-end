import { prop, modelOptions, Ref } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { User } from './userSchema.js';
import { Volunteer } from './volunteerSchema.js';

@modelOptions({ schemaOptions: { timestamps: true } })
class VolunteerApplication {
  @prop({
    required: true,
    ref: () => User,
    type: () => mongoose.Types.ObjectId,
  })
  public user_id!: Ref<User>;

  @prop({
    required: true,
    ref: () => Volunteer,
    type: () => mongoose.Types.ObjectId,
  })
  public volunteer_id!: Ref<Volunteer>;

  @prop({ required: true, default: false })
  public isParticipate!: boolean;
}

export { VolunteerApplication };
