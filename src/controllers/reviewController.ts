import { Request, Response, NextFunction } from 'express';
import {
  ReviewService,
  VolunteerApplicationService,
} from '../services/index.js';
import { ObjectId } from 'mongodb';
import { makeInstance } from '../utils/makeInstance.js';
import { STATUS_CODE } from '../utils/statusCode.js';
import { buildResponse } from '../utils/builderResponse.js';
import { AppError } from '../misc/AppError.js';
import { commonErrors } from '../misc/commonErrors.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { logger } from '../utils/logger.js';

interface ReviewData {
  review_id?: ObjectId;
  user_id?: ObjectId;
  title?: string;
  content?: string;
  images?: string[];
  volunteer_id?: any; // 나중에 고쳐야함.
}
class ReviewController {
  private reviewService = makeInstance<ReviewService>(ReviewService);
  private volunteerApplicationService =
    makeInstance<VolunteerApplicationService>(VolunteerApplicationService);

  public readMyReview = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user_id = req.id;
      const reviews = await this.reviewService.getReviewsByUserId(user_id);
      res.status(STATUS_CODE.OK).json(buildResponse(null, reviews));
    },
  );

  public readReviewDetail = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { review_id }: ReviewData = req.params;
      if (!review_id) {
        throw new AppError(
          commonErrors.argumentError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }
      const review = await this.reviewService.getReviewById(review_id);
      if (!review) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }
      res.status(STATUS_CODE.OK).json(buildResponse(null, review));
    },
  );

  public readReview = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const reviews = await this.reviewService.getReviews();
      res.status(STATUS_CODE.OK).json(buildResponse(null, reviews));
    },
  );

  public postReview = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user_id = req.id;
      const { title, content, images, volunteer_id }: ReviewData = req.body;
      const volunteer =
        await this.volunteerApplicationService.readApplicationVolunteerByVId(
          volunteer_id,
        );
      if (!volunteer[0].isParticipate) {
        throw new AppError(
          `${commonErrors.requestValidationError} : 참여 확인 버튼을 누르지 않았거나, 봉사가 끝난 날로부터 7일이 지나지 않았습니다.`,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }

      const createdReview = await this.reviewService.createReview({
        user_id,
        title,
        content,
        images,
        volunteer_id,
      });
      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    },
  );

  public updateReview = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { review_id }: ReviewData = req.params;
      if (!review_id) {
        throw new AppError(
          commonErrors.argumentError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }
      const { title, content, images }: ReviewData = req.body;
      const updateInfo: ReviewData = {};
      if (title) {
        updateInfo.title = title;
      }
      if (content) {
        updateInfo.content = content;
      }
      if (images) {
        updateInfo.images = images;
      }
      const updatedReview = await this.reviewService.updateReview(
        review_id,
        updateInfo,
      );
      res.status(STATUS_CODE.CREATED).json(buildResponse(null, updatedReview));
    },
  );

  public checkUser = asyncHandler(async (req: Request, res: Response) => {
    const { review_id }: ReviewData = req.params;
    const user_id = req.id;
    if (!review_id) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST',
      );
    }
    const review = await this.reviewService.getReviewById(review_id);
    logger.debug(`review : ${review}`);
    logger.debug(`user_id : ${user_id}`);
    logger.debug(`review?.user_id?._id : ${review?.user_id?._id}`);
    if (String(user_id) === String(review?.user_id?._id)) {
      res.status(STATUS_CODE.OK).json(buildResponse(null, true));
    } else {
      res.status(STATUS_CODE.OK).json(buildResponse(null, false));
    }
  });

  public deleteReview = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { review_id }: ReviewData = req.params;
      if (!review_id) {
        throw new AppError(
          commonErrors.argumentError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }
      await this.reviewService.deleteReview(review_id);
      res.status(STATUS_CODE.OK).json(buildResponse(null, null));
    },
  );

  public changeParticipationStatus = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user_id = req.id;
      const { volunteer_id }: ReviewData = req.params;

      if (!volunteer_id) {
        throw new AppError(
          commonErrors.argumentError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }
      const changed = await this.reviewService.changeParticipateStatus(
        volunteer_id,
        user_id,
      );
      res.status(STATUS_CODE.CREATED).json(buildResponse(null, changed));
    },
  );
}
export { ReviewController };
