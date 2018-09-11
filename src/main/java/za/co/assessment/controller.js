

var app = angular.module('marvelApp', []);

app.controller('MarvelAppCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

    // Load the data
    $http.get('http://localhost:8080/api/marvel/charactors').then(function (res) {
        $scope.data = res.data;
        $timeout(expand, 0);
    });

    $scope.autoExpand = function(e) {
        var element = typeof e === 'object' ? e.target : document.getElementById(e);
        var scrollHeight = element.scrollHeight -60; // replace 60 by the sum of padding-top and padding-bottom
        element.style.height =  scrollHeight + "px";
    };

    function expand() {
        $scope.autoExpand('TextArea');
    }
}]);


