import { VolunteerApplicationService } from '../services/index.js';
import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE } from '../utils/statusCode.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { makeInstance } from '../utils/makeInstance.js';
class VolunteerApplicationController {
  private volunteerApplicationService =
    makeInstance<VolunteerApplicationService>(VolunteerApplicationService);

  public postApplicationVolunteer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteer_id, isParticipate } = req.body;

      const user_id = req.id;

      await this.volunteerApplicationService.createApplicationVolunteer({
        user_id,
        volunteer_id,
        isParticipate,
      });

      res.status(STATUS_CODE.CREATED).json({ message: 'created' });
    }
  );

  public getApplicationVolunter = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user_id = req.id;
      const applicationVolunteerList =
        await this.volunteerApplicationService.readApplicationVolunteer(
          user_id
        );

      res.status(STATUS_CODE.OK).json(applicationVolunteerList);
    }
  );
}

export { VolunteerApplicationController };
