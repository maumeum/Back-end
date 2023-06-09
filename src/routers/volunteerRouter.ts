import { Router } from 'express';
import { VolunteerController } from '../controllers/index.js';
import { loginRequired } from '../middlewares/loginRequired.js';
import { makeInstance } from '../utils/makeInstance.js';

const volunteerRouter = Router();

const volunteerController =
  makeInstance<VolunteerController>(VolunteerController);

// 봉사활동 정보 등록
volunteerRouter.post(
  '/volunteers',
  loginRequired,
  volunteerController.postVolunteer
);

// 쿼리스트링 : req.query.keyword 형태로 가져옴
// keyword가 포함된 봉사활동 글 검색
volunteerRouter.get(
  '/volunteers/search',
  volunteerController.getSearchVolunteer
);

//사용자가 등록한 봉사활동 조회
volunteerRouter.get(
  '/volunteers/registerations',
  loginRequired,
  volunteerController.getRegisterationVolunteer
);

// 특정 봉사활동 정보 조회
volunteerRouter.get(
  '/volunteers/:volunteerId',
  volunteerController.getVolunteerById
);

//전체 봉사활동 정보조회
volunteerRouter.get('/volunteers', volunteerController.getVolunteer);

// 특정 봉사활동 정보수정
volunteerRouter.patch(
  '/volunteers/:volunteerId',
  loginRequired,
  volunteerController.patchVolunteer
);

//
volunteerRouter.patch(
  '/volunteers/registerations/:volunteerId',
  loginRequired,
  volunteerController.patchRegisterationStatusName
);

export { volunteerRouter };
