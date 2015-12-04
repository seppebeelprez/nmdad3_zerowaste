/**
 * @author    Olivier Parent
 * @copyright Copyright © 2014-2015 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () { 'use strict';

    angular.module('app.home')
        .factory('UsersResourceFactory', UsersResourceFactory);

    // Inject dependencies into constructor (needed when JS minification is applied).
    UsersResourceFactory.$inject = [
        // Angular
        '$resource'
    ];

    function UsersResourceFactory(
        // Angular
        $resource
    ) {
        var url = 'http://www.zerowaste.local/api/v1/users';

        var paramDefaults = {
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
