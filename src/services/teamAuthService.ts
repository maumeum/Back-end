import { ObjectId } from 'mongodb';
import { TeamAuthModel } from '../db/index.js';
import { logger } from '../utils/logger.js';

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
  isSubmit?: boolean;
}

class TeamAuthService {
  public async createTeamAuth(createInfo: teamAuth) {
    const createReview = await TeamAuthModel.create(createInfo);
    return createReview;
  }

  public async readTeamAuth(teamAuth_id: ObjectId) {
    const teamAuth = await TeamAuthModel.findById(teamAuth_id);
    return teamAuth;
  }

  public async readTeamAuthByUid(user_id: ObjectId) {
    const teamAuth = await TeamAuthModel.findOne({ user_id: user_id });
    return teamAuth;
  }

  public async readTeamAuthByCondition(condition: {}) {
    const teamAuth = await TeamAuthModel.find(condition).populate('user_id', [
      'nickname',
    ]);
    return teamAuth;
  }

  public async updateTeamAuth(teamAuth_id: ObjectId, updateInfo: teamAuth) {
    const teamAuth = await TeamAuthModel.findOneAndUpdate(
      { _id: teamAuth_id },
      updateInfo,
    );
    return teamAuth;
  }
}

export { TeamAuthService };
