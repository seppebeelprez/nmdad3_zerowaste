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
