/**
 * @author    Olivier Parent
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.allreports')
        .controller('AllReportsCtrl', AllReportsCtrl);

    // Inject dependencies into constructor (needed when JS minification is applied).
    AllReportsCtrl.$inject = [
        // Angular
        '$location',
        '$scope',
        '$log',
        'AllReportsResourceFactory'
    ];

    function AllReportsCtrl(
        // Angular
        $location,
        $scope,
        $log,
        AllReportsResourceFactory
    ) {
        // ViewModel
        // =========
        var vm = this;

        vm.title = 'All Reports';

        vm.data = getAllReports();

        // Functions
        // =========
        function getAllReports() {

            var params = {
                user_id: 1,
                format: null
            };

            return AllReportsResourceFactory
                .query(
                params,
                getAllReportsSuccess,
                getAllReportsError
            );
        }

        function getAllReportsError(reason) {
            $log.error('getAllReportsError:', reason);
        }

        function getAllReportsSuccess(response) {
            $log.log('getAllReportsSuccess:', response);
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
