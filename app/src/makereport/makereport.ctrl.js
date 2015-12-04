/**
 * @author    Seppe Beelprez
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.makereport')
        .controller('MakeReportCtrl', MakeReportCtrl);

    // Inject dependencies into constructor (needed when JS minification is applied).
    MakeReportCtrl.$inject = [
        // Angular
        '$location',
        '$scope',
        '$log',
        '$window',
        'MakeReportResourceFactory',
        'GetLocationResourceFactory',
        // Ionic
        '$ionicPopup',
        '$timeout',
        '$cordovaFileTransfer',
        // ngCordova
        '$cordovaGeolocation'
    ];

    function MakeReportCtrl(
        // Angular
        $location,
        $scope,
        $log,
        $window,
        MakeReportResourceFactory,
        GetLocationResourceFactory,
        // Ionic
        $ionicPopup,
        $timeout,
        $cordovaFileTransfer,
        //ngCordava
        $cordovaGeolocation
    ) {
        // ViewModel
        // =========
        var vm = this;

        vm.title = 'Make Report';

        vm.form = {
            report: {
                description : 'Beschrijving',
                longitude   : 'Longitude',
                latitude    : 'Latitude',
                city        : 'City',
                postalcode  : 'Postalcode',
                type        : 'Type afval',
                uri         : 'Uri',
                status      : 'Status'
            }
        };

        vm.data = {
            report: {}
        };

        vm.report = {};

        vm.post = postReport;

        console.log($scope.globalLatitude, $scope.globalLongitude, $scope.globalCity, $scope.globalPostalCode);


        // Functions
        // =========
        function postReport() {

            console.log($scope.globalLatitude, $scope.globalLongitude, $scope.globalCity, $scope.globalPostalCode);

            vm.report.uri = 'http://lorempixel.com/400/400/cats/';
            vm.report.latitude = $scope.globalLatitude;
            vm.report.longitude = $scope.globalLongitude;
            vm.report.city = $scope.globalCity;
            vm.report.postalcode = $scope.globalPostalCode;

            $log.info(vm.report);

            var params = {
                    user_id: 1,
                    format: null
                },
                postData = {
                    report: vm.report
                };
            console.log('postData: ' + postData.report);

            MakeReportResourceFactory
                .save(
                params,
                postData,
                postUserArticlesSuccess,
                postUserArticlesError
            );

            console.log(postData);

        }

        function postUserArticlesError(reason) {
            $log.error('postUserArticlesError:', reason);
        }

        function postUserArticlesSuccess(response) {
            $log.log('postUserArticlesSuccess:', response);
            $location.path('/myreports');
            $window.location.reload();
        }

        //// onSuccess Callback receives a Position object
        //var onSuccess = function(position) {
        //    console.log("LAT: " + position.coords.latitude + " LONG: " + position.coords.longitude);
        //    vm.report.latitude = position.coords.latitude;
        //    vm.report.longitude = position.coords.longitude;
        //
        //    getCityAndPostalCode(vm.report.latitude, vm.report.longitude);
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
        //            console.log(address);
        //            var reportCity = address['address_components'][2]['long_name'];
        //            var reportPostalCode = address['address_components'][6]['long_name'];
        //
        //            vm.report.city = reportCity;
        //            vm.report.postalcode = parseInt(reportPostalCode);
        //            //console.log('City: ' + reportCity + ', Postcode: ' + reportPostalCode);
        //        }
        //    };
        //    request.send();
        //}


        // .fromTemplate() method
        //$scope.showPopup = function() {
        //    $scope.data = {};
        //
        //    // An elaborate, custom popup
        //    var myPopup = $ionicPopup.show({
        //        //template: '<input type="password" ng-model="data.wifi">',
        //        title: 'Thank you for using our service!',
        //        //subTitle: 'Please use normal things',
        //        scope: $scope,
        //        buttons: [
        //            {
        //                text: 'OK',
        //                type: 'button button-positive'
        //            }
        //        ]
        //    });
        //    myPopup.then(function(res) {
        //        console.log('Tapped!', res);
        //    });
        //    $timeout(function() {
        //        myPopup.close(); //close the popup after 3 seconds for some reason
        //    }, 3000);
        //};
        // A confirm dialog
        //$scope.showConfirm = function() {
        //    var confirmPopup = $ionicPopup.confirm({
        //        title: 'Consume Ice Cream #iceicebaby',
        //        //template: 'Are you sure you want to eat this ice cream?'
        //        scope: $scope,
        //        buttons: [
        //            {
        //                text: 'OK',
        //                type: 'button button-balanced'
        //            }
        //        ]
        //    });
        //    confirmPopup.then(function(res) {
        //        if(res) {
        //            console.log('You are sure');
        //        } else {
        //            console.log('You are not sure');
        //        }
        //    });
        //};
        //
        //// An alert dialog
        //$scope.showAlert = function() {
        //    var alertPopup = $ionicPopup.alert({
        //        title: 'Don\'t eat that!',
        //        template: 'It might taste good'
        //    });
        //    alertPopup.then(function(res) {
        //        console.log('Thank you for not eating my delicious ice cream cone');
        //    });
        //};
    }

})();
