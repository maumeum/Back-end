import { Router } from 'express';
import { VolunteerApplicationController } from '../controllers/index.js';
import { loginRequired } from '../middlewares/loginRequired.js';
import { makeInstance } from '../utils/makeInstance.js';

const volunteerApplicationRouter = Router();

const volunteerApplicationController =
  makeInstance<VolunteerApplicationController>(VolunteerApplicationController);

// 봉사활동 신청
volunteerApplicationRouter.post(
  '/applications',
  loginRequired,
  volunteerApplicationController.postApplicationVolunteer
);

// 신청한 봉사활동 정보 확인
volunteerApplicationRouter.get(
  '/applications',
  loginRequired,
  volunteerApplicationController.getApplicationVolunter
);
export { volunteerApplicationRouter };
