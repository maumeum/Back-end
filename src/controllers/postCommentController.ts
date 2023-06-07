import { PostCommentService } from '../services/index.js';
import { NextFunction, Request, Response } from 'express';

class PostCommentController {
  static postComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { post_id, content } = req.body;
      const user_id = req.id;

      await PostCommentService.createComment({
        post_id,
        content,
        user_id,
      });

      res.status(201).json({ message: 'created' });
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
      const { post_id } = req.params;

      if (!post_id) {
        throw new Error('post_id 값이 올바르지 않습니다.');
      }

      const postCommentList = await PostCommentService.readComment(post_id);

      res.status(200).json(postCommentList);
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

      res.status(200).json(postComment);
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

      if (!postCommentId) {
        throw new Error('post_id 값이 올바르지 않습니다.');
      }
      const postCommentData = req.body;

      await PostCommentService.updateComment(postCommentId, postCommentData);

      res.status(201).json({ message: 'updated' });
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

      if (!postCommentId) {
        throw new Error('post_id 값이 올바르지 않습니다.');
      }

      await PostCommentService.deleteComment(postCommentId);

      res.status(201).json({ message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export { PostCommentController };
