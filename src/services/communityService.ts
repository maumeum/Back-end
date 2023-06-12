import { Ref } from '@typegoose/typegoose';
import { PostCommentModel, PostModel, UserModel } from '../db/index.js';
import { AppError } from '../misc/AppError.js';
import { commonErrors } from '../misc/commonErrors.js';
import { STATUS_CODE } from '../utils/statusCode.js';

interface communityReportData {
  isReported: boolean;
}

export class CommunityService {
  public async createPost({
    title,
    content,
    postType,
    images,
    user_id,
    isReported,
  }: {
    title: string;
    content: string;
    postType: string;
    images: any;
    user_id: any;
    isReported: boolean;
  }) {
    const newPost = await PostModel.create({
      title,
      content,
      postType,
      images,
      user_id,
      isReported,
    });

    return newPost;
  }
  public async checkUser(postid: string) {
    const post = await PostModel.findOne({ _id: postid });
    const user = await UserModel.findOne({ _id: post!.user_id });
    return user;
  }

  public async findAllPost() {
    return await PostModel.find();
  }
  public async getPostByCat(category: string) {
    console.log(category);
    return await PostModel.find({ postType: category });
  }

  public async searchPost(keyword: string, posttype: string) {
    const options = [{ title: { $regex: `${keyword}` } }];

    const posts = await PostModel.find({ $or: options }).find({
      postType: posttype,
    });
    return posts;
  }

  public async findByPostIdComment(id: string) {
    return await PostCommentModel.find({ post_id: id });
  }
  public async indByPostIdPost(id: string) {
    const post = await PostModel.findOne({ _id: id });
    const user = await UserModel.findOne({ _id: post!.user_id });
    const total = {
      user: user!.nickname,
      post,
    };
    return total;
  }

  public async updateReportPost(
    communityId: string,
    communityData: communityReportData
  ) {
    const community = await PostModel.findByIdAndUpdate(
      communityId,
      communityData
    );

    if (!community) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST'
      );
    }

    return true;
  }
  public async delete(id: string) {
    await PostModel.deleteOne({ _id: id });
  }

  public async findOneAndUpdate(
    id: string,
    {
      title,
      content,
      images,
      postType,
    }: {
      title: string;
      content: string;
      images?: string;
      postType: string;
    }
  ) {
    return await PostModel.findOneAndUpdate(
      { _id: id },
      {
        title,
        content,
        images,
        postType,
      },
      { new: true }
    );
  }
  public async getUserPosts(id: string) {
    return await PostModel.find({ user_id: id });
  }
}
