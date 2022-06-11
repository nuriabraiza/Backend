import dotenv from "dotenv";
import passport from "passport";
import localStrategy from "passport-local";
import jwt from "passport-jwt";
import { userService } from "../services.js";
import config from "../../config.js";
import {
  cookieExtractor,
  createHash,
  deleteImage,
  filePath,
  isValidPassword,
  returnMessage,
} from "../../utils/functions.js";

dotenv.config();

const LocalStrategy = localStrategy.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassportConfig = () => {
  passport.use(
    "signup",
    new LocalStrategy(
      {
        passReqToCallback: true,
        session: false,
      },
      async (req, username, password, done) => {
        try {
          const user = await userService.getOne({ username });
          if (!req.file) {
            return done(
              null,
              false,
              returnMessage(true, 500, "Error al subir la imagen", null)
            );
          }
          const avatar = filePath(req.file.filename);
          if (user.code === 200) {
            await deleteImage(avatar);
            return done(
              null,
              false,
              returnMessage(true, 400, "Usuario ya existe")
            );
          }
          const newUser = {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: createHash(password),
            username: req.body.username,
            phoneNumber: req.body.prefix + req.body.phoneNumber,
            avatar: avatar,
            age: req.body.age,
            address: req.body.address,
          };
          await userService.createOne(newUser).then((user) => {
            if (user.code === 200) {
              return done(null, user);
            }
            return done(null, false, user);
          });
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(async (email, password, done) => {
      const user = await userService.getOne({ email });
      if (user.code !== 200) {
        return done(null, false, user);
      }
      if (!isValidPassword(user, password)) {
        return done(
          null,
          false,
          returnMessage(true, 400, "Contraseña incorrecta")
        );
      }
      return done(null, user);
    })
  );

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: config.JWT_SECRET,
      },
      async (jwtPayload, done) => {
        try {
          const user = await userService.getOneById(jwtPayload.payload.id);
          if (user.code === 200) {
            return done(null, user.payload);
          }
          return done(null, returnMessage(true, 401, "Usuario no encontrado"));
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.payload.id);
  });

  passport.deserializeUser(async (id, done) => {
    await userService.getOneById(id).then((user) => {
      done(null, user.payload);
    });
  });
};

export default initializePassportConfig;

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);
      if (!user) return res.redirect("/login?error=" + info.message);
      req.user = user;
      next();
    })(req, res, next);
  };
};
