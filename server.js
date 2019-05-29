require("dotenv").config();
var express = require("express");
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var session = require('express-session')
var exphbs = require("express-handlebars");
var Handlebars = require('handlebars');
var HandlebarsIntl = require('handlebars-intl');
HandlebarsIntl.registerWith(Handlebars);

Handlebars.registerHelper("has_passed", function(dateString) {
  if(moment(dateString).isAfter(moment().add(60, 'days').calendar())){
    return false;
  } else {
    return true;
    }
});

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  scope: ['email']
},
function(accessToken, refreshToken, profile, done) {
  var userEmail = profile.emails[0].value
  var username = userEmail.slice(0, userEmail.indexOf('@'))
  db.Users.findOrCreate({
    where: {
      userName: username,
      email: userEmail,
      googleId: profile.id
    }
  }).spread(function (userResult, created) {
    console.log(userResult.dataValues.id)
    if(created){
      return done(null, userResult.dataValues.id)
    } else {
      return done(null, userResult.dataValues.id);
    }
  }).catch(function(err) {
    console.log(err)
  })
}))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//Check if user is logged in
const accessProtectionMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/')
  }
}


// Routes
require("./routes/apiRoutes")(app, accessProtectionMiddleware);
require("./routes/authentication")(app, accessProtectionMiddleware);
require("./routes/htmlRoutes")(app, accessProtectionMiddleware);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
