import { modelOptions, prop, Ref, mongoose } from '@typegoose/typegoose';
import { User } from './userSchema.js';

@modelOptions({ schemaOptions: { timestamps: true } })
class TeamAuthorization {
  @prop({ ref: User })
  public user_id?: Ref<User>;

  @prop({ required: true })
  public category!: string;

  @prop()
  public teamName!: string;

  @prop()
  public introduction!: string;

  @prop({ required: true })
  public image!: string;
}

export { TeamAuthorization };
