import { Request, Response } from "express";
import { CommunityService } from "../services/communityService.js";
import fs from "fs";

interface MulterRequest extends Request {
  file: any;
}

export class CommunityController {
  public communityService = new CommunityService();

  public createPost = async (req: Request, res: Response) => {
    try {
      const { title, content, postType } = req.body;

      if (req.file) {
        const { originalname, path } = (req as MulterRequest).file;
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        const newPath = path + "." + ext;
        fs.renameSync(path, newPath);
        const user_id: any = req.id;
        const newPost = await this.communityService.createPost({
          title,
          content,
          postType, //동행/함께
          images: newPath,
          user_id,
        });
        console.log("저장성공");
        res.status(201).send(newPost);
      } else {
        const user_id: any = req.id;
        const newPost = await this.communityService.createPost({
          title,
          content,
          postType,
          images: [],
          user_id,
        });
        console.log("저장성공");
        res.send(newPost);
      }

      console.log(req.body);
    } catch (err) {
      res.status(400).send(err);
    }
  };

  public getAllPosts = async (req: Request, res: Response) => {
    try {
      const posts = await this.communityService.findAllPost();

      res.send(posts);
    } catch (err) {
      res.status(400).send(err);
    }
  };

  public searchPost = async (req: Request, res: Response) => {
    const { keyword } = req.query;
    try {
      const posts = await this.communityService.searchPost(keyword as string);
      res.send(posts);
    } catch (err) {
      res.status(400).send(err);
    }
  };

  public getPost = async (req: Request, res: Response) => {
    const { id } = req.params;

    const comment = await this.communityService.findByPostIdComment(id);

    const post = await this.communityService.indByPostIdPost(id);
    res.send({ post, comment });
  };

  public patchPost = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const { title, content, postType } = req.body;

      if (req.file) {
        const { originalname, path } = (req as MulterRequest).file;
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        const newPath = path + "." + ext;
        fs.renameSync(path, newPath);

        const Posts = await this.communityService.findOneAndUpdate(id, {
          title,
          content,
          images: newPath,
          postType,
        });
        res.send(Posts);
      } else {
        const Posts = await this.communityService.findOneAndUpdate(id, {
          title,
          content,
          postType,
        });
        res.send(Posts);
      }
    } catch {
      res.status(400).send({ message: "오류 발생" });
    }
  };
  public getPostByCategory = async (req: Request, res: Response) => {
    const { category } = req.params;
    try {
      const categoryPost = await this.communityService.getPostByCat(category);
      res.send(categoryPost);
    } catch {}
  };

  public deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      // await PostModel.deleteOne({ _id: id });
      await this.communityService.delete(id);
      res.send({
        message: "삭제가 완료되었습니다.",
      });
    } catch {
      res.status(400).send({ message: "오류 발생" });
    }
  };

  public getUserPosts = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const userPosts = await this.communityService.getUserPosts(id);
      res.status(200).send(userPosts);
    } catch {
      res.status(404).send({ message: "오류 발생" });
    }
  };
}
