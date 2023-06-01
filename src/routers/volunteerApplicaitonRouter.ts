import { Router } from 'express';
import { VolunteerApplicationController } from '../controllers/volunteerApplicationController.js';

const volunteerApplicationRouter = Router();

volunteerApplicationRouter.post(
  '/applications',
  VolunteerApplicationController.postApplicationVolunteer
);

volunteerApplicationRouter.get(
  '/applications/:userId',
  VolunteerApplicationController.getApplicationVolunter
);
export { volunteerApplicationRouter };
