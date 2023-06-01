import { userInfo } from 'os';
import { UserModel } from '../db/index.js';
import bcrypt from 'bcrypt';
import { error } from 'console';

interface UserInfo {
  user_id?: string;
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
  public async getUserByEmail(email: UserInfo) {
    const user = await UserModel.findOne({ email });
    return user;
  }
  //object_id로 유저 찾기
  public async getUserById(_id: string) {
    const user = await UserModel.findById({ user_id: userInfo }).select(
      'email nickname phone',
    );
    return user;
  }

  // public async updateUser(
  //   user_id: string,
  //   { nickname, password, phone }: UserInfo,
  // ) {
  //   const updatedUser = await UserModel.findOneAndUpdate(
  //     { user_id },
  //     { nickname, password, phone, image, introduction },
  //     { returnOriginal: false },
  //   );
  // }
}

export { UserService };
