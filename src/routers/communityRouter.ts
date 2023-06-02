import express from "express";
import { PostModel } from "../db/index.js";
import { CommunityController } from "../controllers/communityController.js";

export const communityRouter = express.Router();
const communityController = new CommunityController();

//전체 게시물 조회
communityRouter.get("/", communityController.getAllPosts);

//게시물 작성
communityRouter.post("/", communityController.createPost);

//특정 게시물 조회
communityRouter.get("/:id", communityController.getPost);

//특정 게시물 수정
communityRouter.patch("/:id", communityController.patchPost);

//특정 게시물 삭제
communityRouter.delete("/:id", communityController.deletePost);
