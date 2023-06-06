import { ObjectId } from 'mongodb';
import {
  ReviewModel,
  VolunteerApplicationModel,
  VolunteerModel,
} from '../db/index.js';
import { Volunteer } from '../db/schemas/volunteerSchema.js';
import { DateTime } from 'luxon';
interface ReviewData {
  review_id?: ObjectId;
  user_id?: ObjectId;
  title?: string;
  content?: string;
  images?: string[];
  volunteer_id?: ObjectId;
}

class ReviewService {
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
    const reviews = await ReviewModel.find();
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
    console.log(
      '🚀 ~ file: reviewService.ts:53 ~ ReviewService ~ matchedApplyVolunteer:',
      matchedApplyVolunteer,
    );

    if (!matchedApplyVolunteer) {
      throw new Error('Matching volunteer application not found.');
    }

    const volunteer = matchedApplyVolunteer.volunteer_id as Volunteer;
    const { endDate } = volunteer;

    const now = DateTime.now();
    console.log('🚀 ~ file: reviewService.ts:64 ~ ReviewService ~ now:', now);
    const endDateTime = DateTime.fromJSDate(endDate);
    console.log(
      '🚀 ~ file: reviewService.ts:65 ~ ReviewService ~ endDateTime:',
      endDateTime,
    );
    const sevenDaysAfterEnd = endDateTime.plus({ days: 7 });
    console.log(
      '🚀 ~ file: reviewService.ts:68 ~ ReviewService ~ sevenDaysAfterEnd:',
      sevenDaysAfterEnd,
    );

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
        DateTime.fromJSDate(volunteer.endDate) < now.minus({ days: 7 })
      ) {
        apply.isParticipate = true;
        await apply.save();
      }
    }
    console.log('실행완료');
  }
}
export { ReviewService };
