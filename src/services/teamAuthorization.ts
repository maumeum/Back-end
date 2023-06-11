import { ObjectId } from 'mongodb';
import { TeamAuthorizationModel } from '../db/index.js';
import { TeamAuthorization } from '../db/schemas/teamAuthorization.js';

interface teamAuthorization {
  _id?: ObjectId;
  user_id?: ObjectId;
  category?: string;
  teamName?: string;
  introduction: string;
  establishmentDate?: Date;
  phone?: string;
  location?: string;
  image?: string;
}

class teamAuthorization {
  public async createTeamAuthorization(createInfo: teamAuthorization) {
    const createReview = await TeamAuthorizationModel.create(createInfo);
    return createReview;
  }
}
