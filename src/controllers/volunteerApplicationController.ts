import { VolunteerApplicationService } from '../services/index.js';
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

      await VolunteerApplicationService.createApplicationVolunteer({
        user_id,
        volunteer_id,
        isParticipate,
      });

      res.status(201).json({ message: 'created' });
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

      res.status(200).json(applicationVolunteerList);
    } catch (error) {
      next(error);
    }
  };
}

export { VolunteerApplicationController };
