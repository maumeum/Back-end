import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from '../db/index.js';
import bcrypt from 'bcrypt';

const local: any = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email', //req.body.email
        passwordField: 'password', // req.body.password
        passReqToCallback: false,
      },
      async (email, password, done) => {
        try {
          const exUser = await UserModel.findOne({ email });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
            }
          } else {
            done(null, false, { message: '가입되지 않은 회원입니다.' });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      },
    ),
  );
};

export { local };
