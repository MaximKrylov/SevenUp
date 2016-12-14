angular.module('App')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: 'App/Components/Home/Home.html',
                controller: 'HomeController'
            })
            .otherwise({ redirectTo: "/home" });
    }]);
