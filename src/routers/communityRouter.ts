import express from 'express';
import multer from 'multer';
import { CommunityController } from '../controllers/communityController.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const storage = multer.diskStorage({
  //파일 저장 위치를 결정
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/Images');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

const upload = multer({ storage: storage });

export const communityRouter = express.Router();
const communityController = new CommunityController();

//유저 게시물 검색
communityRouter.get('/community/search', communityController.searchPost);

//유저 게시물 조회
communityRouter.get('/community/user/:id', communityController.getUserPosts);

//특정 게시물 조회
communityRouter.get('/community/:id', communityController.getPost);

//특정 게시물 수정
communityRouter.patch(
  '/community/:id',
  upload.single('file'),
  loginRequired,
  communityController.patchPost
);
//카테고리별 조회
communityRouter.post(
  'commnity/:category',
  communityController.getPostByCategory
);
//특정 게시물 삭제
communityRouter.delete(
  '/community/:id',
  loginRequired,
  communityController.deletePost
);

//게시물 작성
communityRouter.post(
  '/community/create',
  upload.single('file'),
  loginRequired,
  communityController.createPost
);

//게시글 조회
communityRouter.get('/community', communityController.getAllPosts);
