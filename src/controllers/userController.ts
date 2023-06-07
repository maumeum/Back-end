import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/index.js';
import bcrypt from 'bcrypt';
import { makeJwtToken } from '../utils/jwtTokenMaker.js';
import { ObjectId } from 'mongodb';
import { CONSTANTS } from '../utils/Constants.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { makeInstance } from '../utils/makeInstance.js';
import { STATUS_CODE } from '../utils/statusCode.js';
import { buildResponse } from '../utils/builderResponse.js';
import { AppError } from '../misc/AppError.js';
import { commonErrors } from '../misc/commonErrors.js';
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
  image?: any;
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
  private userService = makeInstance<UserService>(UserService);

  //회원가입시 이메일 중복체크
  public checkEmailDuplication = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email } = req.body;
      const user = await this.userService.getUserByEmail(email);
      if (user) {
        throw new AppError(
          commonErrors.resourceDuplicationError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }
      res.status(STATUS_CODE.OK).json(buildResponse(null, null));
    },
  );

  //유저 생성
  public createUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { nickname, email, password, phone } = req.body;
      const user = await this.userService.getUserByEmail(email);
      if (user) {
        throw new AppError(
          commonErrors.resourceDuplicationError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }

      const createdUser = await this.userService.createUser({
        nickname,
        email,
        password,
        phone,
      });
      res.status(STATUS_CODE.CREATED).json(buildResponse(null, createdUser));
    },
  );

  //유저 정보 조회
  public getUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user_id = req.id;
      const user = await this.userService.getUserById(user_id);
      res.status(STATUS_CODE.OK).json(user);
    },
  );

  //유저 로그인
  public userLogin = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = <UserLoginInfo>req.body;
      const user = await this.userService.getUserByEmail(email);
      if (!user) {
        throw new AppError(
          `${commonErrors.authenticationError} : 가입내역 없음`,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }

      if (user.role === 'disabled') {
        throw new AppError(
          `${commonErrors.authorizationError} : 탈퇴`,
          STATUS_CODE.FORBIDDEN,
          'FORBIDDEN',
        );
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new AppError(
          `${commonErrors.authorizationError} : 비밀번호 불일치`,
          STATUS_CODE.FORBIDDEN,
          'FORBIDDEN',
        );
      }
      const madeToken = makeJwtToken(user);
      res.status(STATUS_CODE.CREATED).json(buildResponse(null, madeToken));
    },
  );

  public userAuthorization = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user_id = req.id;
      const { password } = req.body;
      const user = await this.userService.getUserPasswordById(user_id);
      if (!user) {
        throw new AppError(
          commonErrors.authorizationError,
          STATUS_CODE.FORBIDDEN,
          'FORBIDDEN',
        );
      }

      const correctPasswordHash = user.password;
      const isPasswordCorrect = await bcrypt.compare(
        password,
        correctPasswordHash,
      );
      if (!isPasswordCorrect) {
        throw new AppError(
          `${commonErrors.authorizationError} : 비밀번호 불일치`,
          STATUS_CODE.FORBIDDEN,
          'FORBIDDEN',
        );
      }
      res.status(STATUS_CODE.OK).json(buildResponse(null, null));
    },
  );

  //유저 정보 수정(닉네임, 휴대전화번호 , 비밀번호)
  public updateUserInfo = asyncHandler(
    async (req: UpdateUserInfoRequest, res: Response, next: NextFunction) => {
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
      res.status(STATUS_CODE.CREATED).json(buildResponse(null, updatedUser));
    },
  );

  public updateIntroduction = asyncHandler(
    async (req: UpdateUserInfoRequest, res: Response, next: NextFunction) => {
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
      res.status(STATUS_CODE.CREATED).json(buildResponse(null, updatedUser));
    },
  );

  public updateImage = asyncHandler(
    async (req: UpdateUserInfoRequest, res: Response, next: NextFunction) => {
      const user_id = req.id;
      //@ts-ignore
      const image = `images/${req.file.filename}`;
      //@ts-ignore
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
      res.status(STATUS_CODE.CREATED).json(buildResponse(null, updatedUser));
    },
  );

  public deleteUser = asyncHandler(
    async (req: UpdateUserInfoRequest, res: Response, next: NextFunction) => {
      const user_id = req.id;
      const updateInfo: updatedUser = {};
      updateInfo.role = 'disabled';

      const updatedUser = await this.userService.updateUser(
        user_id,
        updateInfo,
      );
      res.status(STATUS_CODE.OK).json(buildResponse(null, updatedUser));
    },
  );
}

export { UserController };
