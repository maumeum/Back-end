import express from "express";
import multer from "multer";
import { CommunityController } from "../controllers/communityController.js";

const storage = multer.diskStorage({
  //파일 저장 위치를 결정
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/Images");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

export const communityRouter = express.Router();
const communityController = new CommunityController();

//유저 게시물 조회
communityRouter.get("/search", communityController.searchPost);

//유저 게시물 조회
communityRouter.get("/user/:id", communityController.getUserPosts);

//특정 게시물 조회
communityRouter.get("/:id", communityController.getPost);

//특정 게시물 수정
communityRouter.patch(
  "/:id",
  upload.single("file"),
  communityController.patchPost
);

//특정 게시물 삭제
communityRouter.delete("/:id", communityController.deletePost);

//게시물 작성
communityRouter.post(
  "/create",
  upload.single("file"),
  communityController.createPost
);

//게시글 조회
communityRouter.get("/", communityController.getAllPosts);
