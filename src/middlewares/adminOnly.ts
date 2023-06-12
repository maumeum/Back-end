import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger.js';
import jwt from 'jsonwebtoken';
import { AppError } from '../misc/AppError.js';
import { ObjectId } from 'mongodb';
import { STATUS_CODE } from '../utils/statusCode.js';

interface JwtPayload {
  user_id: ObjectId;
  role: string;
}

function adminOnly(req: Request, res: Response, next: NextFunction) {
  const userToken = req.headers['authorization']?.split(' ')[1];

  if (!userToken || userToken === null) {
    logger.info('Authorization 토큰 없음');
    res.status(403).json({
      result: 'forbidden-approach',
      reason: '로그인한 유저만 사용할 수 있는 서비스입니다.',
    });

    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const jwtDecoded = jwt.verify(userToken, secretKey) as JwtPayload;

    const { user_id, role } = jwtDecoded;

    if (role !== 'admin') {
      throw new AppError(
        '관리자가 아닙니다.',
        STATUS_CODE.BAD_REQUEST,
        'BAD_REQUEST'
      );
    }

    req.id = user_id;
    req.role = role;

    next();
  } catch (error) {
    next(error);
  }
}

export { adminOnly };
