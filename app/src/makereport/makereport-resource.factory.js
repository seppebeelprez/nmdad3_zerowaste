/**
 * @author    Olivier Parent
 * @copyright Copyright © 2014-2015 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () { 'use strict';

    angular.module('app.makereport')
        .factory('MakeReportResourceFactory', MakeReportResourceFactory);

    // Inject dependencies into constructor (needed when JS minification is applied).
    MakeReportResourceFactory.$inject = [
        // Angular
        '$resource'
    ];

    function MakeReportResourceFactory(
        // Angular
        $resource
    ) {
        var url = 'http://www.zerowaste.local/api/v1/users/:user_id/reports/:report_id.:format';

        var paramDefaults = {
            user_id   : '@id',
            report_id : '@id',
            format    : 'json'
        };

        var actions = {
            //'query' : {
            //    method : 'POST',
            //    isArray: true
            //}
        };

        return $resource(url, paramDefaults, actions);
    }

})();
