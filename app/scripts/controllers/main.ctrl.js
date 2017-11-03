app.controller('MainCtrl', ['$scope', 'hotels', function($scope, hotels) {

    $scope.hotels = [];
    $scope.hotelsCache = [];
    $scope.hotelsError = false;

    $scope.getHotels = function() {
        hotels.getHotels()
            .then(
                function(res) {
                $scope.hotels = res.data;
                $scope.hotelsCache = res.data;
                $scope.hotelsError = false;
            },
                function(res) {
                    $scope.hotelsError = true;
            })
    }

    $scope.getHotels();
        
}]);