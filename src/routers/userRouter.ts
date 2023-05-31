import express from 'express';
import { UserController } from '../controllers/userController.js';
const userRouter = express.Router();

// 회원가입

const userController = new UserController();

userRouter.post('/signup', userController.createUser);

//로그인
userRouter.post('/signin');

//비밀번호 확인
userRouter.get('/users/authorization');

//사용자 정보 조회
userRouter.get('/users/:user_id');

//사용자 정보 수정
userRouter.post('/users/:user_id');

//사용자 회원 탈퇴
userRouter.delete('/users/:user_id');

export { userRouter };
