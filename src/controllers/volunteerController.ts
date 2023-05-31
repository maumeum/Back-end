import { Request, Response } from 'express';
import { VolunteerService } from '../services/volunteerService.js';
import { Volunteer } from '../db/schemas/volunteerSchema.js';

class VolunteerController {
  public postVolunteer = async (req: Request, res: Response) => {
    try {
      const volunteerData = req.body;
      const result = await VolunteerService.prototype.createVolunteer(
        volunteerData
      );

      if (result) {
        res.status(201).json({ message: 'created' });
      } else {
        res.status(404).send({ message: 'error' });
      }
    } catch (error) {}
  };

  public getVolunteer = async (req: Request, res: Response) => {
    try {
      const volunteerList = await VolunteerService.prototype.readVolunteer();

      if (volunteerList) {
        res.status(200).json(volunteerList);
      } else {
        res.status(404).send({ message: 'error' });
      }
    } catch (error) {}
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
        res.status(404).send({ message: 'error' });
      }
    } catch (error) {}
  };

  public getSearchVolunteer = async (req: Request, res: Response) => {
    try {
      const { keyword } = req.query;
      const searchVolunteers =
        await VolunteerService.prototype.readSearchVolunteer(keyword as string);

      res.status(200).json(searchVolunteers);
    } catch (error) {}
  };

  public getApplicationVolunteer = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const applicationVolunteers =
        await VolunteerService.prototype.readApplicationVolunteer(userId);

      if (applicationVolunteers) {
        res.status(200).json(applicationVolunteers);
      } else {
        res.status(404).json({ message: 'error' });
      }
    } catch (error) {}
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
      //const { title, content, centName, centDescription, statusName, deadline, applyCount, registerCount, actType, teenager, images } = req.body;
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
