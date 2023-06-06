import { Router } from 'express';
import { VolunteerApplicationController } from '../controllers/volunteerApplicationController.js';
import { loginRequired } from '../middlewares/loginRequied.js';

const volunteerApplicationRouter = Router();

volunteerApplicationRouter.post(
  '/applications',
  loginRequired,
  VolunteerApplicationController.postApplicationVolunteer
);

volunteerApplicationRouter.get(
  '/applications',
  loginRequired,
  VolunteerApplicationController.getApplicationVolunter
);
export { volunteerApplicationRouter };
