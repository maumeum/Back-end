import { PostCommentService } from '../services/postCommentService.js';
import { NextFunction, Request, Response } from 'express';

class PostCommentController {
  static postComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const postCommentData = req.body;
      const result = await PostCommentService.createComment(postCommentData);

      if (result) {
        res.status(201).json({ message: 'created' });
      } else {
        res.status(404).json({ message: 'error' });
      }
    } catch (error) {
      next(error);
    }
  };

  static getComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { postId } = req.params;
      const postCommentList = await PostCommentService.readComment(postId);

      if (postCommentList) {
        res.status(200).json(postCommentList);
      } else {
        res.status(404).json({ message: 'error' });
      }
    } catch (error) {
      next(error);
    }
  };

  static getPostByComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user_id = req.id;
      const postComment = await PostCommentService.readPostByComment(user_id);

      if (postComment) {
        res.status(200).json(postComment);
      } else {
        res.status(404).json({ status: 'false' });
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
      const { postCommentId } = req.params;
      const postCommentData = req.body;
      const result = await PostCommentService.updateComment(
        postCommentId,
        postCommentData
      );

      if (result) {
        res.status(201).json({ message: 'updated' });
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
      const { postCommentId } = req.params;
      const result = await PostCommentService.deleteComment(postCommentId);

      if (result) {
        res.status(201).json({ message: 'deleted' });
      } else {
        res.status(404).json({ message: 'error' });
      }
    } catch (error) {
      next(error);
    }
  };
}

export { PostCommentController };
