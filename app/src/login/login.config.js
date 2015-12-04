/**
 * @author    Seppe Beelprez
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.login')
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
            .state('login', {
                controller: 'LoginCtrl as vm',
                templateUrl: 'templates/login/login.view.html',
                url: '/login'
            });
    }

})();