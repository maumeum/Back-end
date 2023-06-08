import { VolunteerCommentService } from '../services/index.js';
import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE } from '../utils/statusCode.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { makeInstance } from '../utils/makeInstance.js';
import { buildResponse } from '../utils/builderResponse.js';
import { AppError } from '../misc/AppError.js';
import { commonErrors } from '../misc/commonErrors.js';

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

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    }
  );

  public getVolunteerByComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user_id = req.id;
      const volunteerComment =
        await this.volunteerCommentService.readVolunteerByComment(user_id);

      res.status(STATUS_CODE.OK).json(buildResponse(null, volunteerComment));
    }
  );

  public getPostComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerId } = req.params;

      if (!volunteerId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST'
        );
      }

      const commentList = await this.volunteerCommentService.readPostComment(
        volunteerId
      );

      res.status(STATUS_CODE.OK).json(buildResponse(null, commentList));
    }
  );

  public patchComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerCommentId } = req.params;

      if (!volunteerCommentId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST'
        );
      }
      const volunteerCommentData = req.body;
      await this.volunteerCommentService.updateComment(
        volunteerCommentId,
        volunteerCommentData
      );

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    }
  );

  public deleteComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerCommentId } = req.params;

      if (!volunteerCommentId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST'
        );
      }
      await this.volunteerCommentService.deleteComment(volunteerCommentId);

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    }
  );

  public checkUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerCommentId } = req.params;

      if (volunteerCommentId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST'
        );
      }
    }
  );
}

export { VolunteerCommentController };
