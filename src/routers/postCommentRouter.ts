import { Router } from 'express';
import { PostCommentController } from '../controllers/index.js';
import { loginRequired } from '../middlewares/loginRequired.js';
import { makeInstance } from '../utils/makeInstance.js';
const postCommentRouter = Router();

const postCommentController = makeInstance<PostCommentController>(
  PostCommentController
);

//커뮤니티 댓글 작성
postCommentRouter.post(
  '/postComments',
  loginRequired,
  postCommentController.postComment
);

// 사용자가 작성한 댓글의 게시글 확인
postCommentRouter.get(
  '/postComments/users',
  loginRequired,
  postCommentController.getPostByComment
);

// postId에 해당하는 커뮤니티 댓글 전체 확인
postCommentRouter.get(
  '/postComments/:postId',
  postCommentController.getComment
);

//작성한 커뮤니티 댓글 수정
postCommentRouter.patch(
  '/postComments/:postCommentId',
  loginRequired,
  postCommentController.patchComment
);

//작성한 커뮤니티 댓글 삭제
postCommentRouter.delete(
  '/postComments/:postCommentId',
  loginRequired,
  postCommentController.deleteComment
);

export { postCommentRouter };
