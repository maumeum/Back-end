import { Router } from 'express';
import { VolunteerCommentController } from '../controllers/index.js';
import { loginRequired } from '../middlewares/loginRequired.js';
import { makeInstance } from '../utils/makeInstance.js';

const volunteerCommentRouter = Router();

const volunteerCommentController = makeInstance<VolunteerCommentController>(
  VolunteerCommentController
);

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

//봉사 모집하기 특정 게시글의 댓글 조회
volunteerCommentRouter.get(
  '/volunteerComments/:volunteerId',
  volunteerCommentController.getPostComment
);

volunteerCommentRouter.patch(
  '/volunteerComments/:volunteerCommentId',
  loginRequired,
  volunteerCommentController.patchComment
);

volunteerCommentRouter.delete(
  '/volunteerComments/:volunteerCommentId',
  loginRequired,
  volunteerCommentController.deleteComment
);

export { volunteerCommentRouter };
