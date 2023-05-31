import { Router } from 'express';
import { VolunteerController } from '../controllers/volunteerController.js';

const volunteerRouter = Router();

volunteerRouter.post(
  '/volunteers',
  VolunteerController.prototype.postVolunteer
);

volunteerRouter.get('/volunteers', VolunteerController.prototype.getVolunteer);
volunteerRouter.get(
  '/volunteers/:volunteerId',
  VolunteerController.prototype.getVolunteerById
);

// 쿼리스트링 : req.query.keyword 형태로 가져옴
volunteerRouter.get(
  '/volunteers/keyword',
  VolunteerController.prototype.getSearchVolunteer
);

volunteerRouter.get(
  '/volunteers/:userId/application',
  VolunteerController.prototype.getApplicationVolunteer
);
volunteerRouter.get(
  '/volunteers/:userId/registeration',
  VolunteerController.prototype.getRegisterationVolunteer
);

volunteerRouter.patch(
  '/volunteers/:volunteerId',
  VolunteerController.prototype.patchVolunteer
);

export { volunteerRouter };
