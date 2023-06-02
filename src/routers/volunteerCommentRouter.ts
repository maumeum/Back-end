import { Router } from 'express';
import { VolunteerCommentController } from '../controllers/volunteerCommentController.js';

const volunteerCommentRouter = Router();

volunteerCommentRouter.post(
  '/comments',
  VolunteerCommentController.postComment
);

// 사용자가 작성한 댓글 게시물 제목 조회
volunteerCommentRouter.get(
  '/comments/users/:userId',
  VolunteerCommentController.getComment
);

//봉사 모집하기 게시글의 특정 게시글의 댓글 조회
volunteerCommentRouter.get(
  '/comments/:volunteerId',
  VolunteerCommentController.getPostComment
);

volunteerCommentRouter.patch(
  '/comments/:volunteerCommentId',
  VolunteerCommentController.patchComment
);

volunteerCommentRouter.delete(
  '/comments/:volunteerCommentId',
  VolunteerCommentController.deleteComment
);

export { volunteerCommentRouter };
