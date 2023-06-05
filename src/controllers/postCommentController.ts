import { PostCommentService } from '../services/postCommentService.js';
import { Request, Response } from 'express';

class PostCommentController {
  static postComment = async (req: Request, res: Response) => {
    const postCommentData = req.body;
    const result = await PostCommentService.createComment(postCommentData);

    if (result) {
      res.status(201).json({ message: 'created' });
    } else {
      res.status(404).json({ message: 'error' });
    }
  };

  static getComment = async (req: Request, res: Response) => {
    const { postId } = req.params;
    const postCommentList = await PostCommentService.readComment(postId);

    if (postCommentList) {
      res.status(200).json(postCommentList);
    } else {
      res.status(404).json({ message: 'error' });
    }
  };

  // 다시 짜야됨
  static getPostByComment = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const postList = await PostCommentService.readPostByComment(userId);
    /*
    if (postList) {
      res.status(200).json(postList);
    } else {
      res.status(404).json({ message: 'error' });
    }
    */
  };

  static patchComment = async (req: Request, res: Response) => {
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
  };

  static deleteComment = async (req: Request, res: Response) => {
    const { postCommentId } = req.params;
    const result = await PostCommentService.deleteComment(postCommentId);

    if (result) {
      res.status(201).json({ message: 'deleted' });
    } else {
      res.status(404).json({ message: 'error' });
    }
  };
}

export { PostCommentController };
