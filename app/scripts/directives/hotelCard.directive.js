app.directive('hotelCard', [function() {
    return {
        restrict: 'E',
        scope: {
            hotel: '='
        },
        templateUrl: '../views/hotel-card.html',
        controller: ['$scope', function hotelCardCtrl($scope) {
            $scope.stars = new Array(parseInt($scope.hotel.stars));

        }]
      };
}]);