import { ObjectId } from 'mongodb';
import {
  ReviewModel,
  VolunteerApplicationModel,
  VolunteerModel,
} from '../db/index.js';
import { Volunteer } from '../db/schemas/volunteerSchema.js';
import { DateTime } from 'luxon';
import { CONSTANTS } from '../utils/Constants.js';
interface ReviewData {
  review_id?: ObjectId;
  user_id?: ObjectId;
  title?: string;
  content?: string;
  images?: string[];
  volunteer_id?: ObjectId;
}

class ReviewService {
  public async getReviewsById(user_id: ObjectId) {
    const reviews = await ReviewModel.find({ user_id: user_id });
    return reviews;
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
      throw new Error('해당하는 리뷰가 존재하지 않습니다.');
    }
    return updatedReview;
  }

  public async deleteReview(review_id: ObjectId) {
    const createReview = await ReviewModel.deleteOne({ _id: review_id });
    if (createReview.deletedCount === 0) {
      throw new Error('해당하는 리뷰가 존재하지 않습니다.');
    }
    return createReview;
  }

  public async getReviews() {
    const reviews = await ReviewModel.find().populate('user_id', 'nickname');
    return reviews;
  }

  // endDate 이후 && 7일 지나기 전, 사용자 본인이 상태를 직접 false => true로 변경하는 코드
  public async changeParticipateStatus(
    volunteer_id: ObjectId,
    user_id: ObjectId,
  ) {
    const matchedApplyVolunteer = await VolunteerApplicationModel.findOne({
      volunteer_id,
      user_id,
    }).populate('volunteer_id');

    if (!matchedApplyVolunteer) {
      throw new Error('Matching volunteer application not found.');
    }
    if (matchedApplyVolunteer.isParticipate) {
      throw new Error("isParticipate is already in status 'true'");
    }

    const volunteer = matchedApplyVolunteer.volunteer_id as Volunteer;
    const { endDate } = volunteer;

    const now = DateTime.now();
    const endDateTime = DateTime.fromJSDate(endDate);
    const sevenDaysAfterEnd = endDateTime.plus({
      days: CONSTANTS.CHANGING_DATE,
    });

    if (now > endDateTime && now < sevenDaysAfterEnd) {
      if (!matchedApplyVolunteer.isParticipate) {
        matchedApplyVolunteer.isParticipate = true;
        await matchedApplyVolunteer.save();
      }
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
      ).select('endDate');

      if (
        volunteer &&
        DateTime.fromJSDate(volunteer.endDate) <
          now.minus({ days: CONSTANTS.CHANGING_DATE })
      ) {
        apply.isParticipate = true;
        await apply.save();
      }
    }
    console.log('실행완료');
  }
}
export { ReviewService };
