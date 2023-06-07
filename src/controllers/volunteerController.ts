import { NextFunction, Request, Response } from 'express';
import { VolunteerService } from '../services/index.js';
import { STATUS_CODE } from '../utils/statusCode.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';

class VolunteerController {
  public postVolunteer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const register_user_id = req.id;
      const volunteerBodyData = req.body;

      const volunteerData = { ...volunteerBodyData, register_user_id };

      await VolunteerService.prototype.createVolunteer(volunteerData);

      res.status(STATUS_CODE.CREATED).json({ message: 'created' });
    }
  );

  public getVolunteer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const volunteerList = await VolunteerService.prototype.readVolunteer();

      res.status(STATUS_CODE.OK).json(volunteerList);
    }
  );

  public getVolunteerById = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerId } = req.params;

      if (!volunteerId) {
        throw new Error('봉사활동 ID 정보를 다시 확인해주세요.');
      }
      const volunteer = await VolunteerService.prototype.readVolunteerById(
        volunteerId
      );

      res.status(STATUS_CODE.OK).json(volunteer);
    }
  );

  public getSearchVolunteer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { keyword } = req.query;

      if (keyword) {
        const searchVolunteers =
          await VolunteerService.prototype.readSearchVolunteer(
            keyword as string
          );

        res.status(STATUS_CODE.OK).json(searchVolunteers);
      } else {
        res.status(STATUS_CODE.OK).json([]);
      }
    }
  );

  public getRegisterationVolunteer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user_id = req.id;

      const registerationVolunteers =
        await VolunteerService.prototype.readRegistrationVolunteer(user_id);

      res.status(STATUS_CODE.OK).json(registerationVolunteers);
    }
  );

  public patchVolunteer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const VolunteerData = req.body;
      const { volunteerId } = req.params;

      if (!volunteerId) {
        throw new Error('봉사활동 ID 정보를 다시 확인해주세요.');
      }

      await VolunteerService.prototype.updateVolunteer(
        VolunteerData,
        volunteerId
      );

      res.status(STATUS_CODE.CREATED).json({ message: 'updated' });
    }
  );
}

export { VolunteerController };
