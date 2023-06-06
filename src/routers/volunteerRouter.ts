import { Router } from 'express';
import { VolunteerController } from '../controllers/volunteerController.js';
<<<<<<< Updated upstream
=======
import { loginRequired } from '../middlewares/loginRequired.js';
>>>>>>> Stashed changes

const volunteerRouter = Router();
const volunteerController = new VolunteerController();

<<<<<<< Updated upstream
volunteerRouter.post('/volunteers', volunteerController.postVolunteer);
=======
volunteerRouter.post(
  '/volunteers',
  loginRequired,
  volunteerController.postVolunteer,
);
>>>>>>> Stashed changes

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
  '/volunteers/:userId/application',
  volunteerController.getApplicationVolunteer
);

volunteerRouter.get(
  '/volunteers/:userId/registeration',
<<<<<<< Updated upstream
  volunteerController.getRegisterationVolunteer
=======
  loginRequired,
  volunteerController.getRegisterationVolunteer,
>>>>>>> Stashed changes
);

volunteerRouter.patch(
  '/volunteers/:volunteerId',
<<<<<<< Updated upstream
  volunteerController.patchVolunteer
=======
  loginRequired,
  volunteerController.patchVolunteer,
>>>>>>> Stashed changes
);

export { volunteerRouter };
