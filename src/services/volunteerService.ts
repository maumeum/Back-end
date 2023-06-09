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
  actType: string;
  teenager: boolean;
  images: string[];
  register_user_id: ObjectId;
}

interface VolunteerStatus {
  statusName: string;
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

  public async readVolunteer() {
    const volunteerList = await VolunteerModel.find({});

    return volunteerList;
  }

  public async readVolunteerById(volunteerId: string) {
    const volunteer = await VolunteerModel.findOne({
      _id: volunteerId,
    });

    if (!volunteer) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST'
      );
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

    if (volunteerList.length === 0) {
      return [];
    }

    return volunteerList;
  }

  public async readRegistrationVolunteer(user_id: ObjectId) {
    const volunteerList = await VolunteerModel.find({
      register_user_id: user_id,
    }).populate('register_user_id');

    return volunteerList;
  }

  public async updateVolunteer(
    volunteerId: string,
    volunteerData: VolunteerData
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

  public async updateRegisterationVolunteer(
    volunteerId: string,
    statusName: VolunteerStatus
  ) {
    const volunteer = await VolunteerModel.findByIdAndUpdate(volunteerId, {
      statusName,
    });

    if (!volunteer) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST'
      );
    }

    return true;
  }
}

export { VolunteerService };
