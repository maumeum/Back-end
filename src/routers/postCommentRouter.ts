import { Router } from 'express';
import { PostCommentController } from '../controllers/index.js';
import { loginRequired } from '../middlewares/loginRequired.js';
import { makeInstance } from '../utils/makeInstance.js';
const postCommentRouter = Router();

const postCommentController = makeInstance<PostCommentController>(
  PostCommentController
);

postCommentRouter.post(
  '/postComments',
  loginRequired,
  postCommentController.postComment
);

postCommentRouter.get(
  '/postComments/users',
  loginRequired,
  postCommentController.getPostByComment
);

postCommentRouter.get(
  '/postComments/:postId',
  postCommentController.getComment
);

postCommentRouter.patch(
  '/postComments/:postCommentId',
  loginRequired,
  postCommentController.patchComment
);

postCommentRouter.delete(
  '/postComments/:postCommentId',
  loginRequired,
  postCommentController.deleteComment
);

export { postCommentRouter };
