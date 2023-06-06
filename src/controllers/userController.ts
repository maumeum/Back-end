import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/index.js';
import bcrypt from 'bcrypt';
import { makeJwtToken } from '../utils/jwtTokenMaker.js';
import { ObjectId } from 'mongodb';
import { CONSTANTS } from '../utils/Constants.js';

declare global {
  namespace Express {
    interface Request {
      user_id: ObjectId;
      role: string;
    }
  }
}
interface UserLoginInfo {
  email: string;
  password: string;
}
interface updatedUser {
  user_id?: ObjectId;
  nickname?: string;
  nanoid?: string;
  introduction?: string;
  image?: string;
  phone?: string;
  role?: 'user' | 'admin' | 'disabled';
}
interface UpdateUserInfoRequest extends Request {
  body: {
    image?: string;
    nickname?: string;
    phone?: string;
    password?: string;
    introduction?: string;
  };
}

class UserController {
  public userService = new UserService();

  //회원가입시 이메일 중복체크
  public checkEmailDuplication = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email } = req.body;
      const user = await this.userService.getUserByEmail(email);
      if (user) {
        return res.sendStatus(400).json(false);
      } else if (!user) {
        return res.sendStatus(200).json(true);
      }
    } catch (error) {
      console.error(error);
      next();
    }
  };
  //유저 생성
  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      console.log('회원가입시작');
      const { nickname, email, password, phone } = req.body;
      const user = await this.userService.getUserByEmail(email);
      if (user) {
        console.log('이메일 중복으로 status 400');
        return res.sendStatus(400).json({ message: '이미 가입된 계정입니다.' });
      }

      const createdUser = await this.userService.createUser({
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
      const user_id = req.id;

      const user = await this.userService.getUserById(user_id);
      res.json(user).sendStatus(200);
      console.log('회원 조회 성공');
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  //유저 로그인
  public userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email, password } = <UserLoginInfo>req.body;
      const user = await this.userService.getUserByEmail(email);
      if (!user) {
        throw new Error(
          '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.',
        );
      }
      if (user.role === 'disabled') {
        throw new Error(
          '해당 계정은 탈퇴처리된 계정입니다. 관리자에게 문의하세요.',
        );
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error(
          '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.',
        );
      }
      const madeToken = makeJwtToken(user);
      res.json(madeToken).sendStatus(201);
      console.log('로그인 성공');
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public userAuthorization = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user_id = req.id;
      const { password } = req.body;
      const user = await this.userService.getUserPasswordById(user_id);
      if (!user) {
        throw new Error('비정상적 접근 에러');
      }

      const correctPasswordHash = user.password;
      const isPasswordCorrect = await bcrypt.compare(
        password,
        correctPasswordHash,
      );
      if (!isPasswordCorrect) {
        throw new Error(
          '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.',
        );
      }
      res.sendStatus(200).json();
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  //유저 정보 수정(닉네임, 휴대전화번호 , 비밀번호)
  public updateUserInfo = async (
    req: UpdateUserInfoRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      console.log('정보 수정 시작');
      const user_id = req.id;
      const { nickname, phone, password } = req.body;
      const updateInfo: {
        nickname?: string;
        phone?: string;
        password?: string;
      } = {};

      if (nickname) {
        updateInfo.nickname = nickname;
      }
      if (phone) {
        updateInfo.phone = phone;
      }

      if (password) {
        const hashedPassword = await bcrypt.hash(
          password,
          CONSTANTS.HASHING_TIMES,
        );
        updateInfo.password = hashedPassword;
      }
      const updatedUser = await this.userService.updateUser(
        user_id,
        updateInfo,
      );
      res.sendStatus(201).json();
      console.log('정보수정완료');
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public updateIntroduction = async (
    req: UpdateUserInfoRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user_id = req.id;
      const { introduction } = req.body;
      const updateInfo: {
        introduction?: string;
      } = {};

      if (introduction) {
        updateInfo.introduction = introduction;
      }

      const updatedUser = await this.userService.updateUser(
        user_id,
        updateInfo,
      );
      res.sendStatus(200).json();
      console.log('정보수정완료');
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public updateImage = async (
    req: UpdateUserInfoRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user_id = req.id;
      const { image } = req.body;
      const updateInfo: {
        image?: string;
      } = {};

      if (image) {
        updateInfo.image = image;
      }

      const updatedUser = await this.userService.updateUser(
        user_id,
        updateInfo,
      );
      res.sendStatus(200).json();
      console.log('정보수정완료');
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public deleteUser = async (
    req: UpdateUserInfoRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user_id = req.id;
      const updateInfo: updatedUser = {};
      updateInfo.role = 'disabled';

      const updatedUser = await this.userService.updateUser(
        user_id,
        updateInfo,
      );
      res.sendStatus(200).json();
      console.log('role 변경 완료');
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}

export { UserController };
