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

teamAuthRouter.get('/team/auth', loginRequired, teamAuthController.getTeamAuth);

teamAuthRouter.post(
  '/team/auth/admin',
  adminOnly,
  teamAuthController.updateAuthStatus,
);

export { teamAuthRouter };
