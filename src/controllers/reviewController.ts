import { Request, Response, NextFunction } from 'express';
import {
  ReviewService,
  VolunteerApplicationService,
} from '../services/index.js';
import { ObjectId } from 'mongodb';
import { makeInstance } from '../utils/makeInstance.js';

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

  public readMyReview = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user_id = req.id;
      console.log(user_id);
      const reviews = await this.reviewService.getReviewsById(user_id);
      console.log(reviews);
      res.status(200).json(reviews);
    } catch (error) {
      next();
    }
  };

  public readReview = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const reviews = await this.reviewService.getReviews();
      console.log(reviews);
      res.status(201).json(reviews);
      console.log('리뷰 + 닉네임 전체 조회 성공');
    } catch (error) {
      next();
    }
  };

  public postReview = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user_id = req.id;
      const { title, content, images, volunteer_id }: ReviewData = req.body;
      const volunteer =
        await this.volunteerApplicationService.readApplicationVolunteerByVId(
          volunteer_id,
        );
      if (!volunteer[0].isParticipate) {
        throw new Error(
          '참여 확인 버튼을 누르지 않았거나, 봉사가 끝난 날로부터 7일이 지나지 않았습니다.',
        );
      }

      const createdReview = await this.reviewService.createReview({
        user_id,
        title,
        content,
        images,
        volunteer_id,
      });
      res.status(201).json();
      console.log('리뷰 생성 성공');
    } catch (error) {
      next();
    }
  };

  public updateReview = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      console.log('리뷰 수정 시작');
      const { review_id }: ReviewData = req.params;

      if (!review_id) {
        throw new Error('리뷰 id가 제공되지 않았습니다.');
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

      res.status(201).json(updatedReview);
      console.log('리뷰수정완료');
    } catch (error) {
      next(error);
    }
  };

  public deleteReview = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { review_id }: ReviewData = req.params;
      if (!review_id) {
        throw new Error('리뷰 id가 제공되지 않았습니다.');
      }
      await this.reviewService.deleteReview(review_id);
      res.status(204).json();
    } catch (error) {
      next();
    }
  };

  public changeParticipationStatus = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user_id = req.id;
      const { volunteer_id } = req.body;

      if (!volunteer_id) {
        throw new Error('volunteer_id 없음');
      }
      const changed = await this.reviewService.changeParticipateStatus(
        volunteer_id,
        user_id,
      );
      res.status(201).json(changed);
    } catch (error) {
      next();
    }
  };
}
export { ReviewController };
