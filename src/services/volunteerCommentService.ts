import { VolunteerCommentModel } from '../db/index.js';
import { ObjectId } from 'mongodb';
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
  public async createVolunteerComment(volunteerComment: VolunteerCommentData) {
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

  public async readVolunteerByComment(
    user_id: ObjectId,
    skip: number,
    limit: number,
  ) {
    //이쪽에 스킵리밋 적용.
    const userComments = await VolunteerCommentModel.find({ user_id })
      .populate('volunteer_id', ['title', 'content', 'createdAt'])
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return userComments;
  }

  public async readVolunteerComment(
    volunteer_id: string,
    skip: number,
    limit: number,
  ) {
    const volunteerCommentList = await VolunteerCommentModel.find({
      volunteer_id: volunteer_id,
    })
      .populate('user_id', [
        'nickname',
        'uuid',
        'authorization',
        'nanoid',
        'image',
      ])
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

  public async getPostListQueryBuilder(condition: any) {
    let counts = 0;
    if (condition.user_id) {
      counts = await VolunteerCommentModel.countDocuments({
        user_id: condition.user_id,
      });
    } else if (condition.volunteer_id) {
      counts = await VolunteerCommentModel.countDocuments({
        volunteer_id: condition.volunteer_id,
      });
    } else if (condition.isReported) {
      counts = await VolunteerCommentModel.countDocuments({
        isReported: condition.isReported,
      });
    }

    return counts;
  }

  public async updateVolunteerComment(
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
  public async deleteVolunteerComment(volunteerComment_id: string) {
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
  public async readReportedVolunteerComment(skip: number, limit: number) {
    const reportedVolunteerComment = await VolunteerCommentModel.find({
      isReported: true,
    })
      .populate('user_id', 'nickname')
      .select('content volunteer_id')
      .skip(skip)
      .limit(limit)
      .sort({ createAt: -1 });
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
