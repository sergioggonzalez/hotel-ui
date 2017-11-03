'use strict';

var app = angular.module('hotel-ui', []);
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
app.directive('hotelFilters', [function() {
    return {
        restrict: 'E',
        scope: {
            hotels: '=',
            hotelsCache: '='
        },
        templateUrl: '../views/hotel-filters.html',
        controller: ['$scope', '$filter', function hotelCardCtrl($scope, $filter) {
            var lastSearchTerm = 'a';

            $scope.applyFilters = function(searchTerm) {
                var filteredHotels = $scope.hotelsCache;

                filteredHotels = searchHotelByName(filteredHotels, searchTerm);
                filteredHotels = filterHotelsByStars(filteredHotels);
                
                $scope.hotels = filteredHotels;
            };

           var searchHotelByName = function(hotelsToFilter, searchTerm) {
                lastSearchTerm = searchTerm !== undefined ? searchTerm : lastSearchTerm;

                return $filter('filter')(hotelsToFilter, { name: lastSearchTerm });
            }

            $scope.stars = {all: true, five: false, four: false, three: false, two: false, one: false};

            var filterHotelsByStars = function(hotelsToFilter) {
                var starsArr = [];

                if ($scope.stars.all) {
                    starsArr = [5,4,3,2,1];
                } else {
                    var starsMap = {five: 5, four: 4, three: 3, two: 2, one: 1};
                    for (var checkbox in $scope.stars) {
                        if ($scope.stars[checkbox]) {
                            starsArr.push(starsMap[checkbox]);
                        } 
                    }
                }

                return $filter('byStars')(hotelsToFilter, starsArr);
            };

            
            $scope.$watchCollection('stars', function(checkboxVal, oldCheckboxVal) {
                if (checkboxVal.all && !oldCheckboxVal.all) {
                    $scope.stars.all = true;
                    $scope.stars.five = false;
                    $scope.stars.four = false;
                    $scope.stars.three = false;
                    $scope.stars.two = false;
                    $scope.stars.one = false;
                } else {
                    if (!checkboxVal.five && !checkboxVal.four && !checkboxVal.three && !checkboxVal.two && !checkboxVal.one) {
                        $scope.stars.all = true;
                    } else if (checkboxVal.five || checkboxVal.four || checkboxVal.three || checkboxVal.two || checkboxVal.one) {
                        $scope.stars.all = false;
                    }
                }
            });

        }]
      };
}]);
app.filter('byStars', function() {
    return function(hotels, starsArr) {
        var filtered = [];

        hotels.forEach(function(hotel) {
            if (starsArr.indexOf(hotel.stars) !== -1) {
                filtered.push(hotel);
            }
        });

        return filtered;
    };
})
app.factory('hotels', ['$http' ,function($http) {

    this.getHotels = function() {
        return $http.get('http://localhost:3000/hotels');
    }

    return {
        getHotels: this.getHotels
    };
}]);