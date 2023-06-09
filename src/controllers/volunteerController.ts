import { NextFunction, Request, Response } from 'express';
import { VolunteerService } from '../services/index.js';
import { STATUS_CODE } from '../utils/statusCode.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { makeInstance } from '../utils/makeInstance.js';
import { buildResponse } from '../utils/builderResponse.js';
import { AppError } from '../misc/AppError.js';
import { commonErrors } from '../misc/commonErrors.js';

class VolunteerController {
  private volunteerService = makeInstance<VolunteerService>(VolunteerService);

  public postVolunteer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const register_user_id = req.id;
      const volunteerBodyData = req.body;

      const volunteerData = { ...volunteerBodyData, register_user_id };

      await this.volunteerService.createVolunteer(volunteerData);

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    }
  );

  public getVolunteer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const volunteerList = await this.volunteerService.readVolunteer();

      res.status(STATUS_CODE.OK).json(buildResponse(null, volunteerList));
    }
  );

  public getVolunteerById = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerId } = req.params;

      if (!volunteerId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST'
        );
      }
      const volunteer = await this.volunteerService.readVolunteerById(
        volunteerId
      );

      res.status(STATUS_CODE.OK).json(buildResponse(null, volunteer));
    }
  );

  public getSearchVolunteer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { keyword } = req.query;

      if (keyword) {
        const searchVolunteers =
          await this.volunteerService.readSearchVolunteer(keyword as string);

        res.status(STATUS_CODE.OK).json(buildResponse(null, searchVolunteers));
      } else {
        res.status(STATUS_CODE.OK).json(buildResponse(null, []));
      }
    }
  );

  public getRegisterationVolunteer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user_id = req.id;

      const registerationVolunteers =
        await this.volunteerService.readRegistrationVolunteer(user_id);

      res
        .status(STATUS_CODE.OK)
        .json(buildResponse(null, registerationVolunteers));
    }
  );

  public patchVolunteer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const VolunteerData = req.body;
      const { volunteerId } = req.params;

      if (!volunteerId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST'
        );
      }

      await this.volunteerService.updateVolunteer(volunteerId, VolunteerData);

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    }
  );

  public patchRegisterationStatusName = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerId } = req.params;

      if (!volunteerId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST'
        );
      }

      const { statusName } = req.body;

      await this.volunteerService.updateRegisterationVolunteer(
        volunteerId,
        statusName
      );

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    }
  );
}

export { VolunteerController };
