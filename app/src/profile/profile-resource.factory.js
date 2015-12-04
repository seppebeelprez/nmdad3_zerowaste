/**
 * @author    Olivier Parent
 * @copyright Copyright © 2014-2015 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () { 'use strict';

    angular.module('app.profile')
        .factory('GetProfileResourceFactory', GetProfileResourceFactory);

    // Inject dependencies into constructor (needed when JS minification is applied).
    GetProfileResourceFactory.$inject = [
        // Angular
        '$resource',
        'config'
    ];

    function GetProfileResourceFactory(
        // Angular
        $resource,
        config
    ) {
        var url = config.apiUrl + '/users/:user_id/profiles/.:format';

        var paramDefaults = {
            user_id     : '@id',
            profile_id  : '@id',
            format      : 'json'
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
