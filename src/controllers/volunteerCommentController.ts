import { UserService, VolunteerCommentService } from '../services/index.js';
import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE } from '../utils/statusCode.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { makeInstance } from '../utils/makeInstance.js';
import { buildResponse } from '../utils/builderResponse.js';
import { AppError } from '../misc/AppError.js';
import { commonErrors } from '../misc/commonErrors.js';
import { countReportedTimes } from '../utils/reportedTimesData.js';
import { Volunteer } from '../db/schemas/volunteerSchema.js';

class VolunteerCommentController {
  private volunteerCommentService = makeInstance<VolunteerCommentService>(
    VolunteerCommentService
  );

  private userService = makeInstance<UserService>(UserService);

  public postVolunteerComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user_id = req.id;
      const volunteerBodyData = req.body;

      const volunteerData = {
        ...volunteerBodyData,
        user_id,
      };

      await this.volunteerCommentService.createVolunteerComment(volunteerData);

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    }
  );

  public getVolunteerByComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { skip, limit } = req.query;
      const user_id = req.id;
      const volunteerComments =
        await this.volunteerCommentService.readVolunteerByComment(
          user_id,
          Number(skip),
          Number(limit)
        );

      const volunteerList = volunteerComments.map((volunteerComment) => {
        const volunteerId = volunteerComment.volunteer_id as Volunteer;
        return volunteerId;
      });

      const totalVolunteersCount =
        await this.volunteerCommentService.getPostListQueryBuilder({
          user_id: user_id,
        });
      const hasMore = Number(skip) + Number(limit) < totalVolunteersCount;

      res
        .status(STATUS_CODE.OK)
        .json(buildResponse(null, { volunteerList, hasMore }));
    }
  );

  public getVolunteerComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerId } = req.params;
      const { skip, limit } = req.query;

      if (!volunteerId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST'
        );
      }

      const volunteerCommentList =
        await this.volunteerCommentService.readVolunteerComment(
          volunteerId,
          Number(skip),
          Number(limit)
        );

      const totalVolunteerCount =
        await this.volunteerCommentService.getPostListQueryBuilder({
          volunteer_id: volunteerId,
        });
      const hasMore = Number(skip) + Number(limit) < totalVolunteerCount;

      res
        .status(STATUS_CODE.OK)
        .json(buildResponse(null, { volunteerCommentList, hasMore }));
    }
  );

  public patchVolunteerComment = asyncHandler(
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
      await this.volunteerCommentService.updateVolunteerComment(
        volunteerCommentId,
        volunteerCommentData
      );

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    }
  );

  public patchReportComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerCommentId } = req.params;

      if (!volunteerCommentId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST'
        );
      }

      await this.volunteerCommentService.updateReportComment(
        volunteerCommentId,
        { isReported: true }
      );

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    }
  );

  public deleteVolunteerComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerCommentId } = req.params;

      if (!volunteerCommentId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST'
        );
      }
      await this.volunteerCommentService.deleteVolunteerComment(
        volunteerCommentId
      );

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    }
  );

  // ===== 관리자 기능 =====

  // 신고된 내역 전체 조회
  public getReportedVolunteerComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { skip, limit } = req.query;
      const reportedVolunteerComment =
        await this.volunteerCommentService.readReportedVolunteerComment(
          Number(skip),
          Number(limit)
        );

      const totalVolunteerCount =
        await this.volunteerCommentService.getPostListQueryBuilder({
          isReported: true,
        });
      const hasMore = Number(skip) + Number(limit) < totalVolunteerCount;

      res
        .status(STATUS_CODE.OK)
        .json(buildResponse(null, { reportedVolunteerComment, hasMore }));
    }
  );

  // 신고된 내역 반려
  public patchReportedVolunteerComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerCommentId } = req.params;

      if (!volunteerCommentId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST'
        );
      }

      await this.volunteerCommentService.updateReportComment(
        volunteerCommentId,
        {
          isReported: false,
        }
      );
      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    }
  );

  public deleteReportedVolunteerComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerCommentId } = req.params;

      if (!volunteerCommentId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST'
        );
      }

      const deleteVolunteerComment =
        await this.volunteerCommentService.deleteReportedVolunteerComment(
          volunteerCommentId
        );

      //글 작성한 유저정보 가져오기
      const reportUser = deleteVolunteerComment.user_id;

      const reportUserData = await this.userService.getUserReportedTimes(
        reportUser!
      );

      let isDisabledUser;

      if (reportUserData) {
        isDisabledUser = countReportedTimes(reportUserData);
      }

      if (isDisabledUser) {
        await this.userService.updateReportedTimes(reportUser!, isDisabledUser);
      }

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    }
  );
}

export { VolunteerCommentController };
