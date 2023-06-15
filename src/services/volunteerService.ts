import { ObjectId } from 'mongodb';
import { VolunteerModel } from '../db/index.js';
import { AppError } from '../misc/AppError.js';
import { commonErrors } from '../misc/commonErrors.js';
import { STATUS_CODE } from '../utils/statusCode.js';
import { logger } from '../utils/logger.js';

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
  actType:
    | '노인'
    | '급식'
    | '환경'
    | '동물'
    | '장애인'
    | '생활편의지원'
    | '의료'
    | '교육';
  teenager: boolean;
  images: string[];
  register_user_id: ObjectId;
}

interface VolunteerStatus {
  statusName: string;
}

interface VolunteerReportData {
  isReported: boolean;
}

interface VolunteerApplyCountData {
  applyCount: number;
}

class VolunteerService {
  public async createVolunteer(volunteerData: VolunteerData) {
    const { deadline, startDate, endDate, applyCount, registerCount } =
      volunteerData;

    if (deadline > startDate || deadline > endDate || startDate > endDate) {
      throw new AppError(
        commonErrors.inputError,
        STATUS_CODE.FORBIDDEN,
        'BAD_REQUEST'
      );
    }

    if (applyCount > registerCount) {
      throw new AppError(
        commonErrors.inputError,
        STATUS_CODE.FORBIDDEN,
        'BAD_REQUEST'
      );
    }
    const createVolunteer = await VolunteerModel.create(volunteerData);

    if (!createVolunteer) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST'
      );
    }
    return createVolunteer;
  }

  public async readVolunteer(skip: number, limit: number) {
    const volunteerList = await VolunteerModel.find({})
      .select(
        'title centName deadline statusName applyCount registerCount images'
      )
      .populate('register_user_id', ['image', 'nickname'])
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return volunteerList;
  }

  //전체 토탈
  public async totalVolunteerCount() {
    const counts = await VolunteerModel.countDocuments();
    return counts;
  }

  //관리자 토탈
  public async totalReportedVolunteerCount() {
    const counts = await VolunteerModel.countDocuments({ isReported: true });
    return counts;
  }

  public async readVolunteerById(volunteerId: string) {
    const volunteer = await VolunteerModel.findOne({
      _id: volunteerId,
    }).populate('register_user_id', [
      'nickname',
      'image',
      'introduction',
      'uuid',
    ]);

    if (!volunteer) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST'
      );
    }

    return volunteer;
  }

  public async readSearchVolunteer(
    keyword: string,
    skip: number,
    limit: number
  ) {
    const options = [
      { title: { $regex: `${keyword}` } },
      { content: { $regex: `${keyword}` } },
    ];
    const volunteerList = await VolunteerModel.find({
      $or: options,
    })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return volunteerList;
  }

  public async readRegistrationVolunteer(
    user_id: ObjectId,
    skip: number,
    limit: number
  ) {
    const volunteerList = await VolunteerModel.find({
      register_user_id: user_id,
    })
      .populate('register_user_id')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return volunteerList;
  }

  public async updateVolunteer(
    volunteer_id: string,
    volunteerData: VolunteerData
  ) {
    const volunteer = await VolunteerModel.findByIdAndUpdate(
      volunteer_id,
      volunteerData
    );

    if (!volunteer) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST'
      );
    }
    return true;
  }

  public async updateVolunteerApplyCount(
    volunteer_id: string,
    applyCount: VolunteerApplyCountData
  ) {
    const volunteer = await VolunteerModel.findByIdAndUpdate(
      volunteer_id,
      applyCount
    );

    if (!volunteer) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST'
      );
    }

    return true;
  }

  public async updateRegisterationVolunteer(
    volunteerId: string,
    volunteerData: VolunteerStatus
  ) {
    const volunteer = await VolunteerModel.findByIdAndUpdate(
      volunteerId,
      volunteerData
    );

    if (!volunteer) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST'
      );
    }

    return true;
  }

  public async updateReportVolunteer(
    volunteerId: string,
    isReported: VolunteerReportData
  ) {
    const volunteer = await VolunteerModel.findByIdAndUpdate(
      volunteerId,
      isReported
    );

    if (!volunteer) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST'
      );
    }

    return true;
  }

  // ===== 관리자 기능 =====

  public async readReportedVolunteer(skip: number, limit: number) {
    const reportedVolunteer = await VolunteerModel.find({
      isReported: true,
    })
      .select('title content')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return reportedVolunteer;
  }

  public async deleteReportedVolunteer(volunteer_id: string) {
    const volunteer = await VolunteerModel.findByIdAndDelete(
      volunteer_id
    ).populate('register_user_id', 'reportedTimes');

    if (!volunteer) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST'
      );
    }

    return volunteer;
  }
}

export { VolunteerService };
