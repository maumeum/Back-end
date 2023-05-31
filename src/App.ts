import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import { userRouter } from './routers/userRouter.js';
import cors from 'cors';
dotenv.config();

const app = express();

const __dirname = path.resolve();
app.use('/', express.static(path.join(__dirname, 'public')));

app.use(cors());

// DB연결
const DB_URL =
  process.env.MONGODB_URL ||
  'MongoDB 서버 주소가 설정되지 않았거나, env 파일도 필요합니다.\n';
mongoose.connect(DB_URL, { dbName: 'maum' });
const db = mongoose.connection;
db.on('connected', () =>
  console.log('정상적으로 MongoDB 서버에 연결되었습니다.  ' + DB_URL),
);
db.on('error', (error) =>
  console.error('\nMongoDB 연결에 실패하였습니다...\n' + DB_URL + '\n' + error),
);

app.use(express.json());

// // 세션 사용
// app.use(
//   session({
//     secret: process.env.SECRET_CODE || '',
//     resave: true,
//     saveUninitialized: false,
//   }),
// );
// //passport 초기화
// app.use(passport.initialize());
// app.use(passport.session());

// 라우팅

app.use('/api', userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export { app };
