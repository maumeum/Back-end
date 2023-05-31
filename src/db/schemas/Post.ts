import mongoose from 'mongoose';
const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    postType: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
    },
  },
  { timestamps: true },
);

export default PostSchema;
