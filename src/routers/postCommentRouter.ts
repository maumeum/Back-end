import { Router } from 'express';
import { PostCommentController } from '../controllers/postCommentController.js';
import { loginRequired } from '../middlewares/loginRequired.js';
const postCommentRouter = Router();

postCommentRouter.post(
  '/postComments',
  loginRequired,
<<<<<<< HEAD
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

=======
  PostCommentController.postComment,
);

>>>>>>> 50549970b4443470e23f62e76de10a21c5683226
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
<<<<<<< HEAD
  PostCommentController.patchComment,
=======
  PostCommentController.patchComment
>>>>>>> e357cd205464861b900a4e9d6ae15fc22ecd46bf
=======
  PostCommentController.patchComment
>>>>>>> 50549970b4443470e23f62e76de10a21c5683226
);

postCommentRouter.delete(
  '/postComments/:postCommentId',
<<<<<<< HEAD
<<<<<<< HEAD
  loginRequired,
  PostCommentController.deleteComment,
=======

  loginRequired,
  PostCommentController.deleteComment
>>>>>>> e357cd205464861b900a4e9d6ae15fc22ecd46bf
=======
  loginRequired,
  PostCommentController.deleteComment,
>>>>>>> 50549970b4443470e23f62e76de10a21c5683226
);

export { postCommentRouter };
