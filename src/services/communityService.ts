import { Ref } from "@typegoose/typegoose";
import { PostCommentModel, PostModel, UserModel } from "../db/index.js";

export class CommunityService {
  public async createPost({
    title,
    content,
    postType,
    images,
    user_id,
  }: {
    title: string;
    content: string;
    postType: string;
    images: any;
    user_id: any;
  }) {
    const newPost = await PostModel.create({
      title,
      content,
      postType,
      images,
      user_id,
    });

    return newPost;
  }
  public async checkUser(postid: string) {
    const post = await PostModel.findOne({ _id: postid });
    const user = await UserModel.findOne({ _id: post!.user_id });
    return user;
  }

  public async findAllPost(skip: number, limit: number) {
    console.log(skip, limit);
    return await PostModel.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
  }
  //수정한곳
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
  public async delete(id: string) {
    await PostModel.deleteOne({ _id: id });
  }
  public async totalReviewsCount() {
    return await PostModel.countDocuments();
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
