import { Router } from 'express';
import { PostCommentController } from '../controllers/postCommentController.js';
import { loginRequired } from '../middlewares/loginRequired.js';
const postCommentRouter = Router();

postCommentRouter.post(
  '/postComments',
  loginRequired,
  PostCommentController.postComment,
);

postCommentRouter.get(
  '/postComments/users',
  loginRequired,
  PostCommentController.getPostByComment,
);

postCommentRouter.get(
  '/postComments/:postId',
  PostCommentController.getComment,
);

postCommentRouter.patch(
  '/postComments/:postCommentId',
  loginRequired,
  PostCommentController.patchComment,
);

postCommentRouter.delete(
  '/postComments/:postCommentId',
  loginRequired,
  PostCommentController.deleteComment,
);

export { postCommentRouter };
