var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  app.get("/api/operator", function(req, res) {
    db.Tests.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  app.get("/api/testDue/:id", function(req, res) {
    db.Tests.findAll({
      where: {
        testID: req.params.id
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

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
