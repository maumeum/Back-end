import jwt from 'jsonwebtoken';
import 'dotenv/config';

type Token = {
  token: string;
  user_id: string;
  role: string;
};

function makeJwtToken(user: any) {
  const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
  const token = jwt.sign({ user_id: user._id, role: user.role }, secretKey);
  const userInfoWithUserToken = <Token>{};
  userInfoWithUserToken.token = token;
  return userInfoWithUserToken;
}

export { makeJwtToken };
