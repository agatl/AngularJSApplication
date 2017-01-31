customerInformation.factory('customerDashboard', ["$resource", customerDashboard]);



function customerDashboard($resource) {
 //  alert("in service");
   return $resource('http://localhost:53139/api/Register/:id', { id: "@id" }, { 'test': { method: 'DELETE' } });

}
//function customerDashboardEdit($resource) {
//    return $resource('http://localhost:53139/api/Register/:id', { id: "@id" },{update:  { method: 'PUT' // this method issues a PUT request
//        }
//    }, {
//    stripTrailingSlashes: false
//});
//}
customerInformation.controller("dashboardController", function ($scope, customerDashboard, $window) {
    var id = QueryString.id;
    var userData = {};
    if (id ==undefined) {
        //window.location.href('\View\Login.html');
    }
    else {
        customerDashboard.get({ id: id }, function (sharedData) {
            $scope.userLogged = sharedData.CustomerFirstName + " " + sharedData.CustomerLastName;
            $scope.userData = sharedData;
            userData = sharedData;
        }, function (data) {
            var test = data;
        });
        
        $scope.deleteAccount = function (data) {
            customerDashboard.delete({ id:data }, function () {
                $scope.userData = null;
                console.log('Deleted from server');
            }, function (data) {
                var test = data;
            });
        };
        $scope.updateAccount = function (data) {
            //customerDashboard.delete()
            var host = $window.location.host;
            var landingurl = "http://" + host + "/views/Register.html?id=" + data;
            $window.location.href = landingurl;
            $scope.userData = data;
        }
    }
});

var QueryString = function () {
    // This function is anonymous, is executed immediately and 
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
}();