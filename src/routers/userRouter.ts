import express from 'express';
import { UserController } from '../controllers/userController.js';
import passport from 'passport';
import { isLoggedIn, isNotLoggedIn } from '../middlewares/checkLogin.js';
const userRouter = express.Router();

const userController = new UserController();

userRouter.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// 회원가입
userRouter.post('/signup', userController.createUser);

//로그인
userRouter.post('/login', isNotLoggedIn, userController.login);

//로그아웃
userRouter.get('/logout', isLoggedIn, userController.logout);

//비밀번호 확인
userRouter.get('/users/authorization');

//사용자 정보 조회
userRouter.get('/users/:user_id', isLoggedIn, userController.getUser);

//사용자 정보 수정
userRouter.post('/users/:user_id');

//사용자 회원 탈퇴
userRouter.delete('/users/:user_id');

export { userRouter };
