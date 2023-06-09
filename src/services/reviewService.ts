import { ObjectId } from 'mongodb';
import {
  ReviewModel,
  VolunteerApplicationModel,
  VolunteerModel,
} from '../db/index.js';
import { Volunteer } from '../db/schemas/volunteerSchema.js';
import { DateTime } from 'luxon';
import { CONSTANTS } from '../utils/Constants.js';
import { commonErrors } from '../misc/commonErrors.js';
import { STATUS_CODE } from '../utils/statusCode.js';
import { AppError } from '../misc/AppError.js';
import { logger } from '../utils/logger.js';
interface ReviewData {
  review_id?: ObjectId;
  user_id?: ObjectId;
  title?: string;
  content?: string;
  images?: string[];
  volunteer_id?: ObjectId;
}

class ReviewService {
  public async getReviewsByUserId(user_id: ObjectId) {
    const reviews = await ReviewModel.find({ user_id: user_id });
    return reviews;
  }

  public async getReviewById(review_id: ObjectId) {
    const review = await ReviewModel.findById(review_id).populate(
      'user_id',
      'nickname',
    );
    return review;
  }

  public async createReview(createInfo: ReviewData) {
    const createReview = await ReviewModel.create(createInfo);
    return createReview;
  }

  public async updateReview(review_id: ObjectId, updateInfo: ReviewData) {
    const updatedReview = await ReviewModel.findOneAndUpdate(
      { _id: review_id },
      updateInfo,
      { new: true },
    );
    if (!updatedReview) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST',
      );
    }
    return updatedReview;
  }

  public async deleteReview(review_id: ObjectId) {
    const createReview = await ReviewModel.deleteOne({ _id: review_id });
    if (createReview.deletedCount === 0) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST',
      );
    }
    return createReview;
  }

  public async getReviews(skip: number, limit: number) {
    const reviews = await ReviewModel.find()
      .populate({
        path: 'user_id',
        select: 'nickname nanoid',
      })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return reviews;
  }

  public async totalReviewsCount() {
    const counts = await ReviewModel.countDocuments();
    return counts;
  }

  // endDate 이후 && 7일 지나기 전, 사용자 본인이 상태를 직접 false => true로 변경하는 코드
  public async changeParticipateStatus(
    volunteer_id: ObjectId,
    user_id: ObjectId,
  ) {
    const matchedApplyVolunteer = await VolunteerApplicationModel.findOne({
      volunteer_id,
      user_id,
    }).populate({ path: 'volunteer_id', select: 'endDate statusName' });
    const matchedVolunteer = await VolunteerModel.findById(volunteer_id);
    if (!matchedApplyVolunteer || !matchedVolunteer) {
      throw new AppError(
        `${commonErrors.resourceNotFoundError} : 일치하는 데이터 없음.`,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST',
      );
    }
    if (matchedApplyVolunteer.isParticipate) {
      throw new AppError(
        "isParticipate is already in status 'true'",
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST',
      );
    }
    logger.debug(`matchedApplyVolunteer : ${matchedApplyVolunteer}`);

    const volunteer = matchedApplyVolunteer.volunteer_id as Volunteer;
    logger.debug(`volunteer : ${volunteer}`);
    const { endDate, statusName } = volunteer;

    logger.debug(`statusName : ${statusName}`);
    logger.debug(endDate);
    const now = DateTime.now();
    logger.debug(`now : ${now}`);
    const endDateTime = DateTime.fromJSDate(endDate);
    logger.debug(`endDate : ${endDateTime}`);
    const sevenDaysAfterEnd = endDateTime.plus({
      days: CONSTANTS.CHANGING_DATE,
    });
    logger.debug(`sevenDaysAfterEnd:${sevenDaysAfterEnd}`);

    if (now > endDateTime && now < sevenDaysAfterEnd) {
      if (!matchedApplyVolunteer.isParticipate) {
        matchedApplyVolunteer.isParticipate = true;
        matchedVolunteer.statusName = '모집완료';
        //@ts-ignore
        logger.debug(volunteer.statusName);
        await matchedVolunteer.save();
        logger.debug(`matchedVolunteer : ${matchedVolunteer}`);
        await matchedApplyVolunteer.save();
      } else {
        throw new AppError(
          '조건에 만족하는 요청이 아닙니다. No changes were made',
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }
    } else {
      throw new AppError(
        '조건에 만족하는 요청이 아닙니다. No changes were made',
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST',
      );
    }
  }

  public async changeParticipateStatusAtMidnight() {
    const applyVolunteer = await VolunteerApplicationModel.find({
      isParticipate: false,
    }).select('volunteer_id isParticipate');

    const now = DateTime.now();

    for (const apply of applyVolunteer) {
      const volunteer = await VolunteerModel.findById(
        apply.volunteer_id,
      ).select('endDate statusName');
      logger.debug(`volunteer : ${volunteer}`);
      if (
        volunteer &&
        volunteer.statusName !== '모집중단' &&
        DateTime.fromJSDate(volunteer.endDate) <
          now.minus({ days: CONSTANTS.CHANGING_DATE })
      ) {
        apply.isParticipate = true;
        volunteer.statusName = '모집완료';
        await volunteer.save();
        await apply.save();
        logger.debug(`volunteer : ${volunteer}`);
        logger.debug(`apply : ${apply}`);
      }
    }
  }
}
export { ReviewService };
