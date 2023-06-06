import { VolunteerCommentService } from '../services/volunteerCommentService.js';
import { NextFunction, Request, Response } from 'express';

class VolunteerCommentController {
  static postComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const volunteerComment = req.body;
      const result = await VolunteerCommentService.createComment(
        volunteerComment
      );

      if (result) {
        res.status(200).json({ message: 'created' });
      } else {
        res.status(404).json({ message: 'error' });
      }
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

      if (volunteerComment) {
        res.status(200).json(volunteerComment);
      } else {
        res.status(404).json({ status: 'false' });
      }
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
        throw new Error('봉사활동 댓글ID에 대한 정보가 없습니다.');
      }
      const volunteerCommentData = req.body;
      const newComment = await VolunteerCommentService.updateComment(
        volunteerCommentId,
        volunteerCommentData
      );

      if (newComment) {
        res.status(200).json({ message: 'updated' });
      } else {
        res.status(404).json({ message: 'error' });
      }
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
        throw new Error('봉사활동 댓글ID에 대한 정보가 없습니다.');
      }
      const comment = await VolunteerCommentService.deleteComment(
        volunteerCommentId
      );

      if (comment) {
        res.status(201).json({ message: 'deleted' });
      } else {
        res.status(404).json({ message: 'error' });
      }
    } catch (error) {
      next(error);
    }
  };
}

export { VolunteerCommentController };
