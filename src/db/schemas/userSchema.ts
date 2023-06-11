import { prop, modelOptions, mongoose } from '@typegoose/typegoose';
import { nanoid } from 'nanoid';

@modelOptions({ schemaOptions: { timestamps: true } })
class User {
  @prop({ required: true })
  public nickname!: string;

  @prop({ required: true, default: () => nanoid(4) })
  public nanoid!: string;

  @prop({ required: true, default: 'images/default-profile-image.png' })
  public image!: string;

  @prop({ required: true })
  public email!: string;

  @prop()
  public introduction?: string;

  @prop({ required: true, default: 'user' })
  public role!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ required: true })
  public phone!: string;

  @prop({ required: true, default: 0 })
  public reportedTimes!: number;
}

export { User };
