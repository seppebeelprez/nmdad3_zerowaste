/**
 * @author    Olivier Parent
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.leaderboard')
        //.factory('User', function($resource) {
        //    return $resource('http://www.zerowaste.local/app_dev.php/api/v1/users/');
        //})
        .controller('LeaderboardCtrl', LeaderboardCtrl);

    // Inject dependencies into constructor (needed when JS minification is applied).
    LeaderboardCtrl.$inject = [
        // Angular
        '$log',
        '$http',
        '$scope',
        'LeaderboardResourceFactory'

    ];

    function LeaderboardCtrl(
        // Angular
        $log,
        $http,
        $scope,
        LeaderboardResourceFactory
    ) {
        // ViewModel
        // =========
        var vm = this;

        vm.title = 'Leaderboard';

        vm.data = getAllProfiles();

        console.log(vm.data);

        // Functions
        // =========
        function getAllProfiles() {

            var params = {
                //user_id: 1,
                format: null
            };

            return LeaderboardResourceFactory
                .query(
                params,
                getAllProfilesSuccess,
                getAllProfilesError
            );
        }

        function getAllProfilesError(reason) {
            $log.error('getAllProfilesError:', reason);
        }

        function getAllProfilesSuccess(response) {
            $log.log('getAllProfilesSuccess:', response);
        }


    }

})();
