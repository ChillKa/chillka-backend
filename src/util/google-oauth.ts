import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';
import User from '../model/user.model';

const googleOauth = () => {
  const GoogleStrategy = passportGoogle.Strategy;
  const redirectUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.HOST
      : `http://localhost:${process.env.PORT}`;

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID ?? '',
        clientSecret: process.env.CLIENT_SECRET ?? '',
        callbackURL: redirectUrl?.concat('/api/google-oauth/callback') ?? '',
      },
      async (accessToken, refreshToken, profile, done) => {
        const user = await User.findOne({ googleId: profile.id });

        if (!user) {
          const newUser = await User.create({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails?.[0].value,
          });
          if (newUser) {
            done(null, newUser);
          }
        } else {
          done(null, user);
        }
      }
    )
  );
};

export default googleOauth;
