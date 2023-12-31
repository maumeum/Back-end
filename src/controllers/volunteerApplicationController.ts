import {
  VolunteerApplicationService,
  VolunteerService,
} from '../services/index.js';
import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE } from '../utils/statusCode.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { makeInstance } from '../utils/makeInstance.js';
import { buildResponse } from '../utils/builderResponse.js';
import { AppError } from '../misc/AppError.js';
import { commonErrors } from '../misc/commonErrors.js';

class VolunteerApplicationController {
  private volunteerApplicationService =
    makeInstance<VolunteerApplicationService>(VolunteerApplicationService);

  private volunteerService = makeInstance<VolunteerService>(VolunteerService);

  public postApplicationVolunteer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteer_id } = req.body;

      const user_id = req.id;

      // 중복 신청 확인
      const result =
        await this.volunteerApplicationService.doubleCheckApplicationVolunteer({
          user_id,
          volunteer_id,
        });

      if (result === true) {
        throw new AppError(
          '이미 신청한 봉사입니다. 신청한 봉사 내역을 확인해주세요.',
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }
      // 모집인원 및 신청인원 데이터 가져오기
      const volunteerData = await this.volunteerService.readVolunteerById(
        volunteer_id,
      );

      const applyCount = volunteerData.applyCount;
      const registerCount = volunteerData.registerCount;

      if (applyCount >= registerCount) {
        throw new AppError(
          '모집인원이 마감된 봉사입니다. 신청이 불가능합니다.',
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }

      await this.volunteerApplicationService.createApplicationVolunteer({
        user_id,
        volunteer_id,
      });

      await this.volunteerService.updateVolunteerApplyCount(volunteer_id, {
        applyCount: applyCount + 1,
      });

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    },
  );

  public getApplicationVolunter = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user_id = req.id; //봉사를 신청한 사람
      const { status } = req.query;

      let isParticipateStatus = false;
      if (status === 'true') {
        // 봉사를 완료한 사람
        isParticipateStatus = true;
      } else if (status === 'false') {
        isParticipateStatus = false;
      }

      const volunteerList =
        await this.volunteerApplicationService.readApplicationVolunteer(
          user_id,
          isParticipateStatus,
        );

      res.status(STATUS_CODE.OK).json(buildResponse(null, volunteerList));
    },
  );

  public deleteApplicationVolunteer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerApplicationId } = req.params;

      if (!volunteerApplicationId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }

      const { volunteer_id } = req.body;

      const volunteerData = await this.volunteerService.readVolunteerById(
        volunteer_id,
      );

      const applyCount = volunteerData.applyCount;

      await this.volunteerService.updateVolunteerApplyCount(volunteer_id, {
        applyCount: applyCount - 1,
      });

      await this.volunteerApplicationService.deleteApplicationVolunteer(
        volunteerApplicationId,
      );

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    },
  );
}

export { VolunteerApplicationController };
