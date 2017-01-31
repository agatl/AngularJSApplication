customerInformation.factory('Login', function ($resource) {
    return $resource('http://localhost:53139/api/Login/:customerObj', { customerObj: "@customerObj" });
})
customerInformation.controller('loginController', function ($scope, Login,$location, myService, $window, $rootScope) {
    $scope.submit = function () {
        var loginParams = { UserName: $scope.customer.userName, Password: $scope.customer.password };
        Login.save(loginParams, function (response) {
            //alert(response);
            //sessionData.addData = response
            //myService.set(response);
            //var text = myService.get();
            //alert(text);
            //($scope.dataToShare);//set data in the session
           // $location.path = "home";
            // alert($location.path());
            //$location.url('/Views/Dashboard.html');
            //$window.location.href = '/Views/Dashboard.html';
            if (response.CustomerId != 0) {
                $rootScope.dataToShare = response;
                var host = $window.location.host;
                var landingurl = "http://" + host + "/views/dashboard.html?id=" + response.CustomerId;
                $window.location.href = landingurl;
            }
            else {
                $scope.customError = true;
                $scope.error = "Invalid User Name and Password!!";
            }
        }, function (error) {
            var err = error;
            alert(err);
        });
    };
});


function throwValidationMessage() {
    $scope.myForm.customer.password.$error = $scope.customer.password == undefined ? true : false;
    $scope.myForm.customer.uName.$error = $scope.customer.uName == undefined ? true : false;
};
//customerInformation.service('sessionData', function ($window) {
//    var KEY = 'App.SelectedValue';

//    var addData = function (newObj) {
//        var mydata = $window.sessionStorage.getItem(KEY);
//        if (mydata) {
//            mydata = JSON.parse(mydata);
//        } else {
//            mydata = [];
//        }
//        mydata.push(newObj);
//        $window.sessionStorage.setItem(KEY, JSON.stringify(mydata));
//    };

//    var getData = function () {
//        var mydata = $window.sessionStorage.getItem(KEY);
//        if (mydata) {
//            mydata = JSON.parse(mydata);
//        }
//        return mydata || [];
//    };

//    return {
//        addData: addData,
//        getData: getData
//    };
//});
customerInformation.factory('myService', function () {
    var savedData = {}
    function set(data) {
        savedData = data;
    }
    function get() {
        return savedData;
    }

    return {
        set: set,
        get: get
    }

});

//Cookie implementation:

//var authdata = Base64.encode(response.CustomerFirstName + ' ' + response.CustomerLastName);
//$rootScope.globals = {
//    currentUser: {
//        username: response,
//        authdata: authdata
//    }
//};
//// set default auth header for http requests
//$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

//// store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
//var cookieExp = new Date();
//cookieExp.setDate(cookieExp.getDate() + 7);//7 means 7 days
//$cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
//alert($cookies);
////Log out functionality
//function ClearCredentials() {
//    $rootScope.globals = {};
//    $cookies.remove('globals');
//    $http.defaults.headers.common.Authorization = 'Basic';
//}

