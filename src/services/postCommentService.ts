import { PostCommentModel } from '../db/index.js';
import { ObjectId } from 'mongodb';
import { Post } from '../db/schemas/postSchema.js';
import { DateTime } from 'luxon';

interface PostCommentData {
  post_id: ObjectId | string | null;
  user_id: ObjectId | string | null;
  content: string;
  createdAt: Date;
}
class PostCommentService {
  static async createComment(postCommentData: PostCommentData) {
    const postComment = await PostCommentModel.create(postCommentData);

    if (!postComment) {
      throw new Error('댓글 작성에 실패하였습니다.');
    }

    return true;
  }

  static async readPostByComment(user_id: ObjectId) {
    const userComments = await PostCommentModel.find({ user_id }).populate(
      'post_id',
      ['title', 'content', 'postType']
    );

    if (userComments.length === 0) {
      return false;
    }

    const postList = userComments.map((userComment) => {
      const postId = userComment.post_id as Post;
      const uuserCommentObj = userComment.toObject() as PostCommentData;
      const createdAt = uuserCommentObj.createdAt;

      const postCommentSavedTime = DateTime.fromJSDate(createdAt);

      return {
        title: postId.title,
        content: postId.content,
        postType: postId.postType,
        createdAt: postCommentSavedTime,
      };
    });

    return postList;
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
