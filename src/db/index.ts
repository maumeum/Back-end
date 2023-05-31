import { getModelForClass } from '@typegoose/typegoose';
import { User } from './schemas/userSchema.js';
import { VolunteerComment } from './schemas/volunteerCommentSchema.js';
//tsconfig.json의 moduleResolution이 nodenext면 확장자 필요

const UserModel = getModelForClass(User);
const VolunteerCommentModel = getModelForClass(VolunteerComment);

export { UserModel, VolunteerCommentModel };
