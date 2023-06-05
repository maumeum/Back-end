import { Ref } from "@typegoose/typegoose";
import { PostCommentModel, PostModel } from "../db/index.js";

type Post = {
  title: string;
  content: string;
  user_id: string;
  postType: string;
  images: string;
};
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
    images: string;
    user_id: string;
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

  async findAllPost() {
    return await PostModel.find();
  }

  public async searchPost(keyword: string) {
    const options = [
      { title: { $regex: `${keyword}` } },
      { content: { $regex: `${keyword}` } },
    ];

    const posts = await PostModel.find({ $or: options });
    return posts;
  }

  public async findByPostIdComment(id: string) {
    return await PostCommentModel.find({ post_id: id });
  }
  public async indByPostIdPost(id: string) {
    return await PostModel.findOne({ _id: id });
  }
  public async delete(id: string) {
    PostModel.deleteOne({ _id: id });
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
      images: [];
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
