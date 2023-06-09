import { VolunteerApplicationService } from '../services/index.js';
import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE } from '../utils/statusCode.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { makeInstance } from '../utils/makeInstance.js';
import { buildResponse } from '../utils/builderResponse.js';
import { logger } from '../utils/logger.js';
import { Volunteer } from '../db/schemas/volunteerSchema.js';
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

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    }
  );

  public getApplicationVolunter = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user_id = req.id;
      const { status } = req.query;
      let volunteerStatus;

      const applicationVolunteerList =
        await this.volunteerApplicationService.readApplicationVolunteer(
          user_id
        );

      if (status === 'true') {
        volunteerStatus = applicationVolunteerList.filter(
          (applicationVolunteer) => {
            const volunteer_id = applicationVolunteer.volunteer_id as Volunteer;

            return volunteer_id && volunteer_id.statusName === '모집중';
          }
        );
      } else if (status === 'false') {
        volunteerStatus = applicationVolunteerList.filter(
          (applicationVolunteer) => {
            const volunteer_id = applicationVolunteer.volunteer_id as Volunteer;

            return (
              volunteer_id &&
              (volunteer_id.statusName === '모집완료' ||
                volunteer_id.statusName === '모집중단')
            );
          }
        );
      }

      res.status(STATUS_CODE.OK).json(buildResponse(null, volunteerStatus));
    }
  );
}

export { VolunteerApplicationController };
