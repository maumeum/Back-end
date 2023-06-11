import { asyncHandler } from '../middlewares/asyncHandler.js';
import { PostCommentService } from '../services/index.js';
import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE } from '../utils/statusCode.js';
import { makeInstance } from '../utils/makeInstance.js';
import { buildResponse } from '../utils/builderResponse.js';
import { AppError } from '../misc/AppError.js';
import { commonErrors } from '../misc/commonErrors.js';

class PostCommentController {
  private postCommentService =
    makeInstance<PostCommentService>(PostCommentService);

  public postComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const postBodyData = req.body;
      const user_id = req.id;

      const postData = {
        ...postBodyData,
        user_id,
      };
      await this.postCommentService.createComment(postData);

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    }
  );

  public getComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { postId } = req.params;

      if (!postId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST'
        );
      }

      const postCommentList = await this.postCommentService.readComment(postId);

      res.status(STATUS_CODE.OK).json(buildResponse(null, postCommentList));
    }
  );

  public getPostByComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user_id = req.id;

      const postComment = await this.postCommentService.readPostByComment(
        user_id
      );

      res.status(STATUS_CODE.OK).json(buildResponse(null, postComment));
    }
  );

  public patchComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { postCommentId } = req.params;

      if (!postCommentId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST'
        );
      }
      const postCommentData = req.body;

      await this.postCommentService.updateComment(
        postCommentId,
        postCommentData
      );

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    }
  );

  public deleteComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { postCommentId } = req.params;

      if (!postCommentId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST'
        );
      }

      await this.postCommentService.deleteComment(postCommentId);

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    }
  );
}

export { PostCommentController };
