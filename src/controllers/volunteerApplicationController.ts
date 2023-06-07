import { VolunteerApplicationService } from '../services/index.js';
import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE } from '../utils/statusCode.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
class VolunteerApplicationController {
  static postApplicationVolunteer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteer_id, isParticipate } = req.body;

      const user_id = req.id;

      await VolunteerApplicationService.createApplicationVolunteer({
        user_id,
        volunteer_id,
        isParticipate,
      });

      res.status(STATUS_CODE.CREATED).json({ message: 'created' });
    }
  );

  static getApplicationVolunter = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user_id = req.id;
      const applicationVolunteerList =
        await VolunteerApplicationService.readApplicationVolunteer(user_id);

      res.status(STATUS_CODE.OK).json(applicationVolunteerList);
    }
  );
}

export { VolunteerApplicationController };
