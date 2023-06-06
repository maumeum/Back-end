import { NextFunction, Request, Response } from 'express';
import { VolunteerService } from '../services/volunteerService.js';

class VolunteerController {
  public postVolunteer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const volunteerData = req.body;

      const result = await VolunteerService.prototype.createVolunteer(
        volunteerData
      );

      //if else 문이 필요하지 않음. 어차피
      if (result) {
        res.status(201).json({ message: 'created' });
      } else {
        res.status(404).json({ message: 'error' });
      }
    } catch (error) {
      next(error);
    }
  };

  public getVolunteer = async (req: Request, res: Response) => {
    try {
      const volunteerList = await VolunteerService.prototype.readVolunteer();

      if (volunteerList) {
        res.status(200).json(volunteerList);
      } else {
        console.log('error');
        res.status(404).json({ message: 'error' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  public getVolunteerById = async (req: Request, res: Response) => {
    try {
      const { volunteerId } = req.params;
      const volunteer = await VolunteerService.prototype.readVolunteerById(
        volunteerId
      );

      if (volunteer) {
        res.status(200).json(volunteer);
      } else {
        res.status(404).json({ message: 'error' });
      }
    } catch (error) {}
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

        if (searchVolunteers) {
          res.status(200).json(searchVolunteers);
        } else {
          res.status(404).json({ message: '검색된 결과가 없습니다.' });
        }
      } else {
        res.status(404).json([]);
      }
    } catch (error) {
      next(error);
    }
  };

  public getRegisterationVolunteer = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const registerationVolunteers =
        await VolunteerService.prototype.readRegistrationVolunteer(userId);

      if (registerationVolunteers) {
        res.status(200).json(registerationVolunteers);
      } else {
        res.status(400).json({ message: 'error' });
      }
    } catch (error) {}
  };

  public patchVolunteer = async (req: Request, res: Response) => {
    try {
      const VolunteerData = req.body;
      const { volunteerId } = req.params;

      const volunteer = await VolunteerService.prototype.updateVolunteer(
        VolunteerData,
        volunteerId
      );

      if (volunteer) {
        res.status(201).json({ message: 'updated' });
      } else {
        res.status(404).json({ message: 'error' });
      }
    } catch (error) {}
  };
}

export { VolunteerController };
