/**
 * @author    Olivier Parent
 * @copyright Copyright © 2014-2015 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () { 'use strict';

    angular.module('app.general')
        .factory('LocationResourceFactory', LocationResourceFactory);

    // Inject dependencies into constructor (needed when JS minification is applied).
    LocationResourceFactory.$inject = [
        // Angular
        '$resource'
    ];

    function LocationResourceFactory(
        // Angular
        $resource
    ) {
        //var vm = this;
        //
        //vm.glob = {};
        //
        //// onSuccess Callback receives a Position object
        //var onSuccess = function(position) {
        //    console.log("LocationResourceFactory: LAT: " + position.coords.latitude + " LONG: " + position.coords.longitude);
        //    //vm.glob.latitude = position.coords.latitude;
        //    //vm.glob.longitude = position.coords.longitude;
        //
        //    vm.glob.globalLatitude = position.coords.latitude;
        //    vm.glob.globalLongitude = position.coords.longitude;
        //
        //    getCityAndPostalCode(vm.glob.globalLatitude, vm.glob.globalLongitude);
        //};
        //
        //
        //// onError Callback receives a PositionError object
        //function onError(error) {
        //    alert('code: '    + error.code    + '\n' +
        //        'message: ' + error.message + '\n');
        //}
        //
        //navigator.geolocation.getCurrentPosition(onSuccess, onError);
        //
        //
        ////disable button until location successful
        ////display waiting message
        //function getCityAndPostalCode (lat, long) {
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
        //            //console.log(address);
        //            var reportCity = address['address_components'][2]['long_name'];
        //            var reportPostalCode = address['address_components'][6]['long_name'];
        //
        //            //vm.glob.city = reportCity;
        //            //vm.glob.postalcode = parseInt(reportPostalCode);
        //
        //            vm.glob.globalCity = reportCity;
        //            vm.glob.globalPostalCode = parseInt(reportPostalCode);
        //            console.log('LocationResourceFactory: City: ' + reportCity + ', Postcode: ' + reportPostalCode);
        //        }
        //    };
        //    request.send();
        //}

        //console.log(vm.glob.city);
        //
        //return {
        //    globalLatitude      : vm.glob.latitude,
        //    globalLongitude     : vm.glob.longitude,
        //    globalCity          : vm.glob.city,
        //    globalPostalCode    : vm.glob.postalcode
        //};
    }

})();
