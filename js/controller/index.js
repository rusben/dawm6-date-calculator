// jQuery code
$(document).ready(function () {

});

// angularjs code
/* (function(){ // write your code here })(); */
(function(){
  // This is the instance of our angular app
  var app = angular.module("DateCalculatorApp", []);

  app.controller("DateCalculatorController", function($scope, $window) {
    // Controller properties
    this.dates; // Array with the dates
    this.nDates; // Number of dates
    this.nDays; // Number of days

    // This variable will be filled up by the popup with the result
    // PopUp --> {'data': this.result, 'action': $scope.action , 'source': this.dates, 'nDays': this.nDays };
    this.result; 

    // Scope variables 
    $scope.action; // Current action
    $scope.showResult; // Flag to show the result returning from the popUp

    $scope.actionName = function(action) {
      if (action == "add") return "Add";
      if (action == "substract") return "Substraction";
      if (action == "weekDay") return "Day of the week";
      if (action == "daysUntilToday") return "Number of days between the given date and today";
    };

    $scope.actionSymbol = function(action) {
      if (action == "add") return "+";
      if (action == "substract") return "-";
    };

    // Get an Array with dimension num
    $scope.getNumber = function(num) {
      var a = []; 
      for(var i=0; i<num; i++) a.push(i);
      return a;
    }

    // Initialize the values of the controller
    this.initialize = function () {
      // Controller variables
      this.dates = [];
      this.nDates = 3;
      this.nDays = 1;
      this.result = "";
      // Scope variables
      $scope.action = "add";
      $scope.showResult = false;
    };

    this.popUpOperation = function() {
      var popupWindow = $window.open('view/popup/popup.html');
      // Uncomment this line if you want to share data with a javascript variable
      // To share via javascript vartiable uncomment the lines in popUp.js as well
      // popupWindow.shared = {'nDates': this.nDates, 'nDays': this.nDays, 'action': $scope.action}
    };

    // http://stackoverflow.com/questions/3885817/how-do-i-check-that-a-number-is-float-or-integer
    this.validNDates = function () {
      // valid integer
      if (!isNaN(this.nDates) && this.nDates >= 1 && this.nDates % 1 === 0) return true;
    };

    this.validNDays = function () {
      // valid integer
      if (!isNaN(this.nDays) && this.nDays >= 1 && this.nDays % 1 === 0) return true;
    };

    // Initialize with the default values
    this.initialize();
    
  });

  /*
    The restrict option is typically set to:

    'A' - only matches attribute name
    'E' - only matches element name
    'C' - only matches class name
    'M' - only matches comment
  */

  app.directive("resultViewForm", function () {
    return {
      restrict: 'E', // type of directive
      templateUrl:"view/templates/result-view-form.html",
      controller: function() {
        // When the document is ready execute this code
      },
      controllerAs: 'resultViewFormCtrl' // This is the alias
    };
  });

})();
