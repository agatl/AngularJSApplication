customerInformation.controller('dummyController', function ($scope, sessionService) {
    $scope.data = sessionService.get();

    $scope.submit = function () {
        alert($scope.data);
        alert("sdfssf");
    };
});