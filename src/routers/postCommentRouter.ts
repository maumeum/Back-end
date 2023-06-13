import { Router } from 'express';
import { PostCommentController } from '../controllers/index.js';
import { loginRequired } from '../middlewares/loginRequired.js';
import { makeInstance } from '../utils/makeInstance.js';
import { adminOnly } from '../middlewares/adminOnly.js';
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

// 작성한 커뮤니티 댓글 신고
postCommentRouter.patch(
  '/postComments/reports/:postCommentId',
  loginRequired,
  postCommentController.patchReportComment
);

//작성한 커뮤니티 댓글 삭제
postCommentRouter.delete(
  '/postComments/:postCommentId',
  loginRequired,
  postCommentController.deleteComment
);

// ===== 관리자 기능 ======

//adminOnly 추가 예정(테스트 때문에 잠시 빼둠)

// 신고받은 게시글 전체 조회
postCommentRouter.get(
  '/postComments/admins/reports',
  adminOnly,
  postCommentController.getReportedPostComment
);

// 신고받은 게시글 취소(반려)
postCommentRouter.patch(
  '/postComments/admins/reports/cancellations/:postCommentId',
  adminOnly,
  postCommentController.patchReportedPostComment
);

// 신고받은 게시글 승인
postCommentRouter.delete(
  '/postComments/admins/reports/applications/:postCommentId',
  adminOnly,
  postCommentController.deleteReportedPostComment
);

export { postCommentRouter };
