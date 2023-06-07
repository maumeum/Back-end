import { NextFunction, Request, Response } from 'express';
import { VolunteerService } from '../services/index.js';

class VolunteerController {
  public postVolunteer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const register_user_id = req.id;
      const volunteerBodyData = req.body;

      const volunteerData = { ...volunteerBodyData, register_user_id };

      await VolunteerService.prototype.createVolunteer(volunteerData);

      res.status(201).json({ message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getVolunteer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const volunteerList = await VolunteerService.prototype.readVolunteer();

      res.status(200).json(volunteerList);
    } catch (error) {
      next(error);
    }
  };

  public getVolunteerById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { volunteerId } = req.params;

      if (!volunteerId) {
        throw new Error('봉사활동 ID 정보를 다시 확인해주세요.');
      }
      const volunteer = await VolunteerService.prototype.readVolunteerById(
        volunteerId
      );

      res.status(200).json(volunteer);
    } catch (error) {
      next(error);
    }
  };

  public getSearchVolunteer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { keyword } = req.query;

      if (keyword) {
        const searchVolunteers =
          await VolunteerService.prototype.readSearchVolunteer(
            keyword as string
          );

        res.status(200).json(searchVolunteers);
      } else {
        res.status(200).json([]);
      }
    } catch (error) {
      next(error);
    }
  };

  public getRegisterationVolunteer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user_id = req.id;

      const registerationVolunteers =
        await VolunteerService.prototype.readRegistrationVolunteer(user_id);

      res.status(200).json(registerationVolunteers);
    } catch (error) {
      next(error);
    }
  };

  public patchVolunteer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const VolunteerData = req.body;
      const { volunteerId } = req.params;

      if (!volunteerId) {
        throw new Error('봉사활동 ID 정보를 다시 확인해주세요.');
      }

      const volunteer = await VolunteerService.prototype.updateVolunteer(
        VolunteerData,
        volunteerId
      );

      res.status(201).json({ message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

export { VolunteerController };
