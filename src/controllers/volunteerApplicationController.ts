import { VolunteerApplicationService } from '../services/volunteerApplicationService.js';
import { NextFunction, Request, Response } from 'express';
class VolunteerApplicationController {
  static postApplicationVolunteer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { volunteer_id, isParticipate } = req.body;

      const user_id = req.id;

      const result =
        await VolunteerApplicationService.createApplicationVolunteer({
          user_id,
          volunteer_id,
          isParticipate,
        });

      if (result) {
        res.status(201).json({ message: 'created' });
      } else {
        res.status(404).json({ message: '봉사활동 신청에 실패하였습니다.' });
      }
    } catch (error) {
      next(error);
    }
  };

  static getApplicationVolunter = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user_id = req.id;
      const applicationVolunteerList =
        await VolunteerApplicationService.readApplicationVolunteer(user_id);

      if (applicationVolunteerList) {
        res.status(200).json(applicationVolunteerList);
      } else {
        res
          .status(404)
          .json({ message: '봉사활동 신청내역 조회에 실패하였습니다.' });
      }
    } catch (error) {
      next(error);
    }
  };
}

export { VolunteerApplicationController };
