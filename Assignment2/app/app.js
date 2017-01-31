var customerInformation = angular.module('customerInformation', ['ngResource']);
//var moduleA = angular.module('customerInformation', ['ngMessages']);
//var registerApp=angular.module("customerForm", []);
//customerInformation.config(['$routeProvider', '$locationProvider',
//    function ($routeProvider, $locationProvider) {
//        $routeProvider.when('home', {
//            templateUrl: '/Views/Register.html',
//            controller: 'loginController'
//        })
//        $routeProvider.when('/', {
//            templateUrl: 'auth.html',
//            controller: 'loginController'
//        }).otherwise({
//            redirectTo: 'Login.html'
//        });
        //$locationProvider.html5Mode(true); //Remove the '#' from URL.
//    }
//]);

//customerInformation.factory("userPersistenceService", ["$cookies", function ($cookies) {
//	    var userName = "";

//	    return {
//	        setCookieData: function (username) {
//	            userName = username;
//	            $cookies.put("userName", username);
//	        },
//	        getCookieData: function () {
//	            userName = $cookies.get("userName");
//	            return userName;
//	        },
//	        clearCookieData: function () {
//	            userName = "";
//	            $cookies.remove("userName");
//	        }
//	    }
//	}
//]);