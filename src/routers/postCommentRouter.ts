import { Router } from 'express';
import { PostCommentController } from '../controllers/postCommentController.js';
import { loginRequired } from '../middlewares/loginRequired.js';
const postCommentRouter = Router();

<<<<<<< HEAD
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
=======
postCommentRouter.post('/postComments', PostCommentController.postComment);
>>>>>>> ae194264417a1aa6f6015a713bb3d156d6e9a317

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
<<<<<<< HEAD
<<<<<<< HEAD
  loginRequired,
=======
<<<<<<< Updated upstream
>>>>>>> 8bc3748d4f95224af1ab0210316db9d3ab0beca2
=======
  loginRequired,
>>>>>>> ae194264417a1aa6f6015a713bb3d156d6e9a317
  PostCommentController.patchComment
);

postCommentRouter.delete(
  '/postComments/:postCommentId',
<<<<<<< HEAD
<<<<<<< HEAD
  loginRequired,
=======
<<<<<<< Updated upstream
>>>>>>> 8bc3748d4f95224af1ab0210316db9d3ab0beca2
=======
  loginRequired,
>>>>>>> ae194264417a1aa6f6015a713bb3d156d6e9a317
  PostCommentController.deleteComment
);

export { postCommentRouter };
