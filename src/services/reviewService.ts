import { ObjectId } from 'mongodb';
import { ReviewModel, VolunteerApplicationModel } from '../db/index.js';
import { Volunteer } from '../db/schemas/volunteerSchema.js';

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

  // public async changeParticipateStatus(
  //   volunteer_id: ObjectId,
  //   user_id: ObjectId,
  // ) {
  //   const matchedApplyVolunteer = await VolunteerApplicationModel.findOne({
  //     volunteer_id,
  //     user_id,
  //   }).populate('volunteer_id').exec();

  //   if (!matchedApplyVolunteer) {
  //     throw new Error('Matching volunteer application not found.');
  //   }
  //   Volunteer>
  //   const { endDate } = matchedApplyVolunteer.volunteer_id;

  //   const currentDate = new Date();
  //   const endDatePlus7Days = new Date(
  //     endDate.getTime() + 7 * 24 * 60 * 60 * 1000,
  //   );

  //   if (currentDate <= endDatePlus7Days) {
  //     throw new Error(
  //       'Cannot change participate status before 7 days of the end date.',
  //     );
  //   }

  //   matchedApplyVolunteer.isParticipate = true;
  //   await matchedApplyVolunteer.save();

  //   return matchedApplyVolunteer;

  //   //volunteerID와 userId를 받아서 volunteerApplication 모델에서 두개 다 일치하는 것을 한개 찾아옴.
  //   // 그렇게 찾은 document에 들어있는 volunteer_id를 통해서 populate하기.
  //   // 그리고 populate한 volunteer의 정보중 endDate를 받아온다.
  //   //현재 시간이 endDate보다 7일이 안지난 상태라면, throw error
  //   // 현재 시간이 endDate보다 7일이 안지난 상태라면 volunteerApplication의 isParticipate 상태가 true로 바뀜.
  // }
}

export { ReviewService };
