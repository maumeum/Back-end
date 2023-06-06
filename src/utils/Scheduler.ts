import schedule from 'node-schedule';
import { ReviewService } from '../services/reviewService.js';

const reviewService = new ReviewService();

const changeParticipateStatus = () => {
  schedule.scheduleJob(
    '0 0 * * *',
    reviewService.changeParticipateStatusAtMidnight,
  );
};

export { changeParticipateStatus };
