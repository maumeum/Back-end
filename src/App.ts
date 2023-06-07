import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import {
  userRouter,
  volunteerRouter,
  volunteerApplicationRouter,
  communityRouter,
  reviewRouter,
} from './routers/index.js';
import { volunteerCommentRouter } from './routers/volunteerCommentRouter.js';
import { postCommentRouter } from './routers/postCommentRouter.js';
import { error } from 'console';

dotenv.config();

const app = express();
const __dirname = path.resolve();
app.use('/', express.static(path.join(__dirname, 'public')));
console.log('🚀 ~ file: App.ts:22 ~ __dirname:', __dirname);

app.use(cors()); //cors에러 방지
app.use(express.json()); // 바디파서
app.use(express.urlencoded({ extended: true }));

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

app.use('/api', userRouter);
app.use('/api', volunteerRouter);
app.use('/api', volunteerApplicationRouter);
app.use('/api', volunteerCommentRouter);
app.use('/api', communityRouter);
app.use('/api', postCommentRouter);
app.use('/api', reviewRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res
    .status(500)
    .send('마지막 에러핸들러로 오류가 전달되었습니다. 콘솔을 확인해주세요.');
}); // 마지막에 붙이는 에러핸들러

export { app };
