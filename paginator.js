var app = angular.module('angPaginator', []);

app.directive('paginator', function(){
    
    return {
        restrict: 'E',
        templateUrl: '<div class="pagination-wrapper" ng-if="hasOtherPages()"> <ul class="pagination"> <li ng-class="{ disabled: !hasPrevious() }"><span>Previous</span></li> <li ng-repeat="i in getIterable(currentPage - 1) track by $index" ng-if="$index < linkLimit"> <a ng-if="parseInt(currentPage)!=linkLimit">{{ parseInt(currentPage) - linkLimit + $index }}</a> <a ng-if="parseInt(currentPage)==linkLimit">{{ parseInt(currentPage) - linkLimit + $index + 1 }}</a> </li> <li class="active"><a>{{currentPage}}</a></li> <li ng-repeat="i in getIterable( ( totalPages - currentPage ) ) track by $index" ng-if="$index < linkLimit"> <a>{{$index + parseInt(currentPage) + 1 }}</a> </li> <li><a ng-class="{ disabled: !hasNext() }">Next</a></li> </ul></div>',
        
        scope: {
            currentPage: '@currentPage',
            totalObjects: '@totalObjects',
            objectsPerPage: '@objectsPerPage'
        },

        controller: function($scope){
            
            $scope.totalPages = Math.ceil( $scope.totalObjects / $scope.objectsPerPage );

            //This variable linkLimit will control the number of pages around the central page.
            $scope.linkLimit = 2;
            $scope.parseInt = parseInt;


            $scope.hasOtherPages = function(){
                return ( ( $scope.totalObjects / $scope.objectsPerPage ) > 1 ) ;
            };
            
            $scope.isLastPage = function(){
                return ( ( $scope.currentPage*$scope.objectsPerPage ) >= ( $scope.totalObjects - $scope.linkLimit*$scope.objectsPerPage ) ) ;
            };
            
            $scope.hasPrevious = function(){
                return $scope.currentPage > 1 + $scope.linkLimit ;
            };
            
            $scope.hasNext = function(){
                return !$scope.isLastPage() ;
            };
            
            $scope.getIterable = function(range){
                range = parseInt(range) ;
                return new Array(range) ;
            }
            
        },

        link: function(scope, elem, attrs){
            elem.css({textAlign: 'center'}) ;
        }
    }
});

