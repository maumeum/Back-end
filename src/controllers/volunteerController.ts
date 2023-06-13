import { NextFunction, Request, Response } from 'express';
import { UserService, VolunteerService } from '../services/index.js';
import { STATUS_CODE } from '../utils/statusCode.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { makeInstance } from '../utils/makeInstance.js';
import { buildResponse } from '../utils/builderResponse.js';
import { AppError } from '../misc/AppError.js';
import { commonErrors } from '../misc/commonErrors.js';
import { logger } from '../utils/logger.js';
import { ObjectId } from 'mongodb';
import { countReportedTimes } from '../utils/reportedTimesData.js';

interface MyFile extends Express.Multer.File {
  // 추가적인 사용자 정의 속성을 선언할 수도 있습니다
  // 예: 필요한 경우 가공된 파일 경로 등
  processedPath: string;
}

class VolunteerController {
  private volunteerService = makeInstance<VolunteerService>(VolunteerService);
  private userService = makeInstance<UserService>(UserService);

  public postVolunteer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const register_user_id = req.id;
      const volunteerBodyData = req.body;

      if (req.files) {
        const files = req.files as MyFile[];
        logger.debug(files);
        const newPath = files.map((file) => {
          return `images/${file.filename}`;
        });

        const volunteerData = {
          ...volunteerBodyData,
          images: newPath,
          register_user_id,
        };

        await this.volunteerService.createVolunteer(volunteerData);
      }

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    },
  );

  public getVolunteer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { skip, limit } = req.query;

      const volunteerList = await this.volunteerService.readVolunteer(
        Number(skip),
        Number(limit),
      );

      const totalVolunteersCount =
        await this.volunteerService.totalVolunteerCount();
      const hasMore = Number(skip) + Number(limit) < totalVolunteersCount;
      res
        .status(STATUS_CODE.OK)
        .json(buildResponse(null, { volunteerList, hasMore }));
    },
  );

  public getCheckUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerId } = req.params;
      const user_id = req.id;

      const volunteer = await this.volunteerService.readVolunteerById(
        volunteerId,
      );

      logger.debug(String(user_id));
      logger.debug(String(volunteer.register_user_id));

      if (String(user_id) === String(volunteer.register_user_id)) {
        res.status(STATUS_CODE.OK).json(buildResponse(null, true));
      } else {
        res.status(STATUS_CODE.OK).json(buildResponse(null, false));
      }
    },
  );

  public getVolunteerById = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerId } = req.params;

      if (!volunteerId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }
      const volunteer = await this.volunteerService.readVolunteerById(
        volunteerId,
      );

      res.status(STATUS_CODE.OK).json(buildResponse(null, volunteer));
    },
  );

  public getSearchVolunteer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { keyword } = req.query;

      const searchVolunteers = await this.volunteerService.readSearchVolunteer(
        keyword as string,
      );

      res.status(STATUS_CODE.OK).json(buildResponse(null, searchVolunteers));
    },
  );

  public getRegisterationVolunteer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user_id = req.id;

      console.log(user_id);
      console.log(typeof user_id);

      const registerationVolunteers =
        await this.volunteerService.readRegistrationVolunteer(user_id);

      res
        .status(STATUS_CODE.OK)
        .json(buildResponse(null, registerationVolunteers));
    },
  );

  public patchVolunteer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const volunteerBodyData = req.body;
      const { volunteerId } = req.params;

      if (!volunteerId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }

      if (req.files) {
        const files = req.files as MyFile[];
        const newPath = files.map((file) => {
          return file.path.replace('public/', '');
        });

        const volunteerData = { ...volunteerBodyData, images: newPath };
        await this.volunteerService.updateVolunteer(volunteerId, volunteerData);
      }

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    },
  );

  public patchRegisterationStatusName = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerId } = req.params;

      if (!volunteerId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }

      const volunteerData = req.body;

      await this.volunteerService.updateRegisterationVolunteer(
        volunteerId,
        volunteerData,
      );

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    },
  );

  public patchReportVolunteer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerId } = req.params;

      if (!volunteerId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }

      await this.volunteerService.updateReportVolunteer(volunteerId, {
        isReported: true,
      });

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    },
  );

  // ===== 관리자 기능 =====

  // 신고된 내역 전체 조회
  public getReportedVolunteer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { skip, limit } = req.query;
      const reportedVolunteer =
        await this.volunteerService.readReportedVolunteer(
          Number(skip),
          Number(limit),
        );

      const totalVolunteersCount =
        await this.volunteerService.totalReportedVolunteerCount();

      const hasMore = Number(skip) + Number(limit) < totalVolunteersCount;

      res
        .status(STATUS_CODE.OK)
        .json(buildResponse(null, { reportedVolunteer, hasMore }));
    },
  );

  // 신고된 내역 반려
  public patchReportedVolunteer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerId } = req.params;

      if (!volunteerId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }

      await this.volunteerService.updateReportVolunteer(volunteerId, {
        isReported: false,
      });

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    },
  );

  // 신고된 내역 승인
  public deleteReportedVolunteer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { volunteerId } = req.params;

      if (!volunteerId) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          STATUS_CODE.BAD_REQUEST,
          'BAD_REQUEST',
        );
      }

      // 데이터 삭제
      const deleteVolunteer =
        await this.volunteerService.deleteReportedVolunteer(volunteerId);

      //글 작성한 유저정보 가져오기
      const reportUser = deleteVolunteer.register_user_id;

      const reportUserData = await this.userService.getUserReportedTimes(
        reportUser!,
      );

      let isDisabledUser;

      if (reportUserData) {
        isDisabledUser = countReportedTimes(reportUserData);
      }

      if (isDisabledUser) {
        await this.userService.updateReportedTimes(reportUser!, isDisabledUser);
      }

      res.status(STATUS_CODE.CREATED).json(buildResponse(null, null));
    },
  );
}
export { VolunteerController };
