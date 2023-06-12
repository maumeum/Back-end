import { prop, Ref, modelOptions } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { User } from './userSchema.js';

@modelOptions({ schemaOptions: { timestamps: true } })
class Volunteer {
  @prop({ required: true })
  public title!: string;

  @prop({ required: true })
  public content!: string;

  @prop({ required: true })
  public centName!: string;

  @prop()
  public centDescription?: string;

  @prop({ required: true, default: '모집중' })
  public statusName!: string;

  @prop({ required: true, type: Date })
  public deadline?: Date;

  @prop({ required: true, type: Date })
  public startDate!: Date;

  @prop({ required: true, type: Date })
  public endDate!: Date;

  @prop({ required: true, default: 0 })
  public applyCount!: number;

  @prop({ required: true })
  public registerCount!: number;

  @prop({ required: true })
  public actType!: string;

  @prop({ required: true })
  public teenager!: boolean;

  @prop({ required: true, type: () => [String] })
  public images!: string[];

  @prop({ ref: () => User, type: () => mongoose.Types.ObjectId })
  public register_user_id?: Ref<User>;

  @prop({ required: true, default: false })
  public isReported!: boolean;
}

export { Volunteer };
