import express from 'express';
import { UserController } from '../controllers/userController.js';
import { loginRequired } from '../middlewares/loginRequied.js';
const userRouter = express.Router();

const userController = new UserController();

userRouter.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// 회원가입
userRouter.post('/signup', userController.createUser);

//로그인
userRouter.post('/login', userController.userLogin);

//비밀번호 확인
userRouter.post(
  '/users/auth/:user_id',
  loginRequired,
  userController.userAuthorization,
);

//사용자 정보 조회
userRouter.get('/users/:user_id', loginRequired, userController.getUser);

//사용자 정보 수정 (닉네임, 휴대전화번호, 비밀번호)
userRouter.patch(
  '/users/:user_id',
  loginRequired,
  userController.updateUserInfo,
);

//사용자 정보 수정 (자기소개)
userRouter.patch(
  '/users/:user_id/introduction',
  loginRequired,
  userController.updateIntroduction,
);

//사용자 회원 탈퇴
userRouter.delete('/users/:user_id', loginRequired, userController.deleteUser);

export { userRouter };
