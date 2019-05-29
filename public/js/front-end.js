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
    getTests: function(id) {
      return $.ajax({
        url: "api/testDue/" + id,
        type: "GET"
      });
    }
  };