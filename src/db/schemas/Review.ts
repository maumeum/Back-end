import {
  modelOptions,
  prop,
  getModelForClass,
  Ref,
} from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class Review {
  public _id!: string;
  @prop({ required: true })
  public title!: string;
  @prop({ required: true })
  public content!: string;
  @prop()
  public images!: string[];
  //   @prop({ ref: Volunteer })
  //   public volunteer_id!: Ref<Volunteer>;
  //   @prop({ ref: User })
  //   public user_id!: Ref<User>;
}
