import express from 'express';
import { ReviewController } from '../controllers/reviewController.js';
import { loginRequired } from '../middlewares/loginRequied.js';

const reviewRouter = express.Router();
const reviewController = new ReviewController();

//리뷰 전체 조회
reviewRouter.get('/review', reviewController.readReview);

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

export { reviewRouter };
