import { Volunteer } from '../db/schemas/volunteerSchema.js';
import { VolunteerData, ApplicationVolunteerData } from '../types/volunteer.js';

type VolunteerType = VolunteerData | ApplicationVolunteerData;

const statusCondition = <T extends VolunteerType>(
  status: string,
  volunteerList: T[]
) => {
  let volunteerStatus;
  if (status === 'true') {
    //volunteerStatus = volunteerList.filter();
  }
};

export { statusCondition };
