(function () {
    'use strict';

    angular.module('App')
        .config(['$routeProvider', RouteProvider]);

    function RouteProvider($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: 'App/Components/Home/Home.html',
                controller: 'HomeController',
                controllerAs: 'HomeViewModel'
            })
            .otherwise({ redirectTo: "/home" });
    }
})();
