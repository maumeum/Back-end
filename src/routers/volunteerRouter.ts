import { Router } from 'express';
import { VolunteerController } from '../controllers/index.js';
import { loginRequired } from '../middlewares/loginRequired.js';
import { makeInstance } from '../utils/makeInstance.js';

const volunteerRouter = Router();

const volunteerController =
  makeInstance<VolunteerController>(VolunteerController);

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

volunteerRouter.get(
  '/volunteers/registeration',
  loginRequired,
  volunteerController.getRegisterationVolunteer
);

volunteerRouter.get(
  '/volunteers/:volunteerId',
  volunteerController.getVolunteerById
);

volunteerRouter.get('/volunteers', volunteerController.getVolunteer);

volunteerRouter.patch(
  '/volunteers/:volunteerId',
  loginRequired,
  volunteerController.patchVolunteer
);

export { volunteerRouter };
