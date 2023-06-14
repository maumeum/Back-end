import express from "express";
import multer from "multer";
import { CommunityController } from "../controllers/communityController.js";
import { loginRequired } from "../middlewares/loginRequired.js";
import { imageUploader, imagesUploader } from "../utils/multer.js";
import { adminOnly } from "../middlewares/adminOnly.js";

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
communityRouter.get("/community/:id", communityController.getPost);

//특정 게시물 수정
communityRouter.patch(
  "/community/:id",
  imagesUploader,
  communityController.patchPost
);

//특정 게시물 신고
communityRouter.patch(
  "/community/reports/:communityId",
  loginRequired,
  communityController.patchReportPost
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
  imagesUploader,
  communityController.createPost
);

//게시글 조회 //완료
communityRouter.get("/community", communityController.getAllPosts);

// ====== 관리자 기능 =======

//adminOnly 추가 예정(테스트 때문에 잠시 빼둠)

// 신고받은 게시글 전체 조회
communityRouter.get(
  "/community/admins/reports",
  adminOnly,
  communityController.getReportedCommunity
);

// 신고받은 게시글 취소(반려)
communityRouter.patch(
  "/community/admins/reports/cancellations/:communityId",
  adminOnly,
  communityController.patchReportedCommunity
);

// 신고받은 게시글 승인
communityRouter.delete(
  "/community/admins/reports/applications/:communityId",
  adminOnly,
  communityController.deleteReportedCommunity
);
