/**
 * @author    Olivier Parent
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.login')
        .controller('LoginCtrl', LoginCtrl);

    // Inject dependencies into constructor (needed when JS minification is applied).
    LoginCtrl.$inject = [
        // Angular
        '$log',
        '$scope',
        '$state',
        '$http'
        // ngCordova
    ];

    function LoginCtrl(
        // Angular
        $log,
        $scope,
        $state,
        $http,
        UserRegisterResourceFactory
        // ngCordova
    ) {
        // ViewModel
        // =========
        var vm = this;

        vm.title = 'Login';
        vm.form = {
            login: {
                username: 'Username',
                password: 'Password'
            }
        };
        vm.loginUser = loginUser;
        
        // Functions
        // =========
        function loginUser() {
            console.log('loginUser function entered');
            var uName = vm.form.login.username;
            console.log(uName);
            var passwd = vm.form.login.password;

            var params={username:uName,password:passwd};

            var req = {
                method: 'POST',
                url: 'http://www.zerowaste.local/security_login',
                dataType: 'jsonp',
                crossDomain: true,
                headers: {
                    'Content-Type': "application/json"
                },
                data: params
            };

            $http(req)
                .then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }

        //$scope.loginUser = function(user) {
        //    console.log('Sign-In', user);
        //    $state.go('allreports');
        //};
    }
})();
