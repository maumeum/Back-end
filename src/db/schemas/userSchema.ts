import { prop, modelOptions } from '@typegoose/typegoose';
import { nanoid } from 'nanoid';
@modelOptions({ schemaOptions: { timestamps: true } })
class User {
  @prop({ required: true, default: () => nanoid(4), unique: true })
  public name!: string;

  @prop({ required: true })
  public nanoid!: string;

  @prop({ required: true, default: 'image url' })
  public image!: string;

  @prop({ required: true })
  public email!: string;

  @prop({ required: true, default: 'user' })
  public role!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ required: true })
  public phone!: string;
}

export { User };
