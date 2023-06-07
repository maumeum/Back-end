import { ObjectId } from 'mongodb';
import { VolunteerApplicationModel } from '../db/index.js';

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
  static async createApplicationVolunteer({
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

  static async readApplicationVolunteer(userId: ObjectId) {
    const applicationVolunteerList = await VolunteerApplicationModel.find({
      user_id: userId,
    }).populate('volunteer_id', [
      'title',
      'centName',
      'deadline',
      'statusName',
      'images',
    ]);

    if (applicationVolunteerList.length === 0) {
      return [];
    }

    return applicationVolunteerList;
  }

  static async doubleCheckApplicationVolunteer({
    user_id,
    volunteer_id,
  }: doubleCheckApplicationVolunteerData) {
    try {
      const volunteerApplication = await VolunteerApplicationModel.find({
        user_id: user_id,
        volunteer_id: volunteer_id,
      });

      if (volunteerApplication.length !== 0) {
        throw new Error('이미 신청이 완료된 봉사활동입니다.');
      }

      return true;
    } catch (error) {
      console.log(error);
    }
  }

  static async readApplicationVolunteerByVId(volunteer_id: ObjectId) {
    const applicationVolunteerList = await VolunteerApplicationModel.find({
      volunteer_id: volunteer_id,
    }).select('isParticipate');

    if (applicationVolunteerList.length === 0) {
      return [];
    }
    return applicationVolunteerList;
  }
}

export { VolunteerApplicationService };
