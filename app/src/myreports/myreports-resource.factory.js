/**
 * @author    Olivier Parent
 * @copyright Copyright © 2014-2015 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () { 'use strict';

    angular.module('app.myreports')
        .factory('MyReportsResourceFactory', MyReportsResourceFactory);

    // Inject dependencies into constructor (needed when JS minification is applied).
    MyReportsResourceFactory.$inject = [
        // Angular
        '$resource',
        'config'
    ];

    function MyReportsResourceFactory(
        // Angular
        $resource,
        config
    ) {
        var url = config.apiUrl + '/users/:user_id/reports/:report_id.:format';

        var paramDefaults = {
            user_id   : '@id',
            report_id : '@id',
            format    : 'json'
        };

        var actions = {
            'query' : {
                method : 'GET',
                isArray: false
            }
        };

        return $resource(url, paramDefaults, actions);
    }

})();
