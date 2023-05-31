import { prop, modelOptions, Ref } from '@typegoose/typegoose';
import { User } from './userSchema.js';

@modelOptions({ schemaOptions: { timestamps: true } })
class VolunteerComment {
  /*
  @prop( { ref : () => Volunteer})
  public volunteer_id : Ref<Volunteer>: 
  */

  @prop({ ref: () => User, required: true })
  public user_id!: Ref<User>;

  @prop({ required: true })
  public content!: string;
}

export { VolunteerComment };
