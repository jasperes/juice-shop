var myApp = angular.module('myApp', [
    'ngRoute',
    'ngCookies',
    'ui.bootstrap'
]);

myApp.factory('authInterceptor', ['$rootScope', '$q', '$cookieStore', function ($rootScope, $q, $cookieStore) {
    'use strict';
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($cookieStore.get('token')) {
                config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
            }
            return config;
        },
        response: function (response) {
            if (response.status === 401) {
                console.err('401: ' + response.statusText);
            }
            return response || $q.when(response);
        }
    };
}]);

myApp.config(['$httpProvider', function ($httpProvider) {
    'use strict';
    $httpProvider.interceptors.push('authInterceptor');
}]);

myApp.run(['$cookieStore', '$rootScope', function($cookieStore, $rootScope) {
    'use strict';
    $rootScope.isLoggedIn = function() {
        return $cookieStore.get('token');
    };

}]);