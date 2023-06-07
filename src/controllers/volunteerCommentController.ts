import { VolunteerCommentService } from '../services/index.js';
import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE } from '../utils/statusCode.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { makeInstance } from '../utils/makeInstance.js';

class VolunteerCommentController {
  private volunteerCommentService = makeInstance<VolunteerCommentService>(
    VolunteerCommentService
  );

  public postComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user_id = req.id;
      const { volunteer_id, content } = req.body;

      await this.volunteerCommentService.createComment({
        volunteer_id,
        content,
        user_id,
      });

      res.status(STATUS_CODE.OK).json({ message: 'created' });
    }
  );

  public getVolunteerByComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user_id = req.id;
      const volunteerComment =
        await this.volunteerCommentService.readVolunteerByComment(user_id);

      res.status(STATUS_CODE.OK).json(volunteerComment);
    }
  );

  public getPostComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerId } = req.params;

      if (!volunteerId) {
        throw new Error('봉사활동에 대한 정보가 없습니다.');
      }

      const commentList = await this.volunteerCommentService.readPostComment(
        volunteerId
      );

      res.status(STATUS_CODE.OK).json(commentList);
    }
  );

  public patchComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerCommentId } = req.params;

      if (!volunteerCommentId) {
        throw new Error('봉사활동 댓글에 대한 정보가 없습니다.');
      }
      const volunteerCommentData = req.body;
      await this.volunteerCommentService.updateComment(
        volunteerCommentId,
        volunteerCommentData
      );

      res.status(STATUS_CODE.OK).json({ message: 'updated' });
    }
  );

  public deleteComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerCommentId } = req.params;

      if (!volunteerCommentId) {
        throw new Error('봉사활동 댓글에 대한 정보가 없습니다.');
      }
      await this.volunteerCommentService.deleteComment(volunteerCommentId);

      res.status(STATUS_CODE.CREATED).json({ message: 'deleted' });
    }
  );
}

export { VolunteerCommentController };
