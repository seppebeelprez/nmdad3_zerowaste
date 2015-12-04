/**
 * @author    Seppe Beelprez
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.home')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = [
        // Angular
        '$scope',
        //'LocationResourceFactory',
        // Ionic
        '$ionicSideMenuDelegate',
        '$ionicHistory'
    ];

    function MainCtrl(
        // Angular
        $scope,
        //LocationResourceFactory,
        // Ionic
        $ionicSideMenuDelegate,
        $ionicHistory
    ){
        $scope.toggleLeftSideMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.myGoBack = function() {
            $ionicHistory.goBack();
        };

        //var vm = this;

        //vm.glob = {};

        // onSuccess Callback receives a Position object
        var onSuccess = function(position) {
            console.log("LocationResourceFactory: LAT: " + position.coords.latitude + " LONG: " + position.coords.longitude);
            //vm.glob.latitude = position.coords.latitude;
            //vm.glob.longitude = position.coords.longitude;

            $scope.globalLatitude = position.coords.latitude;
            $scope.globalLongitude = position.coords.longitude;

            getCityAndPostalCode($scope.globalLatitude, $scope.globalLongitude);
        };


        // onError Callback receives a PositionError object
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);


        //disable button until location successful
        //display waiting message
        function getCityAndPostalCode (lat, long) {
            var request = new XMLHttpRequest();

            console.log('getCity() LAT: ' + lat + ' LONG: ' + long);
            var method = 'GET';
            var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&sensor=true';
            var async = true;

            request.open(method, url, async);
            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    var data = JSON.parse(request.responseText);
                    var address = data.results[0];
                    //console.log(address);
                    var reportCity = address['address_components'][2]['long_name'];
                    var reportPostalCode = address['address_components'][6]['long_name'];

                    //vm.glob.city = reportCity;
                    //vm.glob.postalcode = parseInt(reportPostalCode);

                    $scope.globalCity = reportCity;
                    $scope.globalPostalCode = parseInt(reportPostalCode);
                    console.log('LocationResourceFactory: City: ' + reportCity + ', Postcode: ' + reportPostalCode);
                }
            };
            request.send();
        }

    }
})();