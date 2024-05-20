import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';
import User from '../model/user.model';

const googleStrategy = () => {
  const GoogleStrategy = passportGoogle.Strategy;

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: process.env.HOST!.concat('/api/google-oauth/callback'),
      },
      async (accessToken, refreshToken, profile, done) => {
        const googleUser = await User.findOne({ googleId: profile.id });

        if (!googleUser) {
          const emailUser = await User.findOne({
            email: profile.emails?.[0].value,
          });

          if (emailUser) {
            emailUser.googleId = profile.id;
            await emailUser.save();

            done(null, emailUser);
          } else {
            const newUser = await User.create({
              googleId: profile.id,
              displayName: profile.displayName,
              email: profile.emails?.[0].value,
            });

            if (newUser) done(null, newUser);
          }
        } else {
          done(null, googleUser);
        }
      }
    )
  );
};

export default googleStrategy;
