import passport from 'passport'
import passportGoogle from 'passport-google-oauth20'

let GoogleStrategy = passportGoogle.Strategy;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:8080/callback-google"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    const email = profile.emails[0].value
    User.findOrCreate({ email }, function (err, user) {
      return cb(err, user);
    });
  }
));