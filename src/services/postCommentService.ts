import { PostCommentModel } from '../db/index.js';
import { ObjectId } from 'mongodb';
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
  public async createPostComment(postCommentData: PostCommentData) {
    const postComment = await PostCommentModel.create(postCommentData);
    return postComment;
  }

  public async readPostByComment(user_id: ObjectId) {
    const userComments = await PostCommentModel.find({ user_id })
      .populate('post_id', [
        'title',
        'content',
        'postType',
        'createdAt',
        'authorization',
      ])
      .sort({ createdAt: -1 });

    return userComments;
  }

  public async readPostComment(post_id: string, skip: number, limit: number) {
    const postCommentList = await PostCommentModel.find({
      post_id: post_id,
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
      .sort({ createdAt: -1 });
    return postCommentList;
  }

  public async readCommentByPostId(post_id: string) {
    const postCommentList = await PostCommentModel.find({ post_id: post_id });

    return postCommentList;
  }

  public async getPostListQueryBuilder(condition: any) {
    let counts = 0;
    /*
    if (condition.user_id) {
      counts = await PostCommentModel.countDocuments({
        user_id: condition.user_id,
      });
    } 
    */
    if (condition.post_id) {
      counts = await PostCommentModel.countDocuments({
        post_id: condition.post_id,
      });
    } else if (condition.isReported) {
      counts = await PostCommentModel.countDocuments({
        isReported: condition.isReported,
      });
    }

    return counts;
  }

  public async updatePostComment(
    postCommentId: string,
    postCommentData: PostCommentData,
  ) {
    const newPostComment = await PostCommentModel.findByIdAndUpdate(
      postCommentId,
      postCommentData,
    );

    if (!newPostComment) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST',
      );
    }

    return true;
  }

  public async updateReportComment(
    postCommentId: string,
    isReported: PostReportData,
  ) {
    const newReportComment = await PostCommentModel.findByIdAndUpdate(
      postCommentId,
      isReported,
    );

    if (!newReportComment) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST',
      );
    }

    return true;
  }

  public async deletePostComment(postCommentId: string) {
    const deletePostComment = await PostCommentModel.findByIdAndDelete(
      postCommentId,
    );

    if (!deletePostComment) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST',
      );
    }

    return deletePostComment;
  }

  public async deletePostComments(postId: string) {
    await PostCommentModel.deleteMany({
      post_id: postId,
    });
  }

  // ===== 관리자 기능 =====
  public async readReportedPostComment(skip: number, limit: number) {
    const reportedPostComment = await PostCommentModel.find({
      isReported: true,
    })
      .populate('user_id', 'nickname')
      .select('content post_id')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return reportedPostComment;
  }

  public async deleteReportedPostComment(postComment_id: string) {
    const postComment = await PostCommentModel.findByIdAndDelete(
      postComment_id,
    ).populate('user_id', 'reportedTimes');

    if (!postComment) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST',
      );
    }

    return postComment;
  }
}

export { PostCommentService };
