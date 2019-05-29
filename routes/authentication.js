var passport = require('passport');

module.exports = function(app, accessProtectionMiddleware) {
  app.get('/auth/google', passport.authenticate('google'));

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/loggedin')
    }
  )

  app.get('/isAuth', accessProtectionMiddleware, function(req,res){
    res.json({
      message: 'You have accessed the protected endpoint!',
      yourUserInfo: req.user,
    })
  })
}
