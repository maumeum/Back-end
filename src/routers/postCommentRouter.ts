import { Router } from 'express';
import { PostCommentController } from '../controllers/postCommentController.js';
import { loginRequired } from '../middlewares/loginRequied.js';
const postCommentRouter = Router();

postCommentRouter.post('/postComments', PostCommentController.postComment);

//이 부분 다시 수정
postCommentRouter.get(
  '/postComments/users',
  loginRequired,
  PostCommentController.getPostByComment
);

postCommentRouter.get(
  '/postComments/:postId',
  PostCommentController.getComment
);

postCommentRouter.patch(
  '/postComments/:postCommentId',
  PostCommentController.patchComment
);

postCommentRouter.delete(
  '/postComments/:postCommentId',
  PostCommentController.deleteComment
);

export { postCommentRouter };
