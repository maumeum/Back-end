import { VolunteerCommentService } from '../services/volunteerCommentService.js';
import { Request, Response } from 'express';

class VolunteerCommentController {
  static postComment = async (req: Request, res: Response) => {
    const volunteerComment = req.body;
    const result = await VolunteerCommentService.createComment(
      volunteerComment
    );

    if (result) {
      res.status(200).json({ message: 'created' });
    } else {
      res.status(404).json({ message: 'error' });
    }
  };

  //아직 구현중
  static getVolunteerByComment = async (req: Request, res: Response) => {
    const user_id = req.id;
    const volunteerComment =
      await VolunteerCommentService.readVolunteerByComment(user_id);

    console.log(volunteerComment);
  };

  static getPostComment = async (req: Request, res: Response) => {
    const { volunteerId } = req.params;
    const commentList = await VolunteerCommentService.readPostComment(
      volunteerId
    );

    if (commentList) {
      res.status(200).json(commentList);
    } else {
      res.status(404).json({ message: 'error' });
    }
  };

  static patchComment = async (req: Request, res: Response) => {
    const { volunteerCommentId } = req.params;
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
  };

  static deleteComment = async (req: Request, res: Response) => {
    const { volunteerCommentId } = req.params;
    const comment = await VolunteerCommentService.deleteComment(
      volunteerCommentId
    );

    if (comment) {
      res.status(201).json({ message: 'deleted' });
    } else {
      res.status(404).json({ message: 'error' });
    }
  };
}

export { VolunteerCommentController };
