import { modelOptions, prop, Ref, mongoose } from '@typegoose/typegoose';
import { User } from './userSchema.js';

@modelOptions({ schemaOptions: { timestamps: true } })
class TeamAuth {
  @prop({ ref: User, unique: true })
  public user_id?: Ref<User>;

  @prop()
  public category!: string;

  @prop({ unique: true })
  public teamName!: string;

  @prop()
  public introduction!: string;

  @prop()
  public briefHistory!: string;

  @prop()
  public establishmentDate!: Date;

  @prop()
  public phone!: string;

  @prop()
  public location?: string;

  @prop()
  public image!: string;
}

export { TeamAuth };
