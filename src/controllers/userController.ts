import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/index.js';
import bcrypt from 'bcrypt';
import passport from 'passport';
interface UserInfo {
  user_id?: string;
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

  //유저 생성
  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      console.log('회원가입시작');
      const { nickname, email, password, phone } = req.body;
      const alreadyUser = await this.userService.getUserByEmail(email);
      if (alreadyUser) {
        console.log('이메일 중복으로 status 400');
        return res.status(400).json({ message: '이미 가입된 계정입니다.' });
      }

      const user = await this.userService.createUser({
        nickname,
        email,
        password,
        phone,
      });
      res.json().status(201);
      console.log('회원 가입 성공');
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  //유저 정보 조회
  public getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('유저 정보 조회 시작');
      const { user_id } = req.params;
      const user = await this.userService.getUserById(user_id);
      res.json(user).status(200);
      console.log('회원 조회 성공');
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  //유저 로그인
  public login = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (authError: any, user: any, info: any) => {
      if (authError) {
        //서버 실패
        console.error(authError);
        return next(authError);
      }
      if (!user) {
        //로직 실패
        return res.send(`${info.message}`);
      }
      return req.login(user, (loginError) => {
        //로그인 성공
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        return res.status(200).send('로그인성공');
      });
    })(req, res, next);
  };
  //유저 로그아웃
  public logout = (req: Request, res: Response, next: NextFunction) => {
    req.logout(() => {
      res.send('로그아웃 성공').status(200);
    });
  };
}

export { UserController };
