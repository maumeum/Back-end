import { Types } from 'mongoose';
import { VolunteerCommentModel } from '../db/index.js';

interface VolunteerCommentData {
  volunteer_id: Types.ObjectId | string | null;
  user_id: Types.ObjectId | string | null;
  content: string;
}
class VolunteerCommentService {
  static async createComment(volunteerComment: VolunteerCommentData) {
    const comment = await VolunteerCommentModel.create(volunteerComment);

    if (!comment) {
      throw new Error('댓글 작성에 실패하였습니다.');
    }

    return true;
  }

  static async readComment(userId: string) {
    const commentList = await VolunteerCommentModel.find({ userId });
  }

  static readPostComment(volunteerId: string) {}

  static updateComment(volunteerCommentId: string) {}
}

export { VolunteerCommentService };
