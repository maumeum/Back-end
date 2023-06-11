import express from 'express';
import { TeamAuthController } from '../controllers/index.js';
import { loginRequired } from '../middlewares/loginRequired.js';
import { imageUploader } from '../utils/multer.js';

const teamAuthRouter = express.Router();
const teamAuthController = new TeamAuthController();

teamAuthRouter.post(
  '/team/auth',
  loginRequired,
  imageUploader,
  teamAuthController.postTeamAuth,
);

teamAuthRouter.post('/team/auth/admin', loginRequired);

export { teamAuthRouter };
