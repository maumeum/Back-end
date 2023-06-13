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
<<<<<<< HEAD
    //신청 중복여부 체크
    const result = await this.doubleCheckApplicationVolunteer({
=======
    //신청 가능여부 체크

    await VolunteerApplicationModel.create({
>>>>>>> e3580e7a415c5eafb24e4bdf63083c9be05942d0
      user_id,
      volunteer_id,
      isParticipate,
    });

    return true;
  }

  public async readApplicationVolunteer(userId: ObjectId) {
    const applicationVolunteerList = await VolunteerApplicationModel.find({
      user_id: userId,
    })
      .populate({
        path: 'volunteer_id',
        select: [
          'title',
          'centName',
          'deadline',
          'endDate',
          'startDate',
          'statusName',
          'images',
          'register_user_id',
        ],
        populate: {
          path: 'register_user_id',
          select: ['nickname', 'image'],
        },
      })
      .exec();

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
<<<<<<< HEAD
      throw new AppError(
        '이미 신청이 완료된 봉사활동입니다.',
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST'
      );
=======
      return true;
>>>>>>> e3580e7a415c5eafb24e4bdf63083c9be05942d0
    }

    return false;
  }

  // public async getStockCheck()

  public async readApplicationVolunteerByVId(volunteer_id: ObjectId) {
    const applicationVolunteerList = await VolunteerApplicationModel.find({
      volunteer_id: volunteer_id,
    }).select('isParticipate');
    return applicationVolunteerList;
  }

  public async deleteApplicationVolunteer(volunteerApplicationId: string) {
    await VolunteerApplicationModel.findByIdAndDelete(volunteerApplicationId);

    return true;
  }
}

export { VolunteerApplicationService };
