import express from "express";

import { CommunityController } from "../controllers/communityController.js";

export const communityRouter = express.Router();
const communityController = new CommunityController();

//유저 게시물 조회
communityRouter.get("/search", communityController.searchPost);

//유저 게시물 조회
communityRouter.get("/user/:id", communityController.getUserPosts);

//특정 게시물 조회
communityRouter.get("/:id", communityController.getPost);

//특정 게시물 수정
communityRouter.patch("/:id", communityController.patchPost);

//특정 게시물 삭제
communityRouter.delete("/:id", communityController.deletePost);

//게시물 작성
communityRouter.post("/create", communityController.createPost);

//게시글 조회
communityRouter.get("/", communityController.getAllPosts);
