var db = require("../models");
var passport = require("passport");

module.exports = function(app, accessProtectionMiddleware) {
  // Load index page
  app.get("/", function(req, res) {
    console.log('user', req.user);
    db.Operator.findAll({
      where: { authID: req.user },
      include: [
        {
          model: db.OpField,
          include: [
            {
              model: db.Lease,
              include: [
                {
                  model: db.Wells,
                  include: [
                    {
                      model: db.Tests,
                      include: [
                        {
                          model: db.Filings
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }).then(function(results) {
      // res.json(results);
      res.render("index", {
        bagel: results
      });
    });
  });

  //Load Accordion
  app.get("/accordion", function(req, res) {
    db.Operator.findAll({
      where: { authID: req.user },
      include: [
        {
          model: db.OpField,
          include: [
            {
              model: db.Lease,
              include: [
                {
                  model: db.Wells,
                  include: [
                    {
                      model: db.Tests,
                      include: [
                        {
                          model: db.Filings
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }).then(function(results) {
      // res.json(results);
      res.render("accordion", {
        bagel: results
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.get("/loggedin", accessProtectionMiddleware, function(req, res) {
    db.Operator.findAll({
      where: { authID: req.user },
      include: [
        {
          model: db.OpField,
          include: [
            {
              model: db.Lease,
              include: [
                {
                  model: db.Wells,
                  include: [
                    {
                      model: db.Tests,
                      include: [
                        {
                          model: db.Filings
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }).then(function(results) {
      // res.json(results);
      res.render("loggedin", {
        bagel: results
      });
    });
  });

  app.get("/logout", function(req, res) {
    req.logout();
    req.user = null;
    res.redirect("/");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
