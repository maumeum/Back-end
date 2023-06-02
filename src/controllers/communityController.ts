import { PostCommentModel, PostModel } from "../db/index.js";
import { Request, Response } from "express";

export class CommunityController {
  public createPost = async (req: Request, res: Response) => {
    try {
      const newPost = await PostModel.create(req.body);
      res.send(newPost);
    } catch (err) {
      res.status(400).send(err);
    }
  };

  public getAllPosts = async (req: Request, res: Response) => {
    try {
      const posts = await PostModel.find();
      res.send(posts);
    } catch (err) {
      res.status(400).send(err);
    }
  };
  public getPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const comment = await PostCommentModel.find({ post_id: id });
    const post = await PostModel.findOne({ _id: id });
    res.send({ post, comment });
  };

  public patchPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content, images, postType } = req.body;
    try {
      const Posts = await PostModel.findOneAndUpdate(
        { _id: id },
        {
          title,
          content,
          images,
          postType,
        },
        { new: true }
      );
      res.send(Posts);
    } catch {
      res.status(400).send({ message: "오류 발생" });
    }
  };

  public deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await PostModel.deleteOne({ _id: id });
      res.send({
        message: "삭제가 완료되었습니다.",
      });
    } catch {
      res.status(400).send({
        message: "오류발생",
      });
    }
  };
}
