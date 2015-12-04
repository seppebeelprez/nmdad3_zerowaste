/**
 * @author    Olivier Parent
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    // Module declarations
    var app = angular.module('app', [
        'ionic',
        'ngCordova',
        'ngResource',
        'ngRoute',
        // Modules
        'app.login',
        'app.register',
        'app.allreports',
        'app.makereport',
        'app.myreports',
        'app.leaderboard',
        'app.profile',
        'app.home',
        'app.camera',
        'app.general'
    ]);

    angular.module('app.login', []);
    angular.module('app.register', []);
    angular.module('app.allreports', []);
    angular.module('app.makereport', []);
    angular.module('app.myreports', []);
    angular.module('app.leaderboard', []);
    angular.module('app.profile', []);
    angular.module('app.home', []);
    angular.module('app.camera', []);
    angular.module('app.general', []);

    app.constant('config', {
        apiUrl: 'http://www.zerowaste.local/api/v1'
    });

    app.run(function($ionicPlatform) {
        $ionicPlatform.ready(whenReady);

        function whenReady() {
            console.log('read');
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs).
            // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
            // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
            // useful especially with forms, though we would prefer giving the user a little more room
            // to interact with the app.
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }

            if (window.StatusBar) {
                // Set the statusbar to use the default style, tweak this to
                // remove the status bar on iOS or change it to use white instead of dark colors.
                StatusBar.styleDefault();
            }
        }

    });

})();

/**
 * @author    Olivier Parent
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app')
        .config(Config);

    // Inject dependencies into constructor (needed when JS minification is applied).
    Config.$inject = [
        // Angular
        '$compileProvider',
        '$httpProvider',
        '$urlRouterProvider'
    ];

    function Config(
        // Angular
        $compileProvider,
        $httpProvider,
        $urlRouterProvider
        ) {
        // Allow 'app:' as protocol (for use in Hybrid Mobile apps)
        $compileProvider
            .aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|app):/)
            .imgSrcSanitizationWhitelist(/^\s*((https?|ftp|file|app):|data:image\/)/)
        ;

        // Enable CORS (Cross-Origin Resource Sharing)
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        // Routes
        $urlRouterProvider.otherwise('/');
    }

})();

/**
 * @author    Seppe Beelprez
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.home')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = [
        // Angular
        '$scope',
        //'LocationResourceFactory',
        // Ionic
        '$ionicSideMenuDelegate',
        '$ionicHistory'
    ];

    function MainCtrl(
        // Angular
        $scope,
        //LocationResourceFactory,
        // Ionic
        $ionicSideMenuDelegate,
        $ionicHistory
    ){
        $scope.toggleLeftSideMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.myGoBack = function() {
            $ionicHistory.goBack();
        };

        //var vm = this;

        //vm.glob = {};

        // onSuccess Callback receives a Position object
        var onSuccess = function(position) {
            console.log("LocationResourceFactory: LAT: " + position.coords.latitude + " LONG: " + position.coords.longitude);
            //vm.glob.latitude = position.coords.latitude;
            //vm.glob.longitude = position.coords.longitude;

            $scope.globalLatitude = position.coords.latitude;
            $scope.globalLongitude = position.coords.longitude;

            getCityAndPostalCode($scope.globalLatitude, $scope.globalLongitude);
        };


        // onError Callback receives a PositionError object
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);


        //disable button until location successful
        //display waiting message
        function getCityAndPostalCode (lat, long) {
            var request = new XMLHttpRequest();

            console.log('getCity() LAT: ' + lat + ' LONG: ' + long);
            var method = 'GET';
            var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&sensor=true';
            var async = true;

            request.open(method, url, async);
            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    var data = JSON.parse(request.responseText);
                    var address = data.results[0];
                    //console.log(address);
                    var reportCity = address['address_components'][2]['long_name'];
                    var reportPostalCode = address['address_components'][6]['long_name'];

                    //vm.glob.city = reportCity;
                    //vm.glob.postalcode = parseInt(reportPostalCode);

                    $scope.globalCity = reportCity;
                    $scope.globalPostalCode = parseInt(reportPostalCode);
                    console.log('LocationResourceFactory: City: ' + reportCity + ', Postcode: ' + reportPostalCode);
                }
            };
            request.send();
        }

    }
})();
/**
 * @author    Olivier Parent
 * @copyright Copyright © 2014-2015 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () { 'use strict';

    angular.module('app.allreports')
        .factory('AllReportsResourceFactory', AllReportsResourceFactory);

    // Inject dependencies into constructor (needed when JS minification is applied).
    AllReportsResourceFactory.$inject = [
        // Angular
        '$resource',
        'config'
    ];

    function AllReportsResourceFactory(
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

/**
 * @author    Seppe Beelprez
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.allreports')
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
            .state('allreports', {
                controller: 'AllReportsCtrl as vm',
                templateUrl: 'templates/allreports/allreports.view.html',
                url: '/allreports'
            });
    }
})();
/**
 * @author    Olivier Parent
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.allreports')
        .controller('AllReportsCtrl', AllReportsCtrl);

    // Inject dependencies into constructor (needed when JS minification is applied).
    AllReportsCtrl.$inject = [
        // Angular
        '$location',
        '$scope',
        '$log',
        'AllReportsResourceFactory'
    ];

    function AllReportsCtrl(
        // Angular
        $location,
        $scope,
        $log,
        AllReportsResourceFactory
    ) {
        // ViewModel
        // =========
        var vm = this;

        vm.title = 'All Reports';

        vm.data = getAllReports();

        // Functions
        // =========
        function getAllReports() {

            var params = {
                user_id: 1,
                format: null
            };

            return AllReportsResourceFactory
                .query(
                params,
                getAllReportsSuccess,
                getAllReportsError
            );
        }

        function getAllReportsError(reason) {
            $log.error('getAllReportsError:', reason);
        }

        function getAllReportsSuccess(response) {
            $log.log('getAllReportsSuccess:', response);
        }

        // .fromTemplate() method
        //$scope.showPopup = function() {
        //    $scope.data = {};
        //
        //    // An elaborate, custom popup
        //    var myPopup = $ionicPopup.show({
        //        //template: '<input type="password" ng-model="data.wifi">',
        //        title: 'Thank you for using our service!',
        //        //subTitle: 'Please use normal things',
        //        scope: $scope,
        //        buttons: [
        //            {
        //                text: 'OK',
        //                type: 'button button-positive'
        //            }
        //        ]
        //    });
        //    myPopup.then(function(res) {
        //        console.log('Tapped!', res);
        //    });
        //    $timeout(function() {
        //        myPopup.close(); //close the popup after 3 seconds for some reason
        //    }, 3000);
        //};
        // A confirm dialog
        //$scope.showConfirm = function() {
        //    var confirmPopup = $ionicPopup.confirm({
        //        title: 'Consume Ice Cream #iceicebaby',
        //        //template: 'Are you sure you want to eat this ice cream?'
        //        scope: $scope,
        //        buttons: [
        //            {
        //                text: 'OK',
        //                type: 'button button-balanced'
        //            }
        //        ]
        //    });
        //    confirmPopup.then(function(res) {
        //        if(res) {
        //            console.log('You are sure');
        //        } else {
        //            console.log('You are not sure');
        //        }
        //    });
        //};
        //
        //// An alert dialog
        //$scope.showAlert = function() {
        //    var alertPopup = $ionicPopup.alert({
        //        title: 'Don\'t eat that!',
        //        template: 'It might taste good'
        //    });
        //    alertPopup.then(function(res) {
        //        console.log('Thank you for not eating my delicious ice cream cone');
        //    });
        //};
    }

})();

/**
 * @author    Seppe Beelprez
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.home')
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
            .state('common', {
                controller: 'HomeCtrl as vm',
                templateUrl: 'templates/common/home.view.html',
                url: '/home'
            });
    }
})();
/**
 * @author    Olivier Parent
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.home')
        //.factory('User', function($resource) {
        //    return $resource('http://www.zerowaste.local/app_dev.php/api/v1/users/');
        //})
        .controller('HomeCtrl', HomeCtrl);

    // Inject dependencies into constructor (needed when JS minification is applied).
    HomeCtrl.$inject = [
        // Angular
        '$log',
        '$http',
        '$scope',
        'UsersResourceFactory'
    ];

    function HomeCtrl(
        // Angular
        $log,
        $http,
        $scope,
        UsersResourceFactory
    ) {
        // ViewModel
        // =========
        var vm = this;

        vm.title = 'All users';

        vm.data = getUsers();

        // Functions
        // =========
        function getUsers() {

            var params = {
                user_id: 2
            };

            return UsersResourceFactory
                .query(
                params,
                getUserSuccess,
                getUserError
            );
        }

        function getUserError(reason) {
            $log.error('getUserError:', reason);
        }

        function getUserSuccess(response) {
            $log.log('getUserSuccess:', response);
        }
    }

})();

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

/**
 * @author    Seppe Beelprez
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.camera')
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
            .state('camera', {
                controller: 'CameraCtrl as vm',
                templateUrl: 'templates/camera/camera.view.html',
                url: '/camera'
            });
    }

})();
/**
 * @author    Olivier Parent
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.camera')
        .controller('CameraCtrl', CameraCtrl);

    // Inject dependencies into constructor (needed when JS minification is applied).
    CameraCtrl.$inject = [
        // Angular
        '$log',
        // Ionic
        '$ionicPlatform',
        // ngCordova
        '$cordovaCamera'
    ];

    function CameraCtrl(
        // Angular
        $log,
        // Ionic
        $ionicPlatform,
        // ngCordova
        $cordovaCamera
    ) {
        // ViewModel
        // =========
        var vm = this;

        vm.getPhoto = getPhoto;
        vm.lastPhoto = 'no photo';
        vm.title = 'Camera Demo';

        // Functions
        // =========
        function getPhoto() {
            var cameraOptions = {
                quality: 75,
                targetWidth: 320,
                targetHeight: 320,
                saveToPhotoAlbum: false
            };

            $cordovaCamera
                .getPicture(cameraOptions)
                .then(getPhotoSuccess, getPhotoError);
        }
        
        function getPhotoSuccess(imageUri) {
            $log.log(imageUri);
            vm.lastPhoto = imageUri;
        }

        function getPhotoError(error) {
            $log.error(error);
            vm.lastPhoto = 'error';
        }
    }

})();

/**
 * @author    Olivier Parent
 * @copyright Copyright © 2014-2015 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () { 'use strict';

    angular.module('app.general')
        .factory('LocationResourceFactory', LocationResourceFactory);

    // Inject dependencies into constructor (needed when JS minification is applied).
    LocationResourceFactory.$inject = [
        // Angular
        '$resource'
    ];

    function LocationResourceFactory(
        // Angular
        $resource
    ) {
        //var vm = this;
        //
        //vm.glob = {};
        //
        //// onSuccess Callback receives a Position object
        //var onSuccess = function(position) {
        //    console.log("LocationResourceFactory: LAT: " + position.coords.latitude + " LONG: " + position.coords.longitude);
        //    //vm.glob.latitude = position.coords.latitude;
        //    //vm.glob.longitude = position.coords.longitude;
        //
        //    vm.glob.globalLatitude = position.coords.latitude;
        //    vm.glob.globalLongitude = position.coords.longitude;
        //
        //    getCityAndPostalCode(vm.glob.globalLatitude, vm.glob.globalLongitude);
        //};
        //
        //
        //// onError Callback receives a PositionError object
        //function onError(error) {
        //    alert('code: '    + error.code    + '\n' +
        //        'message: ' + error.message + '\n');
        //}
        //
        //navigator.geolocation.getCurrentPosition(onSuccess, onError);
        //
        //
        ////disable button until location successful
        ////display waiting message
        //function getCityAndPostalCode (lat, long) {
        //    var request = new XMLHttpRequest();
        //
        //    console.log('getCity() LAT: ' + lat + ' LONG: ' + long);
        //    var method = 'GET';
        //    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&sensor=true';
        //    var async = true;
        //
        //    request.open(method, url, async);
        //    request.onreadystatechange = function(){
        //        if(request.readyState == 4 && request.status == 200){
        //            var data = JSON.parse(request.responseText);
        //            var address = data.results[0];
        //            //console.log(address);
        //            var reportCity = address['address_components'][2]['long_name'];
        //            var reportPostalCode = address['address_components'][6]['long_name'];
        //
        //            //vm.glob.city = reportCity;
        //            //vm.glob.postalcode = parseInt(reportPostalCode);
        //
        //            vm.glob.globalCity = reportCity;
        //            vm.glob.globalPostalCode = parseInt(reportPostalCode);
        //            console.log('LocationResourceFactory: City: ' + reportCity + ', Postcode: ' + reportPostalCode);
        //        }
        //    };
        //    request.send();
        //}

        //console.log(vm.glob.city);
        //
        //return {
        //    globalLatitude      : vm.glob.latitude,
        //    globalLongitude     : vm.glob.longitude,
        //    globalCity          : vm.glob.city,
        //    globalPostalCode    : vm.glob.postalcode
        //};
    }

})();

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

/**
 * @author    Seppe Beelprez
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.leaderboard')
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
            .state('leaderboard', {
                controller: 'LeaderboardCtrl as vm',
                templateUrl: 'templates/leaderboard/leaderboard.view.html',
                url: '/leaderboard'
            });
    }

})();
/**
 * @author    Olivier Parent
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.leaderboard')
        //.factory('User', function($resource) {
        //    return $resource('http://www.zerowaste.local/app_dev.php/api/v1/users/');
        //})
        .controller('LeaderboardCtrl', LeaderboardCtrl);

    // Inject dependencies into constructor (needed when JS minification is applied).
    LeaderboardCtrl.$inject = [
        // Angular
        '$log',
        '$http',
        '$scope',
        'LeaderboardResourceFactory'

    ];

    function LeaderboardCtrl(
        // Angular
        $log,
        $http,
        $scope,
        LeaderboardResourceFactory
    ) {
        // ViewModel
        // =========
        var vm = this;

        vm.title = 'Leaderboard';

        vm.data = getAllProfiles();

        console.log(vm.data);

        // Functions
        // =========
        function getAllProfiles() {

            var params = {
                //user_id: 1,
                format: null
            };

            return LeaderboardResourceFactory
                .query(
                params,
                getAllProfilesSuccess,
                getAllProfilesError
            );
        }

        function getAllProfilesError(reason) {
            $log.error('getAllProfilesError:', reason);
        }

        function getAllProfilesSuccess(response) {
            $log.log('getAllProfilesSuccess:', response);
        }


    }

})();

/**
 * @author    Seppe Beelprez
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.login')
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
            .state('login', {
                controller: 'LoginCtrl as vm',
                templateUrl: 'templates/login/login.view.html',
                url: '/login'
            });
    }

})();
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

/**
 * @author    Olivier Parent
 * @copyright Copyright © 2014-2015 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () { 'use strict';

    angular.module('app.makereport')
        .factory('GetLocationResourceFactory', GetLocationResourceFactory);

    // Inject dependencies into constructor (needed when JS minification is applied).
    GetLocationResourceFactory.$inject = [
        // Angular
        '$http',
        '$resource',
        //ngCordova
        '$cordovaGeolocation'
    ];

    function GetLocationResourceFactory(
        // Angular
        $http,
        $resource,
        //ngCordova
        $cordovaGeolocation
        ) {

        //var getData = {};

        return {
            getLocation : function () {

                var posOptions = {timeout: 10000, enableHighAccuracy: false};
                $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function (position) {
                        var lat  = position.coords.latitude;
                        var long = position.coords.longitude;
                        console.log('LAT: ' + lat + ' LONG: ' + long);
                        //vm.report.latitude = lat;
                        //vm.report.longitude = long;

                    }, function(err) {
                        // error
                    });
            },

            getCity : function (lat, long) {
                var request = new XMLHttpRequest();

                var method = 'GET';
                var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&sensor=true';
                var async = true;

                request.open(method, url, async);
                request.onreadystatechange = function(){
                    if(request.readyState == 4 && request.status == 200){
                        var data = JSON.parse(request.responseText);
                        var address = data.results[0];
                        console.log(address);
                        var reportCity = address['address_components'][2]['long_name'];
                        var reportPostalCode = address['address_components'][6]['long_name'];

                        vm.report.city = reportCity;
                        vm.report.postalcode = parseInt(reportPostalCode);
                        console.log('City: ' + reportCity + ', Postcode: ' + reportPostalCode);
                    }
                };
                request.send();
            }
        };

        // Get user location
        //function getLocation() {
        //    var posOptions = {timeout: 10000, enableHighAccuracy: false};
        //    $cordovaGeolocation
        //        .getCurrentPosition(posOptions)
        //        .then(function (position) {
        //            var lat  = position.coords.latitude;
        //            var long = position.coords.longitude;
        //            console.log('LAT: ' + lat + ' LONG: ' + long);
        //            vm.report.latitude = lat;
        //            vm.report.longitude = long;
        //
        //            getCity(lat, long);
        //
        //        }, function(err) {
        //            // error
        //        });
        //}

        // Get user location city and postal code
        //function getCity (lat, long) {
        //    var request = new XMLHttpRequest();
        //
        //    console.log('getCity() LAT: ' + lat + ' LONG: ' + long);
        //    var method = 'GET';
        //    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&sensor=true';
        //    var async = true;
        //
        //    request.open(method, url, async);
        //    request.onreadystatechange = function(){
        //        if(request.readyState == 4 && request.status == 200){
        //            var data = JSON.parse(request.responseText);
        //            var address = data.results[0];
        //            console.log(address);
        //            var reportCity = address['address_components'][2]['long_name'];
        //            var reportPostalCode = address['address_components'][6]['long_name'];
        //
        //            vm.report.city = reportCity;
        //            vm.report.postalcode = parseInt(reportPostalCode);
        //            console.log('City: ' + reportCity + ', Postcode: ' + reportPostalCode);
        //        }
        //    };
        //    request.send();
        //
        //
        //}

    }

})();

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

/**
 * @author    Seppe Beelprez
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.makereport')
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
            .state('makereport', {
                controller: 'MakeReportCtrl as vm',
                templateUrl: 'templates/makereport/makereport.view.html',
                url: '/'
            });
    }
})();
/**
 * @author    Seppe Beelprez
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.makereport')
        .controller('MakeReportCtrl', MakeReportCtrl);

    // Inject dependencies into constructor (needed when JS minification is applied).
    MakeReportCtrl.$inject = [
        // Angular
        '$location',
        '$scope',
        '$log',
        '$window',
        'MakeReportResourceFactory',
        'GetLocationResourceFactory',
        // Ionic
        '$ionicPopup',
        '$timeout',
        '$cordovaFileTransfer',
        // ngCordova
        '$cordovaGeolocation'
    ];

    function MakeReportCtrl(
        // Angular
        $location,
        $scope,
        $log,
        $window,
        MakeReportResourceFactory,
        GetLocationResourceFactory,
        // Ionic
        $ionicPopup,
        $timeout,
        $cordovaFileTransfer,
        //ngCordava
        $cordovaGeolocation
    ) {
        // ViewModel
        // =========
        var vm = this;

        vm.title = 'Make Report';

        vm.form = {
            report: {
                description : 'Beschrijving',
                longitude   : 'Longitude',
                latitude    : 'Latitude',
                city        : 'City',
                postalcode  : 'Postalcode',
                type        : 'Type afval',
                uri         : 'Uri',
                status      : 'Status'
            }
        };

        vm.data = {
            report: {}
        };

        vm.report = {};

        vm.post = postReport;

        console.log($scope.globalLatitude, $scope.globalLongitude, $scope.globalCity, $scope.globalPostalCode);


        // Functions
        // =========
        function postReport() {

            console.log($scope.globalLatitude, $scope.globalLongitude, $scope.globalCity, $scope.globalPostalCode);

            vm.report.uri = 'http://lorempixel.com/400/400/cats/';
            vm.report.latitude = $scope.globalLatitude;
            vm.report.longitude = $scope.globalLongitude;
            vm.report.city = $scope.globalCity;
            vm.report.postalcode = $scope.globalPostalCode;

            $log.info(vm.report);

            var params = {
                    user_id: 1,
                    format: null
                },
                postData = {
                    report: vm.report
                };
            console.log('postData: ' + postData.report);

            MakeReportResourceFactory
                .save(
                params,
                postData,
                postUserArticlesSuccess,
                postUserArticlesError
            );

            console.log(postData);

        }

        function postUserArticlesError(reason) {
            $log.error('postUserArticlesError:', reason);
        }

        function postUserArticlesSuccess(response) {
            $log.log('postUserArticlesSuccess:', response);
            $location.path('/myreports');
            $window.location.reload();
        }

        //// onSuccess Callback receives a Position object
        //var onSuccess = function(position) {
        //    console.log("LAT: " + position.coords.latitude + " LONG: " + position.coords.longitude);
        //    vm.report.latitude = position.coords.latitude;
        //    vm.report.longitude = position.coords.longitude;
        //
        //    getCityAndPostalCode(vm.report.latitude, vm.report.longitude);
        //};
        //
        //
        //// onError Callback receives a PositionError object
        //function onError(error) {
        //    alert('code: '    + error.code    + '\n' +
        //        'message: ' + error.message + '\n');
        //}
        //
        //navigator.geolocation.getCurrentPosition(onSuccess, onError);
        //
        //
        //
        ////disable button until location successful
        ////display waiting message
        //function getCityAndPostalCode (lat, long) {
        //    var request = new XMLHttpRequest();
        //
        //    console.log('getCity() LAT: ' + lat + ' LONG: ' + long);
        //    var method = 'GET';
        //    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&sensor=true';
        //    var async = true;
        //
        //    request.open(method, url, async);
        //    request.onreadystatechange = function(){
        //        if(request.readyState == 4 && request.status == 200){
        //            var data = JSON.parse(request.responseText);
        //            var address = data.results[0];
        //            console.log(address);
        //            var reportCity = address['address_components'][2]['long_name'];
        //            var reportPostalCode = address['address_components'][6]['long_name'];
        //
        //            vm.report.city = reportCity;
        //            vm.report.postalcode = parseInt(reportPostalCode);
        //            //console.log('City: ' + reportCity + ', Postcode: ' + reportPostalCode);
        //        }
        //    };
        //    request.send();
        //}


        // .fromTemplate() method
        //$scope.showPopup = function() {
        //    $scope.data = {};
        //
        //    // An elaborate, custom popup
        //    var myPopup = $ionicPopup.show({
        //        //template: '<input type="password" ng-model="data.wifi">',
        //        title: 'Thank you for using our service!',
        //        //subTitle: 'Please use normal things',
        //        scope: $scope,
        //        buttons: [
        //            {
        //                text: 'OK',
        //                type: 'button button-positive'
        //            }
        //        ]
        //    });
        //    myPopup.then(function(res) {
        //        console.log('Tapped!', res);
        //    });
        //    $timeout(function() {
        //        myPopup.close(); //close the popup after 3 seconds for some reason
        //    }, 3000);
        //};
        // A confirm dialog
        //$scope.showConfirm = function() {
        //    var confirmPopup = $ionicPopup.confirm({
        //        title: 'Consume Ice Cream #iceicebaby',
        //        //template: 'Are you sure you want to eat this ice cream?'
        //        scope: $scope,
        //        buttons: [
        //            {
        //                text: 'OK',
        //                type: 'button button-balanced'
        //            }
        //        ]
        //    });
        //    confirmPopup.then(function(res) {
        //        if(res) {
        //            console.log('You are sure');
        //        } else {
        //            console.log('You are not sure');
        //        }
        //    });
        //};
        //
        //// An alert dialog
        //$scope.showAlert = function() {
        //    var alertPopup = $ionicPopup.alert({
        //        title: 'Don\'t eat that!',
        //        template: 'It might taste good'
        //    });
        //    alertPopup.then(function(res) {
        //        console.log('Thank you for not eating my delicious ice cream cone');
        //    });
        //};
    }

})();

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
/**
 * @author    Olivier Parent
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.myreports')
        .controller('MyReportsCtrl', MyReportsCtrl);

    // Inject dependencies into constructor (needed when JS minification is applied).
    MyReportsCtrl.$inject = [
        // Angular
        '$location',
        '$scope',
        '$route',
        '$log',
        '$window',
        'MyReportsResourceFactory'
    ];

    function MyReportsCtrl(
        // Angular
        $location,
        $scope,
        $route,
        $log,
        $window,
        MyReportsResourceFactory
    ) {
        // ViewModel
        // =========
        var vm = this;

        vm.title = 'My Reports';

        vm.data = getMyReports();

        vm.delete = deleteMyReport;

        // Functions
        // =========
        function getMyReports() {

            var params = {
                user_id: 1,
                format: null
            };

            return MyReportsResourceFactory
                .query(
                params,
                getMyReportsSuccess,
                getMyReportsError
            );
        }

        function getMyReportsError(reason) {
            $log.error('getMyReportsError:', reason);
        }

        function getMyReportsSuccess(response) {
            $log.log('getMyReportsSuccess:', response);
        }

        function deleteMyReport(report) {
            var currentID = report.id;
            console.log(currentID);

            var params = {
                user_id: 1,
                report_id: currentID,
                format: 'json'
            };

            return MyReportsResourceFactory
                .delete(
                params,
                deleteMyReportsSuccess,
                deleteMyReportsError
            );

        }

        function deleteMyReportsError(reason) {
            $log.error('deleteMyReportsError:', reason);
        }

        function deleteMyReportsSuccess(response) {
            $log.log('deleteMyReportsSuccess:', response);
            $window.location.reload();
        }


        // .fromTemplate() method
        //$scope.showPopup = function() {
        //    $scope.data = {};
        //
        //    // An elaborate, custom popup
        //    var myPopup = $ionicPopup.show({
        //        //template: '<input type="password" ng-model="data.wifi">',
        //        title: 'Thank you for using our service!',
        //        //subTitle: 'Please use normal things',
        //        scope: $scope,
        //        buttons: [
        //            {
        //                text: 'OK',
        //                type: 'button button-positive'
        //            }
        //        ]
        //    });
        //    myPopup.then(function(res) {
        //        console.log('Tapped!', res);
        //    });
        //    $timeout(function() {
        //        myPopup.close(); //close the popup after 3 seconds for some reason
        //    }, 3000);
        //};
        // A confirm dialog
        //$scope.showConfirm = function() {
        //    var confirmPopup = $ionicPopup.confirm({
        //        title: 'Consume Ice Cream #iceicebaby',
        //        //template: 'Are you sure you want to eat this ice cream?'
        //        scope: $scope,
        //        buttons: [
        //            {
        //                text: 'OK',
        //                type: 'button button-balanced'
        //            }
        //        ]
        //    });
        //    confirmPopup.then(function(res) {
        //        if(res) {
        //            console.log('You are sure');
        //        } else {
        //            console.log('You are not sure');
        //        }
        //    });
        //};
        //
        //// An alert dialog
        //$scope.showAlert = function() {
        //    var alertPopup = $ionicPopup.alert({
        //        title: 'Don\'t eat that!',
        //        template: 'It might taste good'
        //    });
        //    alertPopup.then(function(res) {
        //        console.log('Thank you for not eating my delicious ice cream cone');
        //    });
        //};
    }

})();

/**
 * @author    Olivier Parent
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.myreports')
        .controller('MyReportSpecificCtrl', MyReportSpecificCtrl);

    // Inject dependencies into constructor (needed when JS minification is applied).
    MyReportSpecificCtrl.$inject = [
        // Angular
        '$routeParams',
        '$scope',
        '$route',
        '$log',
        '$window',
        'MyReportsResourceFactory'
    ];

    function MyReportSpecificCtrl(
        // Angular
        $routeParams,
        $scope,
        $route,
        $log,
        $window,
        MyReportsResourceFactory
    ) {
        // ViewModel
        // =========
        var vm = this;

        vm.title = 'Report detail';

        vm.report = getMyReports();

        vm.delete = deleteMyReport;

        var id = $scope.reportId = $routeParams.reportId;
        console.log(id);

        // Functions
        // =========
        function getMyReports() {

            var params = {
                user_id: 2,
                report_id: 11
            };

            return MyReportsResourceFactory
                .query(
                params,
                getMyReportsSuccess,
                getMyReportsError
            );
        }

        function getMyReportsError(reason) {
            $log.error('getMyReportsError:', reason);
        }

        function getMyReportsSuccess(response) {
            $log.log('getMyReportsSuccess:', response);
        }

        function deleteMyReport(report) {
            var currentID = report.id;
            console.log(currentID);

            var params = {
                user_id: 1,
                report_id: currentID,
                format: 'json'
            };

            return MyReportsResourceFactory
                .delete(
                params,
                deleteMyReportsSuccess,
                deleteMyReportsError
            );

        }

        function deleteMyReportsError(reason) {
            $log.error('deleteMyReportsError:', reason);
        }

        function deleteMyReportsSuccess(response) {
            $log.log('deleteMyReportsSuccess:', response);
            $window.location.reload();
        }


        // .fromTemplate() method
        //$scope.showPopup = function() {
        //    $scope.data = {};
        //
        //    // An elaborate, custom popup
        //    var myPopup = $ionicPopup.show({
        //        //template: '<input type="password" ng-model="data.wifi">',
        //        title: 'Thank you for using our service!',
        //        //subTitle: 'Please use normal things',
        //        scope: $scope,
        //        buttons: [
        //            {
        //                text: 'OK',
        //                type: 'button button-positive'
        //            }
        //        ]
        //    });
        //    myPopup.then(function(res) {
        //        console.log('Tapped!', res);
        //    });
        //    $timeout(function() {
        //        myPopup.close(); //close the popup after 3 seconds for some reason
        //    }, 3000);
        //};
        // A confirm dialog
        //$scope.showConfirm = function() {
        //    var confirmPopup = $ionicPopup.confirm({
        //        title: 'Consume Ice Cream #iceicebaby',
        //        //template: 'Are you sure you want to eat this ice cream?'
        //        scope: $scope,
        //        buttons: [
        //            {
        //                text: 'OK',
        //                type: 'button button-balanced'
        //            }
        //        ]
        //    });
        //    confirmPopup.then(function(res) {
        //        if(res) {
        //            console.log('You are sure');
        //        } else {
        //            console.log('You are not sure');
        //        }
        //    });
        //};
        //
        //// An alert dialog
        //$scope.showAlert = function() {
        //    var alertPopup = $ionicPopup.alert({
        //        title: 'Don\'t eat that!',
        //        template: 'It might taste good'
        //    });
        //    alertPopup.then(function(res) {
        //        console.log('Thank you for not eating my delicious ice cream cone');
        //    });
        //};
    }

})();

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

/**
 * @author    Seppe Beelprez
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.profile')
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
            .state('profile', {
                controller: 'ProfileCtrl as vm',
                templateUrl: 'templates/profile/profile.view.html',
                url: '/profile'
            });
    }

})();
/**
 * @author    Olivier Parent
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.profile')
        //.factory('User', function($resource) {
        //    return $resource('http://www.zerowaste.local/app_dev.php/api/v1/users/');
        //})
        .controller('ProfileCtrl', ProfileCtrl);

    // Inject dependencies into constructor (needed when JS minification is applied).
    ProfileCtrl.$inject = [
        // Angular
        '$log',
        '$http',
        '$scope',
        'GetProfileResourceFactory'

    ];

    function ProfileCtrl(
        // Angular
        $log,
        $http,
        $scope,
        GetProfileResourceFactory
    ) {
        // ViewModel
        // =========
        var vm = this;

        vm.title = 'Profile';

        vm.data = getProfile();

        console.log(vm.data);

        // Functions
        // =========
        function getProfile() {

            var params = {
                user_id: 1,
                format: null
            };

            return GetProfileResourceFactory
                .query(
                params,
                getProfileSuccess,
                getProfileError
            );
        }

        function getProfileError(reason) {
            $log.error('getProfileError:', reason);
        }

        function getProfileSuccess(response) {
            $log.log('getProfileSuccess:', response);
        }


    }

})();

/**
 * @author    Seppe Beelprez
 * @copyright Copyright © 2015-2016 Artevelde University College Ghent
 * @license   Apache License, Version 2.0
 */
;(function () {
    'use strict';

    angular.module('app.register')
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
            .state('register', {
                controller: 'RegisterCtrl as vm',
                templateUrl: 'templates/register/register.view.html',
                url: '/register'
            });
    }

})();
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
