/**
 * @author    Olivier Parent
 * @copyright Copyright © 2014-2015 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () { 'use strict';

    angular.module('app.login')
        .factory('UserLoginResourceFactory', UserLoginResourceFactory);

    // Inject dependencies into constructor (needed when JS minification is applied).
    UserLoginResourceFactory.$inject = [
        // Angular
        '$resource'
    ];

    function UserLoginResourceFactory(
        // Angular
        $resource
    ) {
        var url = 'http://www.nmdad3.arteveldehogeschool.local/api/v1/users/:user_id/articles/:article_id.:format';

        var paramDefaults = {
            format    : 'json'
        };

        var actions = {
            //'query' : {
            //    method : 'GET',
            //    isArray: false
            //}
        };

        return $resource(url, paramDefaults, actions);
    }

})();
