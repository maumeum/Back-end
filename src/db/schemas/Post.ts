import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class Post {
  public _id!: string;
  @prop({ required: true })
  // @prop({ ref: User })
  // public user_id!: Ref<User>;
  public title!: string;
  @prop({ required: true })
  public content!: string;
  @prop()
  public images!: string[];
  @prop()
  public postType!: string[];
}
