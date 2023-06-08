import { Request, Response } from "express";
import { CommunityService } from "../services/communityService.js";
import fs from "fs";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { STATUS_CODE } from "../utils/statusCode.js";
import { buildResponse } from "../utils/builderResponse.js";
import { AppError } from "../misc/AppError.js";
import { commonErrors } from "../misc/commonErrors.js";

interface MulterRequest extends Request {
  file: any;
}

export class CommunityController {
  public communityService = new CommunityService();

  public createPost = asyncHandler(async (req: Request, res: Response) => {
    const user_id = req.id;
    const { title, content, postType } = req.body;
    if (req.file) {
      const { originalname, path } = (req as MulterRequest).file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);

      const newPost = await this.communityService.createPost({
        title,
        content,
        postType,
        images: newPath,
        user_id,
      });
      res.status(STATUS_CODE.OK).json(buildResponse(null, { newPost }));
    } else {
      const newPost = await this.communityService.createPost({
        title,
        content,
        postType,
        images: [],
        user_id,
      });
      res.status(STATUS_CODE.OK).json(buildResponse(null, newPost));
    }
  });

  //멀터
  // public createPost = asyncHandler(
  //   async (req: Request, res: Response) => {
  //     const { title, content, postType } = req.body;

  //     if (req.file) {
  //       const { originalname, path } = (req as MulterRequest).file;
  //       const parts = originalname.split(".");
  //       const ext = parts[parts.length - 1];
  //       const newPath = path + "." + ext;
  //       fs.renameSync(path, newPath);
  //       const user_id: any = req.id;
  //       const newPost = await this.communityService.createPost({
  //         title,
  //         content,
  //         postType,
  //         images: newPath,
  //         user_id,
  //       });
  //       console.log("저장성공");
  //       res.status(STATUS_CODE.OK).json(buildResponse(null, newPost));
  //     } else {
  //       const user_id: any = req.id;
  //       const newPost = await this.communityService.createPost({
  //         title,
  //         content,
  //         postType,
  //         images: [],
  //         user_id,
  //       });
  //       console.log("저장성공");
  //       res.status(STATUS_CODE.OK).json(buildResponse(null, newPost));
  //     }
  //   }
  // );

  // 모든 게시물 조회
  public getAllPosts = asyncHandler(async (req: Request, res: Response) => {
    const posts = await this.communityService.findAllPost();
    res.status(STATUS_CODE.OK).json(buildResponse(null, posts));
  });
  ////

  //keyword 로 게시물 조회
  public searchPost = asyncHandler(async (req: Request, res: Response) => {
    const { keyword } = req.query;

    const posts = await this.communityService.searchPost(keyword as string);
    res.status(STATUS_CODE.OK).json(buildResponse(null, posts));
  });

  public getPost = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const comment = await this.communityService.findByPostIdComment(id);
    const post = await this.communityService.indByPostIdPost(id);

    res.status(STATUS_CODE.OK).json(buildResponse(null, { post, comment }));
  });

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
  //카테고리
  public getPostByCategory = asyncHandler(
    async (req: Request, res: Response) => {
      const { category } = req.params;
      if (!category) {
        throw new AppError(
          commonErrors.argumentError,
          STATUS_CODE.BAD_REQUEST,
          "BAD_REQUEST"
        );
      }
      const categoryPost = await this.communityService.getPostByCat(
        category as string
      );
      res.status(STATUS_CODE.OK).json(buildResponse(null, categoryPost));
    }
  );

  //게시물 삭제
  public deletePost = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      throw new AppError(
        commonErrors.argumentError,
        STATUS_CODE.BAD_REQUEST,
        "BAD_REQUEST"
      );
    }
    await this.communityService.delete(id);
    res.status(STATUS_CODE.OK).json(buildResponse(null, null));
  });
  /////////

  // 유저 정보 가져오기
  public getUserPosts = asyncHandler(async (req: Request, res: Response) => {
    const user_id: any = req.id;
    if (!user_id) {
      throw new AppError(
        commonErrors.requestValidationError,
        STATUS_CODE.BAD_REQUEST,
        "BAD_REQUEST"
      );
    }

    const userPosts = await this.communityService.getUserPosts(user_id);
    res.status(STATUS_CODE.OK).json(buildResponse(null, userPosts));
  });
}
