import { Router } from 'express';
import { VolunteerController } from '../controllers/volunteerController.js';
<<<<<<< HEAD
import { loginRequired } from '../middlewares/loginRequied.js';
=======
<<<<<<< Updated upstream
=======
import { loginRequired } from '../middlewares/loginRequired.js';
>>>>>>> Stashed changes
>>>>>>> 8bc3748d4f95224af1ab0210316db9d3ab0beca2

const volunteerRouter = Router();
const volunteerController = new VolunteerController();

<<<<<<< HEAD
volunteerRouter.post(
  '/volunteers',
  loginRequired,
  volunteerController.postVolunteer
);
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

// 쿼리스트링 : req.query.keyword 형태로 가져옴
volunteerRouter.get(
  '/volunteers/search',
  volunteerController.getSearchVolunteer,
);

volunteerRouter.get('/volunteers', volunteerController.getVolunteer);

volunteerRouter.get(
  '/volunteers/:volunteerId',
  volunteerController.getVolunteerById,
);

volunteerRouter.get(
  '/volunteers/:userId/registeration',
<<<<<<< HEAD
  loginRequired,
=======
<<<<<<< Updated upstream
>>>>>>> 8bc3748d4f95224af1ab0210316db9d3ab0beca2
  volunteerController.getRegisterationVolunteer
=======
  loginRequired,
  volunteerController.getRegisterationVolunteer,
>>>>>>> Stashed changes
);

volunteerRouter.patch(
  '/volunteers/:volunteerId',
<<<<<<< HEAD
  loginRequired,
=======
<<<<<<< Updated upstream
>>>>>>> 8bc3748d4f95224af1ab0210316db9d3ab0beca2
  volunteerController.patchVolunteer
=======
  loginRequired,
  volunteerController.patchVolunteer,
>>>>>>> Stashed changes
);

export { volunteerRouter };
