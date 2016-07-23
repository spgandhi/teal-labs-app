import angular from 'angular';
import angularMeteor from 'angular-meteor';
var Highcharts = require('highcharts');

var app = angular.module('socially', [
  angularMeteor
]);

app.controller('Main', ['$scope', function ($scope) {
	$scope.text = "Shreyans";

   $scope.panelActive = "Class";

   $scope.quick_stats = [
      {
         count: "24",
         text: "Total Students",
         icon: "users",
         panel: "panel-primary"
      },
      {
         count: "46145",
         text: "Questions Attempted",
         icon: "question-circle-o",
         panel: "panel-green"
      },
      {
         count: "84 %",
         text: "Class Performance",
         icon: "cogs",
         panel: "panel-yellow"
      },
      {
         count: "1.23",
         text: "TL Quotient",
         icon: "signal",
         panel: "panel-red"
      }
   ]

   $scope.class_stats = [
      {
         width: '6',
         chartID: 'myChart',
         panelHeading: 'Questions Attempted'
      },
      {
         width: '6',
         chartID: 'myChart1',
         panelHeading: 'Class Performance'
      },
      {
         width: '6',
         chartID: 'myChart2',
         panelHeading: 'Class Performance vs Difficulty'
      },
      {
         width: '6',
         chartID: 'myChart3',
         panelHeading: "Class' Mensuration Performance"
      }
   ]
 
}])

app.controller('Import', ['$scope', function($scope){

}])