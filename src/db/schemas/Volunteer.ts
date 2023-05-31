import { prop, Ref, modelOptions } from '@typegoose/typegoose';
import mongoose from 'mongoose';

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

  // @prop({ ref: () => User, type: () => String }) // User 모델을 참조하도록 수정합니다.
  // public user_id?: Ref<User>;
}

export { Volunteer };
