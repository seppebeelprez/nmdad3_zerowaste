/**
 * @author    Olivier Parent
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.profile')
        //.factory('User', function($resource) {
        //    return $resource('http://www.zerowaste.local/app_dev.php/api/v1/users/');
        //})
        .controller('ProfileCtrl', ProfileCtrl);

    // Inject dependencies into constructor (needed when JS minification is applied).
    ProfileCtrl.$inject = [
        // Angular
        '$log',
        '$http',
        '$scope',
        'GetProfileResourceFactory'

    ];

    function ProfileCtrl(
        // Angular
        $log,
        $http,
        $scope,
        GetProfileResourceFactory
    ) {
        // ViewModel
        // =========
        var vm = this;

        vm.title = 'Profile';

        vm.data = getProfile();

        console.log(vm.data);

        // Functions
        // =========
        function getProfile() {

            var params = {
                user_id: 1,
                format: null
            };

            return GetProfileResourceFactory
                .query(
                params,
                getProfileSuccess,
                getProfileError
            );
        }

        function getProfileError(reason) {
            $log.error('getProfileError:', reason);
        }

        function getProfileSuccess(response) {
            $log.log('getProfileSuccess:', response);
        }


    }

})();
