import { Request, Response, NextFunction } from 'express';
import { ReviewService } from '../services/reviewService.js';
import { ObjectId } from 'mongodb';
interface ReviewData {
  review_id?: ObjectId;
  user_id?: ObjectId;
  title?: string;
  content?: string;
  images?: string[];
  volunteer_id?: ObjectId;
}
class ReviewController {
  public reviewService = new ReviewService();

  public readReview = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const reviews = await this.reviewService.getReviews();
    console.log(reviews);
    res.status(201).json(reviews);
    console.log('리뷰 전체 조회 성공');
  };

  public postReview = (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.id;
    const { title, content, images, volunteer_id }: ReviewData = req.body;
    const createdReview = this.reviewService.createReview({
      user_id,
      title,
      content,
      images,
      volunteer_id,
    });
    res.status(201).json();
    console.log('리뷰 생성 성공');
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
      console.log(
        '🚀 ~ file: reviewController.ts:65 ~ ReviewController ~ updatedUser:',
        updatedReview,
      );

      res.status(201).json(updatedReview);
      console.log('리뷰수정완료');
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}
export { ReviewController };
