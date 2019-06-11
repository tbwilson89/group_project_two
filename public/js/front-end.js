$(document).ready(function() {


$("#notify-toggle").on("click", function () {
    if ($("#notify-box").hasClass("closed")) {
        $("#notify-box").removeClass('closed');
        $("#notify-box").addClass('opened');
    } else {
        $("#notify-box").removeClass('opened');
        $("#notify-box").addClass('closed');
    }
})

var API = {
    saveOperator: function(operator) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url:  "api/operators",
        data: JSON.stringify(operator)
      });
    },
    getTests: function(id) {
      return $.ajax({
        url: "api/testDue/" + id,
        type: "GET"
      });
    }
  };

  $("#op-btn").on("click", handleOperatorFormSubmit);
  
  //handle operator modal form submission
  function handleOperatorFormSubmit(event) {

    event.preventDefault();
    $operatorName = $("#op-name").val().trim();
    $operatorNumber = $("#op-number").val().trim();
    $operatorAddress = $("#op-address").val().trim();
    $operatorPhone = $("#op-phone").val().trim();
    $operatorBirthday = $("#op-bday").val();
    $h15Rules = $("#h15-rules").val();

  var operator = {
    operatorName: $operatorName,
    operatorNumber: $operatorNumber,
    operatorAddress: $operatorAddress,
    operatorPhone: $operatorPhone,
    operatorBirthday: $operatorBirthday,
    h15Rules: $h15Rules
  }

  if (!(operator.operatorName && operator.operatorNumber && operator.operatorAddress && operator.operatorPhone && operator.operatorBirthday && operator.h15Rules)) {
    alert("Please fill out the form completely!");
    return;
  }

  API.saveOperator(operator).then(function() {
  })
  
  location.reload();
      
}
})

