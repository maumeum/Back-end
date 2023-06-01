import { Router } from 'express';
import { VolunteerController } from '../controllers/volunteerController.js';

const volunteerRouter = Router();
const volunteerController = new VolunteerController();

//VolunteerControll.prototype.postVolunteer
volunteerRouter.post('/volunteers', volunteerController.postVolunteer);

volunteerRouter.get('/volunteers', volunteerController.getVolunteer);

volunteerRouter.get(
  '/volunteers/:volunteerId',
  volunteerController.getVolunteerById
);

// 쿼리스트링 : req.query.keyword 형태로 가져옴
volunteerRouter.get(
  '/volunteers/keyword',
  volunteerController.getSearchVolunteer
);

volunteerRouter.get(
  '/volunteers/:userId/application',
  volunteerController.getApplicationVolunteer
);
volunteerRouter.get(
  '/volunteers/:userId/registeration',
  volunteerController.getRegisterationVolunteer
);

volunteerRouter.patch(
  '/volunteers/:volunteerId',
  volunteerController.patchVolunteer
);

export { volunteerRouter };
