/**
 * @author    Olivier Parent
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.register')
        .controller('RegisterCtrl', RegisterCtrl);

    // Inject dependencies into constructor (needed when JS minification is applied).
    RegisterCtrl.$inject = [
        // Angular
        '$log',
        '$location',
        '$scope',
        'UserRegisterResourceFactory'
        // ngCordova
    ];

    function RegisterCtrl(
        // Angular
        $log,
        $location,
        $scope,
        UserRegisterResourceFactory
        // ngCordova
    ) {
        // ViewModel
        // =========
        var vm = this;

        vm.title = 'Create account';
        vm.form = {
            user: {
                username: 'Username',
                email: 'Email',
                password: 'Password'
            }
        };

        vm.data = {
            user: {}
        };

        vm.user = {};

        vm.registerUser = registerUser;

        // Functions
        // =========
        function registerUser() {
            console.log('registerUser function entered');
            $log.info(vm.user);

            var params = {
                    format: null
                },
                postData = {
                    user: vm.user
                };

            UserRegisterResourceFactory
                .save(
                params,
                postData,
                postUserRegisterError,
                postUserRegisterSuccess
            );
        }

        function postUserRegisterError(reason) {
            $log.error('postUserRegisterError:', reason);
        }

        function postUserRegisterSuccess(response) {
            $log.log('postUserRegisterSuccess:', response);
            $location.path('#/allreports');
        }
    }
})();
