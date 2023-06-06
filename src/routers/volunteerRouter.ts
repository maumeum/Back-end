import { Router } from 'express';
import { VolunteerController } from '../controllers/volunteerController.js';
<<<<<<< HEAD
<<<<<<< HEAD
import { loginRequired } from '../middlewares/loginRequied.js';
=======
<<<<<<< Updated upstream
=======
import { loginRequired } from '../middlewares/loginRequired.js';
>>>>>>> Stashed changes
>>>>>>> 8bc3748d4f95224af1ab0210316db9d3ab0beca2
=======

import { loginRequired } from '../middlewares/loginRequired.js';
>>>>>>> ae194264417a1aa6f6015a713bb3d156d6e9a317

const volunteerRouter = Router();
const volunteerController = new VolunteerController();

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ae194264417a1aa6f6015a713bb3d156d6e9a317
volunteerRouter.post(
  '/volunteers',
  loginRequired,
  volunteerController.postVolunteer
);
<<<<<<< HEAD
=======
<<<<<<< Updated upstream
volunteerRouter.post('/volunteers', volunteerController.postVolunteer);
=======
volunteerRouter.post(
  '/volunteers',
  loginRequired,
  volunteerController.postVolunteer,
);
>>>>>>> Stashed changes
>>>>>>> 8bc3748d4f95224af1ab0210316db9d3ab0beca2
=======
>>>>>>> ae194264417a1aa6f6015a713bb3d156d6e9a317

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
<<<<<<< HEAD
<<<<<<< HEAD
  loginRequired,
=======
<<<<<<< Updated upstream
>>>>>>> 8bc3748d4f95224af1ab0210316db9d3ab0beca2
=======
  loginRequired,
>>>>>>> ae194264417a1aa6f6015a713bb3d156d6e9a317
  volunteerController.getRegisterationVolunteer
);

volunteerRouter.patch(
  '/volunteers/:volunteerId',
<<<<<<< HEAD
<<<<<<< HEAD
  loginRequired,
=======
<<<<<<< Updated upstream
>>>>>>> 8bc3748d4f95224af1ab0210316db9d3ab0beca2
=======
  loginRequired,
>>>>>>> ae194264417a1aa6f6015a713bb3d156d6e9a317
  volunteerController.patchVolunteer
);

export { volunteerRouter };
