import { VolunteerCommentService } from '../services/index.js';
import { NextFunction, Request, Response } from 'express';

class VolunteerCommentController {
  static postComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user_id = req.id;
      const { volunteer_id, content } = req.body;

      await VolunteerCommentService.createComment({
        volunteer_id,
        content,
        user_id,
      });

      res.status(200).json({ message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  static getVolunteerByComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user_id = req.id;
      const volunteerComment =
        await VolunteerCommentService.readVolunteerByComment(user_id);

      res.status(200).json(volunteerComment);
    } catch (error) {
      next(error);
    }
  };

  static getPostComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { volunteerId } = req.params;

      if (!volunteerId) {
        throw new Error('봉사활동에 대한 정보가 없습니다.');
      }

      const commentList = await VolunteerCommentService.readPostComment(
        volunteerId
      );

      if (commentList) {
        res.status(200).json(commentList);
      } else {
        res.status(404).json({ message: 'error' });
      }
    } catch (error) {
      next(error);
    }
  };

  static patchComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { volunteerCommentId } = req.params;

      if (!volunteerCommentId) {
        throw new Error('봉사활동 댓글에 대한 정보가 없습니다.');
      }
      const volunteerCommentData = req.body;
      await VolunteerCommentService.updateComment(
        volunteerCommentId,
        volunteerCommentData
      );

      res.status(200).json({ message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  static deleteComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { volunteerCommentId } = req.params;

      if (!volunteerCommentId) {
        throw new Error('봉사활동 댓글에 대한 정보가 없습니다.');
      }
      await VolunteerCommentService.deleteComment(volunteerCommentId);

      res.status(201).json({ message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export { VolunteerCommentController };
