// jQuery code
$(document).ready(function () {

});

// angularjs code
/* (function(){ // write your code here })(); */
(function(){
  // This is the instance of our angular app
  var app = angular.module("DateCalculatorPopUp", []);

  app.controller("PopUpController", function($scope, $window) {
    // Controller properties
    this.dates;    
    this.result;
    this.nDates;
    this.nDays;

    // Scope properties
    $scope.action;

    // Scope methods
    // Get an Array with dimension num
    $scope.getNumber = function(num) {
      var a = []; 
      for(var i=0; i<num; i++) a.push(i);
      return a;
    };

    // Get the action name
    $scope.actionName = function(action) {
      if (action == "add") return "Add";
      if (action == "substract") return "Substraction";
      if (action == "weekDay") return "Day of the week";
      if (action == "daysUntilToday") return "Number of days between the given date and today";
    };

    // Controller methods
    // Initialize the controller default properties
    this.initialize = function () {
      // Shared data from the opener
      // * Using shared data via javascript variable.
      // this.nDates = $window.shared.nDates; // Shared data from the opener
      // this.nDays = $window.shared.nDays; // Shared data from the opener
      // $scope.action = $window.shared.action;

      // * Using angular object
      // console.log($window.opener.angular.element('#date-calculator-ctrl').scope());

      // Load data from the window opener using angular object
      this.nDates = $window.opener.angular.element('#date-calculator-ctrl').scope().DateCalculatorCtrl.nDates;
      this.nDays = $window.opener.angular.element('#date-calculator-ctrl').scope().DateCalculatorCtrl.nDays;
      $scope.action = $window.opener.angular.element('#date-calculator-ctrl').scope().action;

      this.result = [];
      this.dates = []; // Model initial dates
      for (var i = 0; i < this.nDates; i++) {
        this.dates[i] = "";
      }

    };

    // Initialize the dates model
    this.validDates = function () {
      for (var i = 0; i < this.dates.length; i++) {
        if (!this.validDate(i)) return false;
      }
      return true;
    };

    // http://stackoverflow.com/questions/18758772/how-do-i-validate-a-date-in-this-format-yyyy-mm-dd-using-jquery/18758944
    this.validDate = function (i) {
      
        var dateString = this.dates[i].toString();

        var regEx = /^\d{4}-\d{2}-\d{2}$/;
        if(!dateString.match(regEx))
          return false;  // Invalid format
        var d;
        if(!((d = new Date(dateString))|0))
          return false; // Invalid date (or this could be epoch)
        return d.toISOString().slice(0,10) == dateString;

    };

    // Calculate the operation and push the result to the opener
    this.calculate = function() {
      
      if (this.validDates()) {
        if ($scope.action == "add") this.calculateAdd();
        if ($scope.action == "substract") this.calculateSubstract();
        if ($scope.action == "weekDay") this.calculateWeekDay();
        if ($scope.action == "daysUntilToday") this.calculateDaysUntilToday();

        this.pushResult();
      }

    };

    // http://stackoverflow.com/questions/17007939/accessing-parent-window-angular-scope-from-child-window
    this.pushResult = function () {
      var openerScope = $window.opener.angular.element('#date-calculator-ctrl').scope();
      // console.log(openerScope);
      openerScope.DateCalculatorCtrl.result = {'data': this.result, 'action': $scope.action , 'source': this.dates, 'nDays': this.nDays };
      // console.log(openerScope.DateCalculatorCtrl.result);
      openerScope.showResult = true;
      // Apply the changes in the controller
      openerScope.$apply();
      // Close the popupwindow
      $window.close();
    };

    // http://stackoverflow.com/questions/563406/add-days-to-javascript-date
    // http://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object
    this.calculateAdd = function() {

      for (var i = 0; i < this.dates.length; i++) {
        this.result[i] = new Date(this.dates[i].toString());
        this.result[i].setDate(this.result[i].getDate() + this.nDays);
        // Get just the first 10 characters from the ISO String
        this.result[i] = this.result[i].toISOString().substring(0,10);
      }

    };

    this.calculateSubstract = function() {

      for (var i = 0; i < this.dates.length; i++) {
        this.result[i] = new Date(this.dates[i].toString());
        this.result[i].setDate(this.result[i].getDate() - this.nDays);
        // Get just the first 10 characters from the ISO String
        this.result[i] = this.result[i].toISOString().substring(0,10);
      }

    };
    
    this.calculateWeekDay = function() {
      var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      
      for (var i = 0; i < this.dates.length; i++) {
        this.result[i] = new Date(this.dates[i].toString());
        // Get the day of the week from the Date object
        this.result[i] = weekday[this.result[i].getDay()];
      }
    };
    
    // http://stackoverflow.com/questions/2627473/how-to-calculate-the-number-of-days-between-two-dates-using-javascript
    this.calculateDaysUntilToday = function() {

      var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
      var firstDate;
      var secondDate;

      for (var i = 0; i < this.dates.length; i++) {
        firstDate = new Date(this.dates[i].toString());
        secondDate = new Date(); // Today
        this.result[i] = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)))        
      } 
    };

    // Initialize the controller default values
    this.initialize();

  });

  app.directive("operationViewForm", function () {
    return {
      restrict: 'E', // type of directive
      templateUrl:"../../view/templates/operation-view-form.html",
      controller: function() {
        // When the document is ready execute this code
      },
      controllerAs: 'operationViewFormCtrl' // This is the alias
    };
  }); 

})();
