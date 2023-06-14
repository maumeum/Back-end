import { UserService, VolunteerCommentService } from '../services/index.js';
import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE } from '../utils/statusCode.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { makeInstance } from '../utils/makeInstance.js';
import { buildResponse } from '../utils/builderResponse.js';
import { AppError } from '../misc/AppError.js';
import { commonErrors } from '../misc/commonErrors.js';
import { countReportedTimes } from '../utils/reportedTimesData.js';

class VolunteerCommentController {
  private volunteerCommentService = makeInstance<VolunteerCommentService>(
    VolunteerCommentService,
  );

  private userService = makeInstance<UserService>(UserService);

  public postComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user_id = req.id;
      const volunteerBodyData = req.body;

      const volunteerData = {
        ...volunteerBodyData,
        user_id,
      };

      await this.volunteerCommentService.createComment(volunteerData);

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    },
  );

  public getVolunteerByComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user_id = req.id;
      const volunteerComment =
        await this.volunteerCommentService.readVolunteerByComment(user_id);

      res.status(STATUS_CODE.OK).json(buildResponse(null, volunteerComment));
    },
  );

  public getPostComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerId } = req.params;
      const { skip, limit } = req.query;

      if (!volunteerId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }

      const volunteerCommentList =
        await this.volunteerCommentService.readVolunteerComment(
          volunteerId,
          Number(skip),
          Number(limit),
        );

      const totalVolunteerCount =
        await this.volunteerCommentService.totalVolunteerCount(volunteerId);
      const hasMore = Number(skip) + Number(limit) < totalVolunteerCount;

      res
        .status(STATUS_CODE.OK)
        .json(buildResponse(null, { volunteerCommentList, hasMore }));
    },
  );

  public patchComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerCommentId } = req.params;

      if (!volunteerCommentId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }
      const volunteerCommentData = req.body;
      await this.volunteerCommentService.updateComment(
        volunteerCommentId,
        volunteerCommentData,
      );

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    },
  );

  public patchReportComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerCommentId } = req.params;

      if (!volunteerCommentId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }

      await this.volunteerCommentService.updateReportComment(
        volunteerCommentId,
        { isReported: true },
      );

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    },
  );

  public deleteComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerCommentId } = req.params;

      if (!volunteerCommentId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }
      await this.volunteerCommentService.deleteComment(volunteerCommentId);

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    },
  );

  // ===== 관리자 기능 =====

  // 신고된 내역 전체 조회
  public getReportedVolunteerComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const reportedVolunteerComment =
        await this.volunteerCommentService.readReportedVolunteerComment();

      res
        .status(STATUS_CODE.OK)
        .json(buildResponse(null, reportedVolunteerComment));
    },
  );

  // 신고된 내역 반려
  public patchReportedVolunteerComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerCommentId } = req.params;

      if (!volunteerCommentId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }

      await this.volunteerCommentService.updateReportComment(
        volunteerCommentId,
        {
          isReported: false,
        },
      );
      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    },
  );

  public deleteReportedVolunteerComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerCommentId } = req.params;

      if (!volunteerCommentId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }

      const deleteVolunteerComment =
        await this.volunteerCommentService.deleteReportedVolunteerComment(
          volunteerCommentId,
        );

      //글 작성한 유저정보 가져오기
      const reportUser = deleteVolunteerComment.user_id;

      const reportUserData = await this.userService.getUserReportedTimes(
        reportUser!,
      );

      let isDisabledUser;

      if (reportUserData) {
        isDisabledUser = countReportedTimes(reportUserData);
      }

      if (isDisabledUser) {
        await this.userService.updateReportedTimes(reportUser!, isDisabledUser);
      }

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    },
  );
}

export { VolunteerCommentController };
