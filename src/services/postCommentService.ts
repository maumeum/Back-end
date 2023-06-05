import { Types } from 'mongoose';
import { PostCommentModel } from '../db/index.js';

interface PostCommentData {
  post_id: Types.ObjectId | string | null;
  user_id: Types.ObjectId | string | null;
  content: string;
}
class PostCommentService {
  static async createComment(postCommentData: PostCommentData) {
    const postComment = await PostCommentModel.create(postCommentData);

    if (!postComment) {
      throw new Error('댓글 작성에 실패하였습니다.');
    }

    return true;
  }

  //추후 다시 작성
  static async readPostByComment(userId: string) {
    throw new Error('Method not implemented.');
  }

  static async readComment(postId: string) {
    const postCommentList = await PostCommentModel.find({ post_id: postId });

    if (!postCommentList) {
      throw new Error('댓글 조회를 실패하였습니다.');
    }

    return postCommentList;
  }

  static async updateComment(postCommentId: string, postCommentData: any) {
    const newPostComment = await PostCommentModel.findByIdAndUpdate(
      postCommentId,
      postCommentData
    );

    if (!newPostComment) {
      throw new Error('댓글 수정에 실패하였습니다.');
    }

    return true;
  }

  static async deleteComment(postCommentId: string) {
    const deletePostComment = await PostCommentModel.findByIdAndDelete(
      postCommentId
    );

    if (!deletePostComment) {
      throw new Error('댓글 삭제에 실패하였습니다.');
    }

    return true;
  }
}

export { PostCommentService };
