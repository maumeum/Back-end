import { prop, Ref, modelOptions } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { User } from './userSchema.js';

@modelOptions({ schemaOptions: { timestamps: true } })
class Volunteer {
  @prop({ required: true })
  public title!: string;

  @prop({ required: true })
  public content!: string;

  @prop()
  public centName?: string;

  @prop({ required: true, default: '모집중' })
  public statusName!: string;

  @prop()
  public deadline?: Date;

  @prop()
  public applyCount?: number;

  @prop()
  public registerCount?: number;

  @prop({ required: true })
  public actType!: string;

  @prop({ required: true })
  public teenager!: string;

  @prop({ required: true, default: [] })
  public images!: string[];

  @prop({ ref: () => User, type: () => String })
  public user_id?: Ref<User>;
}

export { Volunteer };
