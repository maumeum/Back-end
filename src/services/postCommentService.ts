import { PostCommentModel } from '../db/index.js';
import { ObjectId } from 'mongodb';
import { Post } from '../db/schemas/postSchema.js';
import { AppError } from '../misc/AppError.js';
import { commonErrors } from '../misc/commonErrors.js';
import { STATUS_CODE } from '../utils/statusCode.js';

interface PostCommentData {
  user_id: ObjectId;
  post_id: ObjectId;
  content: string;
  postData: boolean;
}

interface PostReportData {
  isReported: boolean;
}

class PostCommentService {
  public async createComment(postCommentData: PostCommentData) {
    const postComment = await PostCommentModel.create(postCommentData);
    return postComment;
  }

  public async readPostByComment(user_id: ObjectId) {
    const userComments = await PostCommentModel.find({ user_id }).populate(
      'post_id',
      ['title', 'content', 'postType', 'createdAt']
    );

    if (userComments.length === 0) {
      return [];
    }

    const postList = userComments.map((userComment) => {
      const postId = userComment.post_id as Post;
      return postId;
    });

    return postList;
  }

  public async readComment(post_id: string) {
    const postCommentList = await PostCommentModel.find({
      post_id: post_id,
    }).populate('user_id', 'nickname');
    return postCommentList;
  }

  public async updateComment(
    postCommentId: string,
    postCommentData: PostCommentData
  ) {
    const newPostComment = await PostCommentModel.findByIdAndUpdate(
      postCommentId,
      postCommentData
    );

    if (!newPostComment) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST'
      );
    }

    return true;
  }

  public async updateReportComment(
    postCommentId: string,
    isReported: PostReportData
  ) {
    const newReportComment = await PostCommentModel.findByIdAndUpdate(
      postCommentId,
      { isReported }
    );

    if (!newReportComment) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST'
      );
    }

    return true;
  }

  public async deleteComment(postCommentId: string) {
    const deletePostComment = await PostCommentModel.findByIdAndDelete(
      postCommentId
    );

    if (!deletePostComment) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST'
      );
    }

    return deletePostComment;
  }

  // ===== 관리자 기능 =====
  public async readReportedPostComment() {
    const reportedPostComment = await PostCommentModel.find({
      isReported: true,
    }).select('title content');

    return reportedPostComment;
  }

  public async deleteReportedPostComment(postComment_id: string) {
    const postComment = await PostCommentModel.findByIdAndUpdate(
      postComment_id
    ).populate('user_id', 'reportedTimes');

    if (!postComment) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST'
      );
    }

    return postComment;
  }
}

export { PostCommentService };
