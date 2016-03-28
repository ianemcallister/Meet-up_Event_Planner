/* HostedEventsProgressBar.directive.js */

/**
* @desc displays a users progress through the events page.
* @example <hosted-events-progress-bar></hosted-events-progress-bar>
*/

angular
	.module('meetUpEventApp')
	.directive('progressBar', progressBar);

/* @ngInject */
function progressBar() {
return {
      restrict: 'E',
      scope: {
        curVal: '@',
        maxVal: '@'
      },
      template: "<div class='progress-bar'>"+
                  "<div class='progress-bar-bar'>testing</div>"+
                "</div>",    

      link: function ($scope, element, attrs) {
        
        function updateProgress() {
          var progress = 0;
          
          if ($scope.maxVal) {
            progress = Math.min($scope.curVal, $scope.maxVal) / $scope.maxVal * element.find('.progress-bar').width();
          }
          
          element.find('.progress-bar-bar').css('width', progress);          
        }
        
        $scope.$watch('curVal', updateProgress);
        $scope.$watch('maxVal', updateProgress);        
      }
    };  
 };