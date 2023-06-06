import { Router } from 'express';
import { PostCommentController } from '../controllers/postCommentController.js';
import { loginRequired } from '../middlewares/loginRequired.js';
const postCommentRouter = Router();

<<<<<<< Updated upstream
postCommentRouter.post('/postComments', PostCommentController.postComment);
=======
postCommentRouter.post(
  '/postComments',
  loginRequired,
  PostCommentController.postComment,
);
>>>>>>> Stashed changes

//이 부분 다시 수정
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
<<<<<<< Updated upstream
  PostCommentController.patchComment
=======
  loginRequired,
  PostCommentController.patchComment,
>>>>>>> Stashed changes
);

postCommentRouter.delete(
  '/postComments/:postCommentId',
<<<<<<< Updated upstream
  PostCommentController.deleteComment
=======
  loginRequired,
  PostCommentController.deleteComment,
>>>>>>> Stashed changes
);

export { postCommentRouter };
