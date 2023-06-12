import { ObjectId } from 'mongodb';
import { TeamAuthModel } from '../db/index.js';

interface teamAuth {
  _id?: ObjectId;
  user_id?: ObjectId;
  category?: '기관' | '개인/동아리';
  teamName?: string;
  introduction?: string;
  briefHistory?: string;
  establishmentDate?: Date;
  phone?: string;
  location?: string;
  image?: string;
}

class TeamAuthService {
  public async createTeamAuth(createInfo: teamAuth) {
    const createReview = await TeamAuthModel.create(createInfo);
    return createReview;
  }

  public async readTeamAuth(info: teamAuth) {
    const teamAuth = await TeamAuthModel.find();
    return teamAuth;
  }
}

export { TeamAuthService };
