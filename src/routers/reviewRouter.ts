import express, { NextFunction } from 'express';
import { ReviewController } from '../controllers/reviewController.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const reviewRouter = express.Router();
const reviewController = new ReviewController();

//리뷰 전체 조회 (일반유저)
reviewRouter.get('/review', reviewController.readReview);

//유저 리뷰 조회 (마이페이지)
reviewRouter.get(
  '/reviews/users',
  loginRequired,
  reviewController.readMyReview,
);
//리뷰 생성
reviewRouter.post('/review', loginRequired, reviewController.postReview);

//리뷰 수정
reviewRouter.patch(
  '/review/users/:review_id',
  loginRequired,
  reviewController.updateReview,
);

//리뷰 삭제
reviewRouter.delete(
  '/review/users/:review_id',
  loginRequired,
  reviewController.deleteReview,
);

//isParticipate 상태 변경
reviewRouter.post(
  '/review/users/participation/:volunteer_id',
  loginRequired,
  reviewController.changeParticipationStatus,
);

export { reviewRouter };
