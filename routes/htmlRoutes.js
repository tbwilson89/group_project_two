var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  //Load Accordion
  app.get("/accordion", function(req, res) {
    db.Operator.findAll({
      where: { authID: 1 },
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

  app.get("/loggedin", function(req, res) {
    db.Operator.findAll({
      where: { authID: 1 },
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

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
