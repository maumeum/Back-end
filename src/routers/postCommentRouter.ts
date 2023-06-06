import { Router } from 'express';
import { PostCommentController } from '../controllers/postCommentController.js';
import { loginRequired } from '../middlewares/loginRequired.js';
const postCommentRouter = Router();

<<<<<<< Updated upstream
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
=======
>>>>>>> Stashed changes
postCommentRouter.post(
  '/postComments',
  loginRequired,
  PostCommentController.postComment,
);
<<<<<<< Updated upstream
>>>>>>> Stashed changes
>>>>>>> 8bc3748d4f95224af1ab0210316db9d3ab0beca2
=======
postCommentRouter.post('/postComments', PostCommentController.postComment);
>>>>>>> ae194264417a1aa6f6015a713bb3d156d6e9a317
=======
>>>>>>> Stashed changes

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
<<<<<<< HEAD
  loginRequired,
<<<<<<< Updated upstream
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
=======
  PostCommentController.patchComment,
);

postCommentRouter.delete('/postComments/:postCommentId', loginRequired);
>>>>>>> Stashed changes

export { postCommentRouter };
