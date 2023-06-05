import { Router } from 'express';
import { VolunteerCommentController } from '../controllers/volunteerCommentController.js';

const volunteerCommentRouter = Router();

volunteerCommentRouter.post(
  '/volunteerComments',
  VolunteerCommentController.postComment
);

// 사용자가 작성한 댓글 게시물 제목 조회
volunteerCommentRouter.get(
  '/volunteerComments/users/:userId',
  VolunteerCommentController.getComment
);

//봉사 모집하기 게시글의 특정 게시글의 댓글 조회
volunteerCommentRouter.get(
  '/volunteerComments/:volunteerId',
  VolunteerCommentController.getPostComment
);

volunteerCommentRouter.patch(
  '/volunteerComments/:volunteerCommentId',
  VolunteerCommentController.patchComment
);

volunteerCommentRouter.delete(
  '/volunteerComments/:volunteerCommentId',
  VolunteerCommentController.deleteComment
);

export { volunteerCommentRouter };
