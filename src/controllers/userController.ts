import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/index.js';
import { userInfo } from 'os';
interface UserInfo {
  nickname?: string;
  nanoid: string;
  introduction?: string;
  images?: string;
  email?: string;
  password?: string;
  phone?: string;
  role?: string;
}

class UserController {
  public userService = new UserService();

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      console.log('회원가입시작');
      const { nickname, email, password, phone } = req.body;
      const user = await this.userService.createUser({
        nickname,
        email,
        password,
        phone,
      });
      res.json().status(201);
      console.log('회원가입성공');
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}

export { UserController };
