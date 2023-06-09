import { ObjectId } from 'mongodb';
import { VolunteerApplicationModel } from '../db/index.js';
import { AppError } from '../misc/AppError.js';
import { STATUS_CODE } from '../utils/statusCode.js';
import { commonErrors } from '../misc/commonErrors.js';

interface ApplicationVolunteerData {
  user_id: ObjectId;
  volunteer_id: ObjectId;
  isParticipate: boolean;
}

interface doubleCheckApplicationVolunteerData {
  user_id: ObjectId;
  volunteer_id: ObjectId;
}

class VolunteerApplicationService {
  public async createApplicationVolunteer({
    user_id,
    volunteer_id,
    isParticipate,
  }: ApplicationVolunteerData) {
    //신청 가능여부 체크

    const result = await this.doubleCheckApplicationVolunteer({
      user_id,
      volunteer_id,
    });

    if (result) {
      const applicationVolunteer = await VolunteerApplicationModel.create({
        user_id,
        volunteer_id,
        isParticipate,
      });

      return applicationVolunteer;
    }
  }

  public async readApplicationVolunteer(userId: ObjectId) {
    const applicationVolunteerList = await VolunteerApplicationModel.find({
      user_id: userId,
    }).populate('volunteer_id', [
      'title',
      'centName',
      'deadline',
      'endDate',
      'startDate',
      'statusName',
      'images',
    ]);

    return applicationVolunteerList;
  }

  public async doubleCheckApplicationVolunteer({
    user_id,
    volunteer_id,
  }: doubleCheckApplicationVolunteerData) {
    const volunteerApplication = await VolunteerApplicationModel.find({
      user_id: user_id,
      volunteer_id: volunteer_id,
    });

    if (volunteerApplication.length !== 0) {
      throw new AppError(
        '이미 신청이 완료된 봉사활동입니다.',
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST',
      );
    }

    return true;
  }

  public async readApplicationVolunteerByVId(volunteer_id: ObjectId) {
    const applicationVolunteerList = await VolunteerApplicationModel.find({
      volunteer_id: volunteer_id,
    }).select('isParticipate');
    return applicationVolunteerList;
  }
}

export { VolunteerApplicationService };
