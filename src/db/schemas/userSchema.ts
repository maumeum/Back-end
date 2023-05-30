import { Schema } from 'mongoose';
import { nanoid } from 'nanoid';

interface DBUser {
  nickname: string;
  nanoid: string;
  image: string;
  email: string;
  role: string;
  password: string;
  phone: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<DBUser>({
  nickname: { type: String, required: true },
  nanoid: { type: String, default: () => nanoid(4), unique: true },
  image: { type: String, default: 'image url' },
  email: { type: String, required: true },
  role: { type: String, default: 'user', required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export { DBUser, UserSchema };
