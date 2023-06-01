import { error } from 'console';
import { NextFunction, Request, Response } from 'express';

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('로그인필요');
  }
};

const isNotLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = '로그인한 상태입니다.';
    res.send(`/?error=${message}`);
    console.log(message, error);
  }
};

export { isLoggedIn, isNotLoggedIn };
