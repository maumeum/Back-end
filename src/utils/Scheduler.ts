import schedule from 'node-schedule';
import { ReviewService } from '../services/reviewService.js';

const reviewService = new ReviewService();

//매일 자정 실행되는 함수
const changeParticipateStatus = () => {
  schedule.scheduleJob(
    '0 0 * * *',
    reviewService.changeParticipateStatusAtMidnight,
  );
};

export { changeParticipateStatus };
