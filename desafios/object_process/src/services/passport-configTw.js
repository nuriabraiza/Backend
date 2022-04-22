import dotenv from "dotenv";
import passport from "passport";
import users from "../api/user.js";
import twStrategy from "passport-twitter";
dotenv.config();
const TwitterStrategy = twStrategy.Strategy;

export const initializePassportConfigTw = () => {
  passport.use(
    "twitter",
    new TwitterStrategy(
      {
        consumerKey: process.env.TW_CONSUMER_KEY,
        consumerSecret: process.env.TW_CONSUMER_SECRET,
        callbackURL: process.env.TW_CALLBACK_URL,
        profileFields: [
          "id",
          "picture.type(large)",
          "emails",
          "name",
          "age_range",
          "displayName",
        ],
      },
      async (token, tokenSecret, profile, done) => {
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
