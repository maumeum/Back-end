import express, { Express, Request, Response } from "express";
import { app } from "./src/App.js";
import dotenv from "dotenv";
import { communityRouter } from "./src/routers/communityRouter.js";

dotenv.config();

const port = process.env.PORT;
const url = process.env.URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/commuities", communityRouter);

// app.get("/", (req: Request, res: Response) => {
//   res.send("aaaaaaTypescript + Node.js + Express Server");
// });

app.listen(port, () => {
  console.log(`[server]:서버가 ${url}:${3000} 에서 실행되고 있습니다. `);
});
