import { Router } from 'express';
import { VolunteerController } from '../controllers/volunteerController.js';

import { loginRequired } from '../middlewares/loginRequired.js';

const volunteerRouter = Router();
const volunteerController = new VolunteerController();

volunteerRouter.post(
  '/volunteers',
  loginRequired,
  volunteerController.postVolunteer
);

// 쿼리스트링 : req.query.keyword 형태로 가져옴
volunteerRouter.get(
  '/volunteers/search',
  volunteerController.getSearchVolunteer
);

volunteerRouter.get('/volunteers', volunteerController.getVolunteer);

volunteerRouter.get(
  '/volunteers/:volunteerId',
  volunteerController.getVolunteerById
);

volunteerRouter.get(
  '/volunteers/:userId/registeration',
  loginRequired,
  volunteerController.getRegisterationVolunteer
);

volunteerRouter.patch(
  '/volunteers/:volunteerId',
  loginRequired,
  volunteerController.patchVolunteer
);

export { volunteerRouter };
