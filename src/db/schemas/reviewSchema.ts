import {
  modelOptions,
  prop,
  getModelForClass,
  Ref,
  mongoose,
} from '@typegoose/typegoose';
import { Volunteer } from './volunteerSchema.js';
import { User } from './userSchema.js';

@modelOptions({ schemaOptions: { timestamps: true } })
class Review {
  @prop({ required: true })
  public title!: string;

  @prop()
  public content!: string;

  @prop({ type: () => [String] })
  public images?: string[];

  @prop({ ref: User })
  public user_id?: Ref<User>;

  @prop({ ref: () => Volunteer, type: () => mongoose.Types.ObjectId })
  public volunteer_id?: Ref<Volunteer>;

  @prop({ required: true })
  public isReported!: boolean;
}

export { Review };
