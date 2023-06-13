import express from 'express';
import { TeamAuthController } from '../controllers/index.js';
import { loginRequired } from '../middlewares/loginRequired.js';
import { imageUploader } from '../utils/multer.js';
import { adminOnly } from '../middlewares/adminOnly.js';

const teamAuthRouter = express.Router();
const teamAuthController = new TeamAuthController();

teamAuthRouter.post(
  '/team/auth',
  loginRequired,
  imageUploader,
  teamAuthController.postTeamAuth,
);

//일반 유저가 본인의 정보를 조회
teamAuthRouter.get('/team/auth', loginRequired, teamAuthController.getTeamAuth);

//관리자가 팀 인증 요청을 전체 조회하는것
teamAuthRouter.get(
  '/team/auth/admin',
  adminOnly,
  teamAuthController.getSubmittedTeamAuth,
);

//관리자가 팀 인증 요청을 수락 or 거부
teamAuthRouter.post(
  '/team/auth/admin',
  adminOnly,
  teamAuthController.updateAuthStatus,
);

export { teamAuthRouter };
