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

  //다시하기
  static async readComment(userId: string) {
    const userComments = await VolunteerCommentModel.find({ user_id: userId });
    const volunteer_ids = userComments.map((userComment) =>
      userComment.volunteer_id!.toString()
    );

    const volunteerList = await volunteer_ids.map(
      async (volunteer_id) =>
        await VolunteerCommentModel.find({ volunteer_id: volunteer_id })
    );

    console.log(volunteerList);
    //volunteer에서 title, content 가져오기
    //const volunteerData =
    // const volunteerLists = await VolunteerCommentModel.find({ volunteer_id });

    //console.log(volunteerList);
    if (!userComments) {
      throw new Error('게시글 조회에 실패하였습니다.');
    }

    return userComments;
  }

  static async readPostComment(volunteerId: string) {
    const commentList = await VolunteerCommentModel.find({
      volunteer_id: volunteerId,
    });

    if (!commentList) {
      throw new Error('댓글 조회를 실패하였습니다.');
    }

    return commentList;
  }

  static async updateComment(
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

  static async deleteComment(volunteerCommentId: string) {
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
