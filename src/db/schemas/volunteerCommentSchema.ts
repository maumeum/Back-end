import mongoose, { Schema, Types } from 'mongoose';

interface DBVolunteerComment {
  volunteer_id: Types.ObjectId;
  user_id: Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const VolunteerCommentSchema = new Schema<DBVolunteerComment>({
  volunteer_id: { type: Schema.Types.ObjectId, ref: 'Volunteer' },
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const VolunteerComment = mongoose.model<DBVolunteerComment>(
  'VolunteerComment',
  VolunteerCommentSchema
);

export default VolunteerComment;
