import { Router } from 'express';
import { PostCommentController } from '../controllers/postCommentController.js';
import { loginRequired } from '../middlewares/loginRequired.js';
const postCommentRouter = Router();

<<<<<<< HEAD
postCommentRouter.post(
  '/postComments',
  loginRequired,
  PostCommentController.postComment
);
=======
<<<<<<< Updated upstream
postCommentRouter.post('/postComments', PostCommentController.postComment);
=======
postCommentRouter.post(
  '/postComments',
  loginRequired,
  PostCommentController.postComment,
);
>>>>>>> Stashed changes
>>>>>>> 8bc3748d4f95224af1ab0210316db9d3ab0beca2

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
<<<<<<< HEAD
  loginRequired,
=======
<<<<<<< Updated upstream
>>>>>>> 8bc3748d4f95224af1ab0210316db9d3ab0beca2
  PostCommentController.patchComment
=======
  loginRequired,
  PostCommentController.patchComment,
>>>>>>> Stashed changes
);

postCommentRouter.delete(
  '/postComments/:postCommentId',
<<<<<<< HEAD
  loginRequired,
=======
<<<<<<< Updated upstream
>>>>>>> 8bc3748d4f95224af1ab0210316db9d3ab0beca2
  PostCommentController.deleteComment
=======
  loginRequired,
  PostCommentController.deleteComment,
>>>>>>> Stashed changes
);

export { postCommentRouter };
