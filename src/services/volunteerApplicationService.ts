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

    await VolunteerApplicationModel.create({
      user_id,
      volunteer_id,
      isParticipate,
    });

    return true;
  }

  public async readApplicationVolunteer(
    userId: ObjectId,
    isParticipateStatus: boolean
  ) {
    const applicationVolunteerList = await VolunteerApplicationModel.find({
      user_id: userId,
      isParticipate: isParticipateStatus,
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
          select: ['nickname', 'image', 'authorization'],
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
      return true;
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

  public async readApplicationVolunteerByCondition(condition: {}) {
    const checkedApplicationVolunteer = await VolunteerApplicationModel.findOne(
      condition
    );
    return checkedApplicationVolunteer;
  }

  public async deleteApplicationVolunteer(volunteerApplicationId: string) {
    await VolunteerApplicationModel.findByIdAndDelete(volunteerApplicationId);

    return true;
  }
}

export { VolunteerApplicationService };
