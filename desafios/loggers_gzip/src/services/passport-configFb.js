import dotenv from "dotenv";
import passport from "passport";
import fbStrategy from "passport-facebook";
import users from "../api/user.js";
dotenv.config();
const FacebookStrategy = fbStrategy.Strategy;

export const initializePassportConfigFb = () => {
  passport.use(
    "facebook",
    new FacebookStrategy(
      {
        clientID: process.env.FB_CLIENT_ID,
        clientSecret: process.env.FB_CLIENT_SECRET,
        callbackURL: process.env.FB_CALLBACK_URL,
        profileFields: [
          "id",
          "picture.type(large)",
          "emails",
          "name",
          "age_range",
          "displayName",
        ],
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const userExist = await users.getOneByProperty(
            "email",
            profile.emails[0].value
          );
          if (userExist.code === 200) {
            done(null, userExist.payload);
          } else {
            const newUser = await users.createOne({
              name: profile.name.givenName,
              surname: profile.name.familyName,
              email: profile.emails[0].value,
              alias: profile.displayName,
              avatar: profile.photos[0].value,
            });
            done(null, newUser.payload);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    users.getOneById(id).then((user) => {
      done(null, user.payload);
    });
  });
};

