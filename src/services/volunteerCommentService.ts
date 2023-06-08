import { VolunteerCommentModel } from '../db/index.js';
import { ObjectId } from 'mongodb';
import { Volunteer } from '../db/schemas/volunteerSchema.js';

interface VolunteerCommentData {
  volunteer_id: ObjectId;
  user_id: ObjectId;
  content: string;
}

interface VolunteerCommentDateData {
  createdAt: Date;
}
class VolunteerCommentService {
  public async createComment(volunteerComment: VolunteerCommentData) {
    const comment = await VolunteerCommentModel.create(volunteerComment);

    if (!comment) {
      throw new Error('댓글 작성에 실패하였습니다.');
    }

    return true;
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

    if (postCommentList.length === 0) {
      return [];
    }

    return postCommentList;
  }

  public async updateComment(
    volunteerCommentId: string,
    volunteerCommentData: VolunteerCommentData
  ) {
    const newComment = await VolunteerCommentModel.findByIdAndUpdate(
      volunteerCommentId,
      volunteerCommentData
    );

    if (!newComment) {
      throw new Error('댓글 수정에 실패햐였습니다.');
    }

    return true;
  }

  public async deleteComment(volunteerCommentId: string) {
    const comment = await VolunteerCommentModel.findByIdAndDelete(
      volunteerCommentId
    );

    if (!comment) {
      throw new Error('댓글 삭제에 실패하였습니다.');
    }

    return true;
  }
}

export { VolunteerCommentService };
