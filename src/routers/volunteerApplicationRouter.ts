import { Router } from 'express';
import { VolunteerApplicationController } from '../controllers/index.js';
import { loginRequired } from '../middlewares/loginRequired.js';
import { makeInstance } from '../utils/makeInstance.js';

const volunteerApplicationRouter = Router();

const volunteerApplicationController =
  makeInstance<VolunteerApplicationController>(VolunteerApplicationController);

volunteerApplicationRouter.post(
  '/applications',
  loginRequired,
  volunteerApplicationController.postApplicationVolunteer
);

volunteerApplicationRouter.get(
  '/applications',
  loginRequired,
  volunteerApplicationController.getApplicationVolunter
);
export { volunteerApplicationRouter };
