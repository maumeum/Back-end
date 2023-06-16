import express, { NextFunction } from 'express';
import { ReviewController } from '../controllers/reviewController.js';
import { loginRequired } from '../middlewares/loginRequired.js';
import { imagesUploader } from '../utils/multer.js';
import { adminOnly } from '../middlewares/adminOnly.js';

const reviewRouter = express.Router();
const reviewController = new ReviewController();

//메인 리뷰 랜덤 조회
reviewRouter.get('/randomReviews', reviewController.readRandomReviews);

//리뷰 전체 조회 (일반유저)
reviewRouter.get('/review', reviewController.readReview);

//리뷰 상세페이지
reviewRouter.get(
  '/review/detail/:review_id',
  reviewController.readReviewDetail,
);

//본인이 작성한 리뷰가 맞는지 확인하는 API
reviewRouter.get(
  '/review/check/:review_id',
  loginRequired,
  reviewController.checkUser,
);

//유저 리뷰 조회 (마이페이지)
reviewRouter.get(
  '/reviews/users',
  loginRequired,
  reviewController.readMyReview,
);
//리뷰 생성
reviewRouter.post(
  '/review',
  loginRequired,
  imagesUploader,
  reviewController.postReview,
);

//리뷰 수정
reviewRouter.patch(
  '/review/users/:review_id',
  loginRequired,
  imagesUploader,
  reviewController.updateReview,
);

//리뷰 신고
reviewRouter.patch(
  '/review/users/reports/:review_id',
  loginRequired,
  reviewController.patchReportReview,
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

reviewRouter.get('/review/search', reviewController.getSearchReviews);

// ===== 관리자 기능 =====
//adminOnly 추가 예정(테스트 때문에 잠시 빼둠)
// 신고받은 게시글 전체 조회
reviewRouter.get(
  '/review/admins/reports',
  adminOnly,
  reviewController.getReportedReview,
);

// 신고받은 게시글 취소(반려)
reviewRouter.patch(
  '/review/admins/reports/cancellations/:review_id',
  adminOnly,
  reviewController.patchReportedReview,
);

// 신고받은 게시글 승인
reviewRouter.delete(
  '/review/admins/reports/applications/:review_id',
  adminOnly,
  reviewController.deleteReportedReview,
);

export { reviewRouter };
