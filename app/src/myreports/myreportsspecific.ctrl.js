/**
 * @author    Olivier Parent
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.myreports')
        .controller('MyReportSpecificCtrl', MyReportSpecificCtrl);

    // Inject dependencies into constructor (needed when JS minification is applied).
    MyReportSpecificCtrl.$inject = [
        // Angular
        '$routeParams',
        '$scope',
        '$route',
        '$log',
        '$window',
        'MyReportsResourceFactory'
    ];

    function MyReportSpecificCtrl(
        // Angular
        $routeParams,
        $scope,
        $route,
        $log,
        $window,
        MyReportsResourceFactory
    ) {
        // ViewModel
        // =========
        var vm = this;

        vm.title = 'Report detail';

        vm.report = getMyReports();

        vm.delete = deleteMyReport;

        var id = $scope.reportId = $routeParams.reportId;
        console.log(id);

        // Functions
        // =========
        function getMyReports() {

            var params = {
                user_id: 2,
                report_id: 11
            };

            return MyReportsResourceFactory
                .query(
                params,
                getMyReportsSuccess,
                getMyReportsError
            );
        }

        function getMyReportsError(reason) {
            $log.error('getMyReportsError:', reason);
        }

        function getMyReportsSuccess(response) {
            $log.log('getMyReportsSuccess:', response);
        }

        function deleteMyReport(report) {
            var currentID = report.id;
            console.log(currentID);

            var params = {
                user_id: 1,
                report_id: currentID,
                format: 'json'
            };

            return MyReportsResourceFactory
                .delete(
                params,
                deleteMyReportsSuccess,
                deleteMyReportsError
            );

        }

        function deleteMyReportsError(reason) {
            $log.error('deleteMyReportsError:', reason);
        }

        function deleteMyReportsSuccess(response) {
            $log.log('deleteMyReportsSuccess:', response);
            $window.location.reload();
        }


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
