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

  public async readPostComment(volunteerId: string) {
    const postCommentList = await VolunteerCommentModel.find({
      volunteer_id: volunteerId,
    });

    return postCommentList;
  }

  public async updateComment(
    volunteerCommentId: string,
    volunteerCommentData: VolunteerCommentData
  ) {
    const updatedComment = await VolunteerCommentModel.findByIdAndUpdate(
      volunteerCommentId,
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

  public async deleteComment(volunteerCommentId: string) {
    const deletedComment = await VolunteerCommentModel.findByIdAndDelete(
      volunteerCommentId
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
}

export { VolunteerCommentService };
