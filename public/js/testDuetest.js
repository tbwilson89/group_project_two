// Get references to page elements
var $memberName = $("#member-name");
var $testList = $(".testList");
var userID = 1;
// The API object contains methods for each kind of request we'll make
var API = {
    getBagel: function(userID) {
        return $.ajax({
            url: "api/bagel/" + userID,
            type: "GET"
        })
    },
    getField: function(operatorID) {
        return $.ajax({
            url: "api/fields/" + operatorID,
            type: "GET"
        })
    },
    getLease: function(fieldID) {
        return $.ajax({
            url: "api/lease/" + fieldID,
            type: "GET"
        })
    },
    getWells: function(leaseID) {
        return $.ajax({
            url: "api/wells/" + leaseID,
            type: "GET"
        })
    },
    getTest: function(wellID) {
        return $.ajax({
            url: "api/testDue/" + wellID,
            type: "GET"
        });
    },
    getTitle(testID) {
        return $.ajax({
            url: "api/testInfo/" + testID,
            type: "GET"
        })
    },
    getRow(name) {
        var $row = $("<div>")
            .attr({
            class: "row",
            "data-id": name
        });
        return $row;
    },
    getCol(name, number, id) {
        var $div = $("<div>")
            .html("<h3>" +  name + " - " + number + "</h3>")
            .attr({
            class: "col-md-6 col-md-offset-3 testList",
            "data-id": id
        });
        return $div;
    },
    getPanel(name, number) {
    }
};

// refreshTests gets up and coming tests from the db and repopulates the list
var refreshTests = function() {
    API.getBagel(userID).then(function (all_data) {
        // console.log('ALL DATA', all_data);
        for (var i = 0; i < all_data.length; i++) {
            

        }
        
    })
};
    

refreshTests();
