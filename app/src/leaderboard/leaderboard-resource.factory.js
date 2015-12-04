/**
 * @author    Olivier Parent
 * @copyright Copyright © 2014-2015 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () { 'use strict';

    angular.module('app.leaderboard')
        .factory('LeaderboardResourceFactory', LeaderboardResourceFactory);

    // Inject dependencies into constructor (needed when JS minification is applied).
    LeaderboardResourceFactory.$inject = [
        // Angular
        '$resource',
        'config'
    ];

    function LeaderboardResourceFactory(
        // Angular
        $resource,
        config
    ) {
        var url = config.apiUrl + '/profiles/.:format';

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
