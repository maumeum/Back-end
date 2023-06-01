import passport from 'passport';
import { local } from './localStrategy.js';
import { UserModel } from '../db/index.js';
//@ts-ignore
const passportConfig = () => {
  passport.serializeUser((user, done) => {
    //@ts-ignore
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    UserModel.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
};

export { passportConfig };
