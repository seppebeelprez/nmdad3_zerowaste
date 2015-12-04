/**
 * @author    Seppe Beelprez
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.leaderboard')
        .config(Routes);

    // Inject dependencies into constructor (needed when JS minification is applied).
    Routes.$inject = [
        // Angular
        '$stateProvider'
    ];

    function Routes(
        // Angular
        $stateProvider
        ) {
        $stateProvider
            .state('leaderboard', {
                controller: 'LeaderboardCtrl as vm',
                templateUrl: 'templates/leaderboard/leaderboard.view.html',
                url: '/leaderboard'
            });
    }

})();