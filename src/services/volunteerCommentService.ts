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

class VolunteerCommentService {
  public async createComment(volunteerComment: VolunteerCommentData) {
    const comment = await VolunteerCommentModel.create(volunteerComment);

    if (!comment) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST'
      );
    }

    return comment;
  }

  public async readVolunteerByComment(user_id: ObjectId) {
    const userComments = await VolunteerCommentModel.find({ user_id }).populate(
      'volunteer_id',
      ['title', 'content', 'createdAt']
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

  public async readPostComment(volunteer_id: string) {
    const postCommentList = await VolunteerCommentModel.find({
      volunteer_id: volunteer_id,
    }).populate('user_id', 'nickname');

    return postCommentList;
  }

  public async updateComment(
    volunteerComment_id: string,
    volunteerCommentData: VolunteerCommentData
  ) {
    const updatedComment = await VolunteerCommentModel.findByIdAndUpdate(
      volunteerComment_id,
      volunteerCommentData
    );

    if (!updatedComment) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST'
      );
    }

    return updatedComment;
  }

  public async deleteComment(volunteerComment_id: string) {
    const deletedComment = await VolunteerCommentModel.findByIdAndDelete(
      volunteerComment_id
    );

    if (!deletedComment) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST'
      );
    }

    return deletedComment;
  }

  //봉사활동 ID에 해당하는 댓글 리스트
  // public async checkUser(volunteer_id: string) {
  //   const volunteerList = await VolunteerCommentModel.find({
  //     volunteer_id,
  //   });

  //   return volunteerList;
  // }
}

export { VolunteerCommentService };
