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
volunteerCommentRouter.get(
  '/volunteerComments/check/:volunteerId',
  loginRequired,
  volunteerCommentController.getCheckUser
);

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

//봉사 모집하기 특정 게시글의 댓글 삭제
volunteerCommentRouter.delete(
  '/volunteerComments/:volunteerCommentId',
  loginRequired,
  volunteerCommentController.deleteComment
);

export { volunteerCommentRouter };
