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

  static getComment = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const commentList = await VolunteerCommentService.readComment(userId);

    if (commentList) {
      res.status(200).json(commentList);
    } else {
      res.status(404).json({ message: 'error' });
    }
  };

  static getPostComment = async (req: Request, res: Response) => {
    const { volunteerId } = req.params;
    const commentList = await VolunteerCommentService.readPostComment(
      volunteerId
    );

    // if(commentList){
    //   res.status(200).json(commentList);
    // }else{
    //   res.status(404).json({message : "error"});
    // }
  };

  static patchComment = async (req: Request, res: Response) => {
    const { volunteerCommentId } = req.params;
    const newComment = await VolunteerCommentService.updateComment(
      volunteerCommentId
    );

    // if(newComment){
    //   res.status(200).json({message : "updated"});
    // }else{
    //   res.status(404).json({message : "error"});
    // }
  };

  static deleteComment = async (req: Request, res: Response) => {};
}

export { VolunteerCommentController };
