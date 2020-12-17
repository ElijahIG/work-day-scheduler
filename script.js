$(function () {
  //Adds current day to currentDay Head
  var currentdayEl = $("#currentDay");
  currentdayEl.text(moment().format("MMM Do YY"));
  var currentHourTime = parseInt(moment().format("k"));
  //Change color
  for (var hourCount = 9; hourCount < 18; hourCount++) {
    var hourgrabEl = $("#hour-" + hourCount);
    if (hourCount < currentHourTime) {
      hourgrabEl.attr("class", "row time-block past");
    } else if (hourCount === currentHourTime) {
      hourgrabEl.attr("class", "row time-block present");
    } else {
      hourgrabEl.attr("class", "row time-block future");
    }
  }

  var descriptionArray = {};
  $(".saveBtn").on("click", function () {
    var tempString = $(this.previousElementSibling).val();
    var hourTemp = $(this).val();
    descriptionArray[hourTemp] = tempString;
    localStorage.setItem("description", JSON.stringify(descriptionArray));
  });

  function displaySavedDescription() {
    for (var hourCount = 9; hourCount < 18; hourCount++) {
      if (descriptionArray[hourCount] !== undefined) {
        var descriptiongrabEl = $("#hour-" + hourCount + " textarea");
        descriptiongrabEl.val(descriptionArray[hourCount]);
      }
    }
  }

  function init() {
    var storedDescriptions = JSON.parse(localStorage.getItem("description"));
    if (storedDescriptions !== null) {
      descriptionArray = storedDescriptions;
    }
    displaySavedDescription();
  }

  init();
});
