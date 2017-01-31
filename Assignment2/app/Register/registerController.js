customerInformation.factory('Register', function ($resource) {
    return $resource('http://localhost:53139/api/Register/:customerDetails', { customerDetails: "@customer" });
});
customerInformation.controller("customerController", function ($scope, Register) {
    predefinedData($scope);
    var id = QueryString.id;
    if (id != undefined) {
        Register.get({ id: id }, function (response) {
            $scope.register = {};
            $scope.register.customerId = response.CustomerId;
            $scope.register.firstName = response.CustomerFirstName;
            $scope.register.lastName = response.CustomerLastName;
            $scope.register.gender = response.Gender.trim();//male=0;female=1
            $scope.register.dateOfBirth = new Date(response.DateofBirth);
            $scope.selectedCountry = response.CountryOfBirth;
            $scope.register.socialSecurityNumber = response.SocialSecurityNumber;
            $scope.register.email1 = response.Email;
            //$scope.listofOptions.toString()
            for (var i = 0; i < $scope.listofOptions.length; i++) {//3 options
                for (var j = 0; j < response.CustomerOptions.length; j++) {
                    if ($scope.listofOptions[i].name == response.CustomerOptions[i])
                        $scope.listofOptions[i].selected = true;
                }
            }
            //Disable username & password div
            $scope.isEdit = true;
            $scope.buttonName = "Update";
        }, function (data) {
            var test = data;
        });
    }
            $scope.Submit = function () {
        //if ($scope.myform.$valid) {
            $scope.isCountrySelected = $scope.selectedCountry == "Select" ? true : false;
            $scope.howYouKnewAboutUs = [];
            for (var i = 0; i < $scope.listofOptions.length; i++) {
                if ($scope.listofOptions[i].selected == true) {
                    $scope.howYouKnewAboutUs.push($scope.listofOptions[i].name);// += $scope.listofOptions[i].name.toString()+ "|";
                }

            }
            var customerParams =
            {
                CustomerId:$scope.register.customerId,
                firstName: $scope.register.firstName,
                lastName: $scope.register.lastName,
                gender: $scope.register.gender,//male=0;female=1
                dateOfBirth: $scope.register.dateOfBirth,
                countryOfBirth: $scope.selectedCountry,
                socialSecurityNumber: $scope.register.socialSecurityNumber,
                email: $scope.register.email1,
                optionsToKnow: $scope.howYouKnewAboutUs.toString(),
                userName: $scope.register.userName,
                password: $scope.register.password
            };
            Register.save(customerParams, function (data) {
            }, function (error) {
                alert(error);
            });
        //}

        $scope.validateDob = function () {
            alert("hit");
            //var currentDate = new Date();
            //if (dob.getFullYear() >= currentDate.getFullYear()) {
            //    alert("dob year" + dob.getFullYear() + "  current year" + currentDate.getFullYear());
            //    $scope.value = true;
            //}
            //else {
            //    $scope.value = false;
            //}
            //alert(same);

        }
    }
    
    
    //$scope.howYouKnewAboutUs=response.
});

function predefinedData($scope) {
    /*Country of Birth*/
    $scope.buttonName = "Register";
    $scope.selectedCountry = "Select";
    $scope.countries = ["USA", "India", "Australia", "China", "UK", "Russia"];
    $scope.dropboxitemselected = function (item) {
        $scope.selectedCountry = item;
        $scope.isCountrySelected = $scope.selectedCountry == "Select" ? true : false;
    }
    /*How do you know about us*/
    $scope.listofOptions = [
{ name: 'News', selected: true },
{ name: 'Online', selected: false },
{ name: 'Magazine', selected: false },
    ];
    /*SSN*/
    $scope.ssnPattern = ssnPattern;
    /*Email*/
    $scope.emailPattern = /^([a-zA-Z0-9])+([a-zA-Z0-9._%+-])+@([a-zA-Z0-9_.-])+\.(([a-zA-Z]){2,6})$/;
};
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


//directive to compare password
customerInformation.directive("passwordVerify", function () {
    return {
        require: "ngModel",
        scope: {
            passwordVerify: '='
        },
        link: function (scope, element, attrs, ctrl) {
            scope.$watch(function () {
                var combined;

                if (scope.passwordVerify || ctrl.$viewValue) {
                    combined = scope.passwordVerify + '_' + ctrl.$viewValue;
                }
                return combined;
            }, function (value) {
                if (value) {
                    ctrl.$parsers.unshift(function (viewValue) {
                        var origin = scope.passwordVerify;
                        if (origin !== viewValue) {
                            ctrl.$setValidity("passwordVerify", false);
                            return undefined;
                        } else {
                            ctrl.$setValidity("passwordVerify", true);
                            return viewValue;
                        }
                    });
                }
            });
        }
    };
});
