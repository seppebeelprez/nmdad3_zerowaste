/**
 * @author    Olivier Parent
 * @copyright Copyright © 2014-2015 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () { 'use strict';

    angular.module('app.makereport')
        .factory('GetLocationResourceFactory', GetLocationResourceFactory);

    // Inject dependencies into constructor (needed when JS minification is applied).
    GetLocationResourceFactory.$inject = [
        // Angular
        '$http',
        '$resource',
        //ngCordova
        '$cordovaGeolocation'
    ];

    function GetLocationResourceFactory(
        // Angular
        $http,
        $resource,
        //ngCordova
        $cordovaGeolocation
        ) {

        //var getData = {};

        return {
            getLocation : function () {

                var posOptions = {timeout: 10000, enableHighAccuracy: false};
                $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function (position) {
                        var lat  = position.coords.latitude;
                        var long = position.coords.longitude;
                        console.log('LAT: ' + lat + ' LONG: ' + long);
                        //vm.report.latitude = lat;
                        //vm.report.longitude = long;

                    }, function(err) {
                        // error
                    });
            },

            getCity : function (lat, long) {
                var request = new XMLHttpRequest();

                var method = 'GET';
                var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&sensor=true';
                var async = true;

                request.open(method, url, async);
                request.onreadystatechange = function(){
                    if(request.readyState == 4 && request.status == 200){
                        var data = JSON.parse(request.responseText);
                        var address = data.results[0];
                        console.log(address);
                        var reportCity = address['address_components'][2]['long_name'];
                        var reportPostalCode = address['address_components'][6]['long_name'];

                        vm.report.city = reportCity;
                        vm.report.postalcode = parseInt(reportPostalCode);
                        console.log('City: ' + reportCity + ', Postcode: ' + reportPostalCode);
                    }
                };
                request.send();
            }
        };

        // Get user location
        //function getLocation() {
        //    var posOptions = {timeout: 10000, enableHighAccuracy: false};
        //    $cordovaGeolocation
        //        .getCurrentPosition(posOptions)
        //        .then(function (position) {
        //            var lat  = position.coords.latitude;
        //            var long = position.coords.longitude;
        //            console.log('LAT: ' + lat + ' LONG: ' + long);
        //            vm.report.latitude = lat;
        //            vm.report.longitude = long;
        //
        //            getCity(lat, long);
        //
        //        }, function(err) {
        //            // error
        //        });
        //}

        // Get user location city and postal code
        //function getCity (lat, long) {
        //    var request = new XMLHttpRequest();
        //
        //    console.log('getCity() LAT: ' + lat + ' LONG: ' + long);
        //    var method = 'GET';
        //    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&sensor=true';
        //    var async = true;
        //
        //    request.open(method, url, async);
        //    request.onreadystatechange = function(){
        //        if(request.readyState == 4 && request.status == 200){
        //            var data = JSON.parse(request.responseText);
        //            var address = data.results[0];
        //            console.log(address);
        //            var reportCity = address['address_components'][2]['long_name'];
        //            var reportPostalCode = address['address_components'][6]['long_name'];
        //
        //            vm.report.city = reportCity;
        //            vm.report.postalcode = parseInt(reportPostalCode);
        //            console.log('City: ' + reportCity + ', Postcode: ' + reportPostalCode);
        //        }
        //    };
        //    request.send();
        //
        //
        //}

    }

})();
