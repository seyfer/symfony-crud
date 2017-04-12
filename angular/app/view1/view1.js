'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$http', function ($scope, $http) {

        $scope.blogPosts = [];

        $http.get('http://localhost:8000/app_dev.php/posts')
            .then(function (result) {
                console.log('things went well!', result);

                $scope.blogPosts = result.data;

            }, function (err) {
                console.error('things did not go so well', err);
            });
    }]);