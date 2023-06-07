import { Router } from 'express';
import { PostCommentController } from '../controllers/postCommentController.js';
import { loginRequired } from '../middlewares/loginRequired.js';
const postCommentRouter = Router();

postCommentRouter.post(
  '/postComments',
  loginRequired,
<<<<<<< HEAD
  PostCommentController.postComment,
);

postCommentRouter.post(
  '/postComments',
  loginRequired,
  PostCommentController.postComment,
=======
  PostCommentController.postComment
>>>>>>> e357cd205464861b900a4e9d6ae15fc22ecd46bf
);

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
  loginRequired,
<<<<<<< HEAD
  PostCommentController.patchComment,
=======
  PostCommentController.patchComment
>>>>>>> e357cd205464861b900a4e9d6ae15fc22ecd46bf
);

postCommentRouter.delete(
  '/postComments/:postCommentId',
<<<<<<< HEAD
  loginRequired,
  PostCommentController.deleteComment,
=======

  loginRequired,
  PostCommentController.deleteComment
>>>>>>> e357cd205464861b900a4e9d6ae15fc22ecd46bf
);

export { postCommentRouter };
