var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(app) {

    passport.use(new GoogleStrategy({
      clientID: '335133120464-b8708h507vknfluffbesi0sbt48fud3g.apps.googleusercontent.com',
      clientSecret: 'BRjhkObH-Dx9t7WYreMdrPtB',
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(accessToken)
      console.log(refreshToken)
      console.log(profile)
      console.log(done)
      // return done(null, profile)
      Users.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  ));


  // app.get('/auth/google/callback', (req, res)=>{
  //   res.sendFile(path.join(__dirname, './loggedin'))
  // })

  // GET /auth/google
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Google authentication will involve
  //   redirecting the user to google.com.  After authorization, Google
  //   will redirect the user back to this application at /auth/google/callback
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

  // GET /auth/google/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
      console.log('testing')
      res.render('loggedin')
      // res.redirect('/loggedin');
    }
  )

}
