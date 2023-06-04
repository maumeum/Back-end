import { UserModel } from '../db/index.js';
import bcrypt from 'bcrypt';
import { error } from 'console';
import { ObjectId } from 'mongodb';

//인터페이스 분리해서 작성
interface UserInfo {
  user_id?: ObjectId;
  nickname?: string;
  nanoid?: string;
  introduction?: string;
  image?: string;
  email?: string;
  password?: string;
  phone?: string;
  role?: string;
}

class UserService {
  // 유저 생성
  public async createUser({ nickname, email, password, phone }: UserInfo) {
    if (!password) {
      throw new Error('password is required');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await UserModel.create({
      nickname,
      email,
      password: hashedPassword,
      phone,
    });
    return createdUser;
  }

  //이메일로 유저 찾기
  public async getUserByEmail(email: string) {
    const user = await UserModel.findOne({ email });
    return user;
  }
  //object_id로 유저 찾기 (이메일, 닉네임, 폰)
  public async getUserById(_id: ObjectId) {
    const user = await UserModel.findById({ _id }).select(
      'email nickname phone introduction image',
    );
    return user;
  }

  //object_id로 유저 찾기 (password)
  public async getUserPasswordById(user_id: ObjectId) {
    const user = await UserModel.findById(user_id).select('password');
    return user;
  }

  public async updateUser(user_id: ObjectId, updateInfo: UserInfo) {
    const updatedUser = await UserModel.findByIdAndUpdate(user_id, updateInfo);
    return updatedUser;
  }
}

export { UserService };
