/**
 * @author    Olivier Parent
 * @copyright Copyright © 2014-2015 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () { 'use strict';

    angular.module('app.register')
        .factory('UserRegisterResourceFactory', UserRegisterResourceFactory);

    // Inject dependencies into constructor (needed when JS minification is applied).
    UserRegisterResourceFactory.$inject = [
        // Angular
        '$resource'
    ];

    function UserRegisterResourceFactory(
        // Angular
        $resource
    ) {
        var url = 'http://www.zerowaste.local/api/v1/users/:user_id.:format';

        var paramDefaults = {
            user_id    : '@id',
            format      : 'json'
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
