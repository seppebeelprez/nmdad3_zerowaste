/**
 * @author    Seppe Beelprez
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.profile')
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
            .state('profile', {
                controller: 'ProfileCtrl as vm',
                templateUrl: 'templates/profile/profile.view.html',
                url: '/profile'
            });
    }

})();