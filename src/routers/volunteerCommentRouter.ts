import { Router } from 'express';
import { VolunteerCommentController } from '../controllers/index.js';
import { loginRequired } from '../middlewares/loginRequired.js';
import { makeInstance } from '../utils/makeInstance.js';
import { adminOnly } from '../middlewares/adminOnly.js';

const volunteerCommentRouter = Router();

const volunteerCommentController = makeInstance<VolunteerCommentController>(
  VolunteerCommentController,
);

// 봉사활동 상세정보에 댓글 생성
volunteerCommentRouter.post(
  '/volunteerComments',
  loginRequired,
  volunteerCommentController.postComment,
);

// 사용자가 작성한 댓글 게시물 제목 조회
volunteerCommentRouter.get(
  '/volunteerComments/users',
  loginRequired,
  volunteerCommentController.getVolunteerByComment,
);

//봉사 모집하기 특정 게시글의 댓글 조회
volunteerCommentRouter.get(
  '/volunteerComments/:volunteerId',
  volunteerCommentController.getPostComment,
);

//봉사 모집하기 특정 게시글의 댓글 수정
volunteerCommentRouter.patch(
  '/volunteerComments/:volunteerCommentId',
  loginRequired,
  volunteerCommentController.patchComment,
);

// 봉사 모집하기 특정 게시글의 댓글 신고
volunteerCommentRouter.patch(
  '/volunteerComments/reports/:volunteerCommentId',
  loginRequired,
  volunteerCommentController.patchReportComment,
);

//봉사 모집하기 특정 게시글의 댓글 삭제
volunteerCommentRouter.delete(
  '/volunteerComments/:volunteerCommentId',
  loginRequired,
  volunteerCommentController.deleteComment,
);

// ====== 관리자 기능 =======

//adminOnly 추가 예정(테스트 때문에 잠시 빼둠)

// 신고받은 게시글 전체 조회
volunteerCommentRouter.get(
  '/volunteerComments/admins/reports',
  adminOnly,
  volunteerCommentController.getReportedVolunteerComment,
);

// 신고받은 게시글 취소(반려)
volunteerCommentRouter.patch(
  '/volunteerComments/admins/reports/cancellations/:volunteerCommentId',
  adminOnly,
  volunteerCommentController.patchReportedVolunteerComment,
);

// 신고받은 게시글 승인
volunteerCommentRouter.delete(
  '/volunteerComments/admins/reports/applications/:volunteerCommentId',
  adminOnly,
  volunteerCommentController.deleteReportedVolunteerComment,
);

export { volunteerCommentRouter };
