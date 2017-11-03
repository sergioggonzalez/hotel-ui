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