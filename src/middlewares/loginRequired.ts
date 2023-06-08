import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { logger } from '../utils/logger.js';
interface JwtPayload {
  user_id: ObjectId;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      id: ObjectId;
      role: string;
    }
  }
}

function loginRequired(req: Request, res: Response, next: NextFunction) {
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
    logger.debug('user_id: ' + user_id + ' role: ' + role);
    req.id = user_id;
    req.role = role;
    logger.debug('디코딩성공');
    next();
  } catch (error) {
    // jwt.verify 함수가 에러를 발생시키는 경우는 토큰이 정상적으로 decode 안되었을 경우임.
    // 403 코드로 JSON 형태로 프론트에 전달함.
    res.status(403).json({
      result: 'forbidden-approach',
      reason: '정상적인 토큰이 아닙니다.',
    });
    return;
  }
}

export { loginRequired };
