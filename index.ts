import express, { Express, Request, Response } from 'express';
import { app } from './src/App.js';
import dotenv from 'dotenv';
import path from 'path';
import { changeParticipateStatus } from './src/utils/Scheduler.js';

dotenv.config();

const port = process.env.PORT;
const url = process.env.URL;

changeParticipateStatus();

app.get('/', (req: Request, res: Response) => {
  res.send('aaaaaaTypescript + Node.js + Express Server');
});

app.listen(port, () => {
  console.log(`[server]:서버가 ${url}:${port} 에서 실행되고 있습니다.`);
});
