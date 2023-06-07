import { asyncHandler } from '../middlewares/asyncHandler.js';
import { PostCommentService } from '../services/index.js';
import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE } from '../utils/statusCode.js';
import { makeInstance } from '../utils/makeInstance.js';

class PostCommentController {
  private postCommentService =
    makeInstance<PostCommentService>(PostCommentService);

  public postComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { post_id, content } = req.body;
      const user_id = req.id;

      await this.postCommentService.createComment({
        post_id,
        content,
        user_id,
      });

      res.status(STATUS_CODE.OK).json({ message: 'created' });
    }
  );

  public getComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { post_id } = req.params;

      if (!post_id) {
        throw new Error('post_id 값이 올바르지 않습니다.');
      }

      const postCommentList = await this.postCommentService.readComment(
        post_id
      );

      res.status(STATUS_CODE.OK).json(postCommentList);
    }
  );

  public getPostByComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user_id = req.id;

      const postComment = await this.postCommentService.readPostByComment(
        user_id
      );

      res.status(STATUS_CODE.OK).json(postComment);
    }
  );

  public patchComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { postCommentId } = req.params;

      if (!postCommentId) {
        throw new Error('post_id 값이 올바르지 않습니다.');
      }
      const postCommentData = req.body;

      await this.postCommentService.updateComment(
        postCommentId,
        postCommentData
      );

      res.status(STATUS_CODE.CREATED).json({ message: 'updated' });
    }
  );

  public deleteComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { postCommentId } = req.params;

      if (!postCommentId) {
        throw new Error('post_id 값이 올바르지 않습니다.');
      }

      await this.postCommentService.deleteComment(postCommentId);

      res.status(STATUS_CODE.CREATED).json({ message: 'deleted' });
    }
  );
}

export { PostCommentController };
