import express from 'express';
import { UserController } from '../controllers/userController.js';
import { loginRequired } from '../middlewares/loginRequied.js';
const userRouter = express.Router();

const userController = new UserController();

// 회원가입
userRouter.post('/signup', userController.createUser);

//로그인
userRouter.post('/login', userController.userLogin);

//비밀번호 확인
userRouter.post('/users/auth', loginRequired, userController.userAuthorization);

//사용자 정보 조회
userRouter.get('/users/info', loginRequired, userController.getUser);

//사용자 정보 수정 (닉네임, 휴대전화번호, 비밀번호)
userRouter.patch('/users/info', loginRequired, userController.updateUserInfo);

//사용자 정보 수정 (자기소개)
userRouter.patch(
  '/users/introduction',
  loginRequired,
  userController.updateIntroduction,
);

//사용자 정보 수정(이미지)
userRouter.patch('/users/image', loginRequired, userController.updateImage);
//사용자 회원 탈퇴
userRouter.delete('/users', loginRequired, userController.deleteUser);

export { userRouter };
