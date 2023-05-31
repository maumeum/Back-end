import { VolunteerModel } from '../db/index.js';
import { Volunteer } from '../db/schemas/volunteerSchema.js';

interface VolunteerData {
  title: string;
  content: string;
  centName: string;
  centDescription: string;
  statusName: string;
  deadline: Date;
  applyCount: number;
  registerCount: number;
  actType: string;
  teenager: boolean;
  images: string[];
}

class VolunteerService {
  //public volunteer = VolunteerModel;

  public async createVolunteer(volunteerData: VolunteerData) {
    // const {
    //
    // } = volunteerData;

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
    const volunteer = await VolunteerModel.findOne({ _id: volunteerId });

    if (!volunteer) {
      throw new Error('특정 봉사활동 조회를 실패했습니다.');
    }

    return volunteer;
  }

  public async readSearchVolunteer(keyword: string) {
    const volunteerList = await VolunteerModel.find({
      text: { $regex: `.${keyword}.*` },
    });
  }

  //사용자가 신청한 봉사활동 조회
  public async readApplicationVolunteer(userId: string) {
    const volunteerList = await VolunteerModel.find({
      userId: userId,
    }).populate('user_id');

    if (!volunteerList) {
      throw new Error('신청한 봉사활동 목록 조회를 실패했습니다.');
    }

    return volunteerList;
  }

  public async readRegistrationVolunteer(userId: string) {
    const volunteerList = await VolunteerModel.find({
      userId: userId,
    }).populate('user_id');

    if (!volunteerList) {
      throw new Error('등록한 봉사활동 목록 조회를 실패했습니다.');
    }

    return volunteerList;
  }

  public async updateVolunteer(
    volunteerData: VolunteerData,
    volunteerId: string
  ) {
    // const {
    //   title,
    //   content,
    //   centName,
    //   centDescription,
    //   statusName,
    //   deadline,
    //   applyCount,
    //   registerCount,
    //   actType,
    //   teenager,
    //   images,
    // } = volunteerData;

    await VolunteerModel.findByIdAndUpdate(volunteerId, volunteerData);
    return true;
  }
}

export { VolunteerService };
