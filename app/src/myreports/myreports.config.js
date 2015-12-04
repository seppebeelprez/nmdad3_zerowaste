/**
 * @author    Seppe Beelprez
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.myreports')
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
            .state('myreports', {
                controller: 'MyReportsCtrl as vm',
                templateUrl: 'templates/myreports/myreports.view.html',
                url: '/myreports'
            })
            .state('myreports_report_edit', {
                controller: 'MyReportSpecificCtrl as vm',
                templateUrl: 'templates/myreports/myspecificreport.view.html',
                url: '/myreports/:report_id/edit'
            });
    }
})();