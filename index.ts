import express, { Express, Request, Response } from "express";
import { app } from "./src/App.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const port = process.env.PORT;
const url = process.env.URL;

app.get("/", (req: Request, res: Response) => {
  res.send("aaaaaaTypescript + Node.js + Express Server");
});

app.listen(port, () => {
  console.log(`[server]:서버가 ${url}:${port} 에서 실행되고 있습니다. `);
});

//아래는 FE 리액트와 연결하기 위한 예제코드
// app.use(express.static(path.join(__dirname, 'react-project/build')));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, '/react-project/build/index.html'));
// });
