import { VolunteerCommentModel } from '../db/index.js';
import { ObjectId } from 'mongodb';
import { Volunteer } from '../db/schemas/volunteerSchema.js';
import { AppError } from '../misc/AppError.js';
import { commonErrors } from '../misc/commonErrors.js';
import { STATUS_CODE } from '../utils/statusCode.js';

interface VolunteerCommentData {
  volunteer_id: ObjectId;
  user_id: ObjectId;
  content: string;
  isReported: boolean;
}

interface VolunteerReportData {
  isReported: boolean;
}

class VolunteerCommentService {
  public async createComment(volunteerComment: VolunteerCommentData) {
    const comment = await VolunteerCommentModel.create(volunteerComment);

    if (!comment) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST',
      );
    }

    return comment;
  }

  public async readVolunteerByComment(user_id: ObjectId) {
    //이쪽에 스킵리밋 적용.
    const userComments = await VolunteerCommentModel.find({ user_id }).populate(
      'volunteer_id',
      ['title', 'content', 'createdAt'],
    );

    if (userComments.length === 0) {
      return [];
    }

    const volunteerList = userComments.map((userComment) => {
      const volunteerId = userComment.volunteer_id as Volunteer;

      return volunteerId;
    });

    return volunteerList;
  }

  public async readVolunteerComment(
    volunteer_id: string,
    skip: number,
    limit: number,
  ) {
    const volunteerCommentList = await VolunteerCommentModel.find({
      volunteer_id: volunteer_id,
    })
      .populate('user_id', ['nickname', 'uuid', 'authorization'])
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: 1 });

    return volunteerCommentList;
  }

  public async totalVolunteerCount(volunteer_id: string) {
    const counts = await VolunteerCommentModel.countDocuments({
      volunteer_id: volunteer_id,
    });
    return counts;
  }

  public async updateComment(
    volunteerComment_id: string,
    volunteerCommentData: VolunteerCommentData,
  ) {
    const updatedComment = await VolunteerCommentModel.findByIdAndUpdate(
      volunteerComment_id,
      volunteerCommentData,
    );

    if (!updatedComment) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST',
      );
    }

    return true;
  }

  public async updateReportComment(
    volunteerComment_id: string,
    isReported: VolunteerReportData,
  ) {
    const updatedComment = await VolunteerCommentModel.findByIdAndUpdate(
      volunteerComment_id,
      isReported,
    );

    if (!updatedComment) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST',
      );
    }

    return true;
  }
  public async deleteComment(volunteerComment_id: string) {
    const deletedComment = await VolunteerCommentModel.findByIdAndDelete(
      volunteerComment_id,
    );

    if (!deletedComment) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST',
      );
    }

    return deletedComment;
  }

  // ===== 관리자 기능 =====
  public async readReportedVolunteerComment() {
    const reportedVolunteerComment = await VolunteerCommentModel.find({
      isReported: true,
    }).select('title content');
    return reportedVolunteerComment;
  }

  public async deleteReportedVolunteerComment(volunteerComment_id: string) {
    const volunteerComment = await VolunteerCommentModel.findByIdAndDelete(
      volunteerComment_id,
    ).populate('user_id', 'reportedTimes');

    if (!volunteerComment) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST',
      );
    }

    return volunteerComment;
  }
}

export { VolunteerCommentService };
