'use strict';

angular.module('myApp.blogPost')

    .controller('listController', ['$scope', 'Api', function ($scope, Api) {

        $scope.blogPosts = [];

        Api.getAll()
            .then(function (result) {
                console.log('things went well!', result);

                $scope.blogPosts = result.data;

            }, function (err) {
                console.error('things did not go so well', err);
            });
    }]);