import { VolunteerModel } from '../db/index.js';
import { Volunteer } from '../db/schemas/volunteerSchema.js';
import { Types } from 'mongoose';

interface VolunteerData {
  title: string;
  content: string;
  centName: string;
  centDescription: string;
  statusName: string;
  deadline: Date;
  startDate: Date;
  endDate: Date;
  applyCount: number;
  registerCount: number;
  actType: string;
  teenager: boolean;
  images: string[];
  register_user_id: Types.ObjectId | string | null;
}

class VolunteerService {
  public async createVolunteer(volunteerData: VolunteerData) {
    const { deadline, startDate, endDate } = volunteerData;

    if (deadline > startDate || deadline > endDate || startDate > endDate) {
      return false;
    }
    const createVolunteer = await VolunteerModel.create(volunteerData);

    if (!createVolunteer) {
      throw new Error('봉사활동 생성에 실패했습니다.');
    }
    return true;
  }

  public async readVolunteer() {
    const volunteerList = await VolunteerModel.find({});
    if (!volunteerList) {
      throw new Error('봉사활동 전체 조회를 실패했습니다.');
    }

    return volunteerList;
  }

  public async readVolunteerById(volunteerId: string) {
    const volunteer = await VolunteerModel.findOne({
      _id: volunteerId,
    });

    if (!volunteer) {
      throw new Error('특정 봉사활동 조회를 실패했습니다.');
    }

    return volunteer;
  }

  public async readSearchVolunteer(keyword: string) {
    const options = [
      { title: { $regex: `${keyword}` } },
      { content: { $regex: `${keyword}` } },
    ];
    const volunteerList = await VolunteerModel.find({
      $or: options,
    });

    if (!volunteerList) {
      return false;
    }

    console.log(volunteerList);
    return volunteerList;
  }

  public async readRegistrationVolunteer(userId: string) {
    const volunteerList = await VolunteerModel.find({
      user_id: userId,
    }).populate('user_id');

    if (!volunteerList) {
      throw new Error('등록한 봉사활동 목록 조회를 실패했습니다.');
    }

    return volunteerList;
  }

  public async updateVolunteer(
    volunteerData: VolunteerData,
    volunteerId: string,
  ) {
    const newVolunteer = await VolunteerModel.findByIdAndUpdate(
      volunteerId,
      volunteerData,
    );

    if (!newVolunteer) {
      throw new Error('봉사활동 정보 업데이트에 실패했습니다.');
    }
    return true;
  }
}

export { VolunteerService };
