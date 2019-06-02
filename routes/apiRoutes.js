var db = require("../models");
var passport = require('passport');

module.exports = function(app, accessProtectionMiddleware) {
  app.get("/api/operator", function(req, res) {
    db.Tests.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  app.get("/api/testDue/:id", function(req, res) {
    db.Tests.findAll({
      where: {
        userID: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  app.get("/api/operators/:id", function(req, res) {
    db.Operator.findAll({
      where: {
        authID: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });

  });

  app.get("/api/bagel/:id", function(req,res) {
    db.Operator.findAll({
      where: {authID: req.params.id},
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
    }).then(result => {
        res.json(result);
    });

});

  app.get("/api/fields/:id", function(req,res) {
    db.OpField.findAll({
      where: {
        operatorID: req.params.id
      }
    }).then(function(result) {
      res.json(result);
  });
});

  app.get("/api/lease/:id", function(req, res) {
    db.Lease.findAll({
      where: {
        fieldID: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  app.get("/api/wells/:id", function(req, res) {
    db.Wells.findAll({
      where: {
        leaseID: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  app.get("/api/testInfo/:id", function(req, res) {
    db.Filings.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  // Create a new operator
  app.post("/api/operators", accessProtectionMiddleware, function(req, res) {
    console.log('user', req.user);
    req.body = {...req.body,...{authID: req.user}};
    db.Operator.create(req.body).then(function(dbOperator) {
      res.json(dbOperator);
    })
    .catch(function(err) {
      console.log(err, req.body);
    })
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
