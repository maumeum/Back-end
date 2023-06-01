import { VolunteerApplicationService } from '../services/volunteerApplicationService.js';
import { Request, Response } from 'express';
class VolunteerApplicationController {
  static postApplicationVolunteer = async (req: Request, res: Response) => {
    const { applicationVolunteerData } = req.body;
    const result = await VolunteerApplicationService.createApplicationVolunteer(
      applicationVolunteerData
    );

    if (result) {
      res.status(201).json({ message: 'created' });
    } else {
      res.status(404).json({ message: 'error' });
    }
  };

  static getApplicationVolunter = async (req: Request, res: Response) => {
    const { userId } = req.params;
    //const applicationVolunteerList =
    //await userService.readApplicationVolunteer(userId);

    // if (applicationVolunteerList) {
    //   res.status(200).json(applicationVolunteerList);
    // } else {
    //   res.status(404).json({ message: 'error' });
    // }
  };
}

export { VolunteerApplicationController };
