import { UserModel } from '../db/index.js';
import bcrypt from 'bcrypt';
import { User } from '../db/schemas/userSchema.js';

interface UserInfo {
  nickname?: string;
  nanoid?: string;
  introduction?: string;
  images?: string;
  email?: string;
  password?: string;
  phone?: string;
  role?: string;
}

class UserService {
  public async createUser({ nickname, email, password, phone }: UserInfo) {
    if (!password) {
      throw new Error('Password is required');
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
}

export { UserService };
