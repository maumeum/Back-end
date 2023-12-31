import { Router } from 'express';
import { VolunteerController } from '../controllers/index.js';
import { loginRequired } from '../middlewares/loginRequired.js';
import { makeInstance } from '../utils/makeInstance.js';
import { imagesUploader } from '../utils/multer.js';
import { adminOnly } from '../middlewares/adminOnly.js';

const volunteerRouter = Router();

const volunteerController =
  makeInstance<VolunteerController>(VolunteerController);

// 봉사활동 정보 등록
volunteerRouter.post(
  '/volunteers',
  loginRequired,
  imagesUploader,
  volunteerController.postVolunteer
);

// 쿼리스트링 : req.query.keyword 형태로 가져옴
// keyword가 포함된 봉사활동 글 검색
// skip, limit
volunteerRouter.get(
  '/volunteers/search',
  volunteerController.getSearchVolunteer
);

//사용자가 등록한 봉사활동 전체 조회
// skip, limit
volunteerRouter.get(
  '/volunteers/registerations',
  loginRequired,
  volunteerController.getRegisterationVolunteer
);

// 봉사활동 수정 및 삭제 가능 여부 체크(로그인한 사용자가 업로드한 봉사활동인지 체크)
volunteerRouter.get(
  '/volunteers/check/:volunteerId',
  loginRequired,
  volunteerController.getCheckUser
);

// 특정 봉사활동 정보 조회
volunteerRouter.get(
  '/volunteers/:volunteerId',
  volunteerController.getVolunteerById
);

//전체 봉사활동 정보조회
// skip, limit
volunteerRouter.get('/volunteers', volunteerController.getVolunteer);

// 특정 봉사활동 정보수정
volunteerRouter.patch(
  '/volunteers/:volunteerId',
  loginRequired,
  imagesUploader,
  volunteerController.patchVolunteer
);

//등록한 봉사활동 모집상태 수정
volunteerRouter.patch(
  '/volunteers/registerations/:volunteerId',
  loginRequired,
  volunteerController.patchRegisterationStatusName
);

// 등록한 봉사활동 신고
volunteerRouter.patch(
  '/volunteers/reports/:volunteerId',
  loginRequired,
  volunteerController.patchReportVolunteer
);

// ====== 관리자 기능 =======

//adminOnly 추가 예정(테스트 때문에 잠시 빼둠)

// 신고받은 게시글 전체 조회
// skip, limit
volunteerRouter.get(
  '/volunteers/admins/reports',
  adminOnly,
  volunteerController.getReportedVolunteer
);

// 신고받은 게시글 취소(반려)
volunteerRouter.patch(
  '/volunteers/admins/reports/cancellations/:volunteerId',
  adminOnly,
  volunteerController.patchReportedVolunteer
);

// 신고받은 게시글 승인
volunteerRouter.delete(
  '/volunteers/admins/reports/applications/:volunteerId',
  adminOnly,
  volunteerController.deleteReportedVolunteer
);

export { volunteerRouter };
