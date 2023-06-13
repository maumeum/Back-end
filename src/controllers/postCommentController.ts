import { asyncHandler } from '../middlewares/asyncHandler.js';
import { PostCommentService, UserService } from '../services/index.js';
import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE } from '../utils/statusCode.js';
import { makeInstance } from '../utils/makeInstance.js';
import { buildResponse } from '../utils/builderResponse.js';
import { AppError } from '../misc/AppError.js';
import { commonErrors } from '../misc/commonErrors.js';
import { countReportedTimes } from '../utils/reportedTimesData.js';

class PostCommentController {
  private postCommentService =
    makeInstance<PostCommentService>(PostCommentService);
  private userService = makeInstance<UserService>(UserService);

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
    },
  );

  public getComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { postId } = req.params;
      const { skip, limit } = req.query;

      if (!postId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }

      const postCommentList = await this.postCommentService.readComment(
        postId,
        Number(skip),
        Number(limit),
      );
      const totalCommentCount = await this.postCommentService.totalCommentCount(
        postId,
      );
      const hasMore = Number(skip) + Number(limit) < totalCommentCount;

      res
        .status(STATUS_CODE.OK)
        .json(buildResponse(null, { postCommentList, hasMore }));
    },
  );

  public getPostByComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user_id = req.id;

      const postComment = await this.postCommentService.readPostByComment(
        user_id,
      );

      res.status(STATUS_CODE.OK).json(buildResponse(null, postComment));
    },
  );

  public patchComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { postCommentId } = req.params;

      if (!postCommentId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }
      const postCommentData = req.body;

      await this.postCommentService.updateComment(
        postCommentId,
        postCommentData,
      );

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    },
  );

  public patchReportComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { postCommentId } = req.params;

      if (!postCommentId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }

      await this.postCommentService.updateReportComment(postCommentId, {
        isReported: true,
      });

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    },
  );

  public deleteComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { postCommentId } = req.params;

      if (!postCommentId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }

      await this.postCommentService.deleteComment(postCommentId);

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    },
  );

  // ===== 관리자 기능 =====

  //신고된 내역 전체 조회
  public getReportedPostComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const reportedPostComment =
        await this.postCommentService.readReportedPostComment();

      res.status(STATUS_CODE.OK).json(buildResponse(null, reportedPostComment));
    },
  );

  public patchReportedPostComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { postCommentId } = req.params;

      if (!postCommentId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }

      await this.postCommentService.updateReportComment(postCommentId, {
        isReported: false,
      });
      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    },
  );

  public deleteReportedPostComment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { postCommentId } = req.params;

      if (!postCommentId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }

      const deletePostComment =
        await this.postCommentService.deleteReportedPostComment(postCommentId);

      //글 작성한 유저정보 가져오기
      const reportUser = deletePostComment.user_id;

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

export { PostCommentController };
