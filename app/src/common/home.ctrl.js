/**
 * @author    Olivier Parent
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.home')
        //.factory('User', function($resource) {
        //    return $resource('http://www.zerowaste.local/app_dev.php/api/v1/users/');
        //})
        .controller('HomeCtrl', HomeCtrl);

    // Inject dependencies into constructor (needed when JS minification is applied).
    HomeCtrl.$inject = [
        // Angular
        '$log',
        '$http',
        '$scope',
        'UsersResourceFactory'
    ];

    function HomeCtrl(
        // Angular
        $log,
        $http,
        $scope,
        UsersResourceFactory
    ) {
        // ViewModel
        // =========
        var vm = this;

        vm.title = 'All users';

        vm.data = getUsers();

        // Functions
        // =========
        function getUsers() {

            var params = {
                user_id: 2
            };

            return UsersResourceFactory
                .query(
                params,
                getUserSuccess,
                getUserError
            );
        }

        function getUserError(reason) {
            $log.error('getUserError:', reason);
        }

        function getUserSuccess(response) {
            $log.log('getUserSuccess:', response);
        }
    }

})();
