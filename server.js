// require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var Handlebars = require('handlebars');
var HandlebarsIntl = require('handlebars-intl');




var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// var hbsHelpers = exphbs.create({
//   helpers: {
//     "dateFormat": function(dateString) {
//       var dateWithOffset = new Date(dateString);
//       var dateWithoutOffset = new Date(dateWithOffset.getTime() + dateWithOffset.getTimezoneOffset() * 1000 * 60);
//       return dateWithoutOffset.toLocaleDateString();
//       } 
//   },
//   defaultLayout: 'layout',
//   extname: '.hbs'
// });

Handlebars.registerHelper("dateFormat", function() {
  return {
    dateFormat: function(dateString) {
        var dateWithOffset = new Date(dateString);
        var dateWithoutOffset = new Date(dateWithOffset.getTime() + dateWithOffset.getTimezoneOffset() * 1000 * 60);
        return dateWithoutOffset.toLocaleDateString();
        }
      }
})

HandlebarsIntl.registerWith(Handlebars);

// app.engine('.hbs', hbsHelpers.engine);
// app.set('view engine', '.hbs');


//Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");


// exphbs.registerHelper('dateFormat', function() {
//   return {
//     formatDate: function(dateString) {
//         var dateWithOffset = new Date(dateString);
//         var dateWithoutOffset = new Date(dateWithOffset.getTime() + dateWithOffset.getTimezoneOffset() * 1000 * 60);
//         return dateWithoutOffset.toLocaleDateString();
//         }
//       }
// })

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync({force: true}).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
