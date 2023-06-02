import { Types } from 'mongoose';
import { VolunteerApplicationModel } from '../db/index.js';

interface ApplicationVolunteerData {
  user_id: Types.ObjectId | string | null;
  volunteerTitle: string;
  volunteerCentName: string;
  volunteerStatusName: string;
  volunteerImages: string;
}
class VolunteerApplicationService {
  static async createApplicationVolunteer(
    applicationVolunteerData: ApplicationVolunteerData
  ) {
    const applicationVolunteer = await VolunteerApplicationModel.create(
      applicationVolunteerData
    );

    if (!applicationVolunteer) {
      throw new Error('봉사활동 신청에 실패하였습니다.');
    }

    return applicationVolunteer;
  }
}

export { VolunteerApplicationService };
