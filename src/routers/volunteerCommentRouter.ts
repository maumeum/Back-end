import { Router } from 'express';
import { VolunteerCommentController } from '../controllers/index.js';
import { loginRequired } from '../middlewares/loginRequired.js';
import { makeInstance } from '../utils/makeInstance.js';

const volunteerCommentRouter = Router();

const volunteerCommentController = makeInstance<VolunteerCommentController>(
  VolunteerCommentController
);

// 봉사활동 상세정보에 댓글 생성
volunteerCommentRouter.post(
  '/volunteerComments',
  loginRequired,
  volunteerCommentController.postComment
);

// 사용자가 작성한 댓글 게시물 제목 조회
volunteerCommentRouter.get(
  '/volunteerComments/users',
  loginRequired,
  volunteerCommentController.getVolunteerByComment
);

//본인이 작성한 리뷰가 맞는지 확인하는 API(아직 미구현);
// volunteerCommentRouter.get(
//   '/volunteerComments/check/:volunteerId',
//   loginRequired,
//   volunteerCommentController.getCheckUser
// );

//봉사 모집하기 특정 게시글의 댓글 조회
volunteerCommentRouter.get(
  '/volunteerComments/:volunteerId',
  volunteerCommentController.getPostComment
);

//봉사 모집하기 특정 게시글의 댓글 수정
volunteerCommentRouter.patch(
  '/volunteerComments/:volunteerCommentId',
  loginRequired,
  volunteerCommentController.patchComment
);

volunteerCommentRouter.patch(
  '/volunteerComments/reports/:volunteerCommentId',
  loginRequired,
  volunteerCommentController.patchReportComment
);

//봉사 모집하기 특정 게시글의 댓글 삭제
volunteerCommentRouter.delete(
  '/volunteerComments/:volunteerCommentId',
  loginRequired,
  volunteerCommentController.deleteComment
);

// ====== 관리자 기능 =======

//adminOnly 추가 예정(테스트 때문에 잠시 빼둠)

// 신고받은 게시글 전체 조회
volunteerCommentRouter.get(
  '/volunteerComments/admins/reports',
  volunteerCommentController.getReportedVolunteerComment
);

// 신고받은 게시글 취소(반려)
volunteerCommentRouter.patch(
  '/volunteerComments/admins/reports/cancellations/:volunteerCommentId',
  volunteerCommentController.patchReportedVolunteerComment
);

// 신고받은 게시글 승인
volunteerCommentRouter.delete(
  '/volunteers/admins/reports/applications/:volunteerCommentId',
  volunteerCommentController.deleteReportedVolunteerComment
);

export { volunteerCommentRouter };
