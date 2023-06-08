import express from "express";
import multer from "multer";
import { CommunityController } from "../controllers/communityController.js";
import { loginRequired } from "../middlewares/loginRequired.js";
import { imageUploader } from "../utils/multer.js";

// const storage = multer.diskStorage({
//   //파일 저장 위치를 결정
//   destination: function (req, file, cb) {
//     cb(null, "../frontend/public/Images");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });

// const upload = multer({ storage: storage });

export const communityRouter = express.Router();
const communityController = new CommunityController();
//카테고리별 조회 //완료
communityRouter.get(
  "/community/category/:category",
  communityController.getPostByCategory
);

//유저 게시물 검색 //완료
communityRouter.get("/community/search", communityController.searchPost);

//유저 게시물 조회 //완료
communityRouter.get(
  "/community/user",
  loginRequired,
  communityController.getUserPosts
);

//특정 게시물 조회 // 완료
communityRouter.get("/community/:postid", communityController.getPost);

//특정 게시물 수정
communityRouter.patch(
  "/community/:id",
  imageUploader,
  loginRequired,
  communityController.patchPost
);

//게시물 맞는지 확인
communityRouter.get(
  "/community/check/:postid",
  loginRequired,
  communityController.checkUser
);

//특정 게시물 삭제 //완료
communityRouter.delete(
  "/community/:id",
  loginRequired,
  communityController.deletePost
);

//게시물 작성
communityRouter.post(
  "/community/create",
  loginRequired,
  imageUploader,
  communityController.createPost
);

//게시글 조회 //완료
communityRouter.get("/community", communityController.getAllPosts);
