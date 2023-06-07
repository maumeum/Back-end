import { PostCommentModel } from '../db/index.js';
import { ObjectId } from 'mongodb';
import { Post } from '../db/schemas/postSchema.js';

interface PostCommentData {
  user_id: ObjectId;
  post_id: ObjectId;
  content: string;
}

interface PostCommentDateData {
  createdAt: Date;
}
class PostCommentService {
  public async createComment(postCommentData: PostCommentData) {
    const postComment = await PostCommentModel.create(postCommentData);

    if (!postComment) {
      throw new Error('댓글 작성에 실패하였습니다.');
    }

    return true;
  }

  public async readPostByComment(user_id: ObjectId) {
    const userComments = await PostCommentModel.find({ user_id }).populate(
      'post_id',
      ['title', 'content', 'postType'],
    );

    if (userComments.length === 0) {
      return [];
    }

    const postList = userComments.map((userComment) => {
      const postId = userComment.post_id as Post;
      const userCommentObj = userComment.toObject() as PostCommentDateData;
      const createdAt = userCommentObj.createdAt;

      return {
        title: postId.title,
        content: postId.content,
        postType: postId.postType,
        createdAt: createdAt,
      };
    });

    return postList;
  }

  public async readComment(post_id: string) {
    const postCommentList = await PostCommentModel.find({ post_id: post_id });

    if (postCommentList.length === 0) {
      return [];
    }

    return postCommentList;
  }

  public async updateComment(
    postCommentId: string,
    postCommentData: PostCommentData,
  ) {
    const newPostComment = await PostCommentModel.findByIdAndUpdate(
      postCommentId,
      postCommentData,
    );

    if (!newPostComment) {
      throw new Error('댓글 수정에 실패하였습니다.');
    }

    return true;
  }

  public async deleteComment(postCommentId: string) {
    const deletePostComment = await PostCommentModel.findByIdAndDelete(
      postCommentId,
    );

    if (!deletePostComment) {
      throw new Error('댓글 삭제에 실패하였습니다.');
    }

    return true;
  }
}

export { PostCommentService };
