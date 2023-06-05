import { VolunteerApplicationService } from '../services/volunteerApplicationService.js';
import { Request, Response } from 'express';
class VolunteerApplicationController {
  static postApplicationVolunteer = async (req: Request, res: Response) => {
    const { volunteer_id, isParticipate } = req.body;

    const user_id = req.id;

    const result = await VolunteerApplicationService.createApplicationVolunteer(
      { user_id, volunteer_id, isParticipate }
    );

    if (result) {
      res.status(201).json({ message: 'created' });
    } else {
      res.status(404).json({ message: 'error' });
    }
  };

  static getApplicationVolunter = async (req: Request, res: Response) => {
    const user_id = req.id;
    const applicationVolunteerList =
      await VolunteerApplicationService.readApplicationVolunteer(user_id);

    if (applicationVolunteerList) {
      res.status(200).json(applicationVolunteerList);
    } else {
      res.status(404).json({ message: 'error' });
    }
  };
}

export { VolunteerApplicationController };
