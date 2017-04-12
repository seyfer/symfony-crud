'use strict';

angular.module('myApp.blogPost')

    .controller('listController', ['$scope', 'Api', '$filter', function ($scope, Api, $filter) {

        $scope.blogPosts = [];

        Api.getAll()
            .then(function (result) {
                console.log('things went well!', result);

                $scope.blogPosts = result.data;

            }, function (err) {
                console.error('things did not go so well', err);
            });

        $scope.remove = function (id) {
            Api.remove(id)
                .then(function (result) {
                    $scope.blogPosts = $filter('filter')($scope.blogPosts, function (value, index, array) {
                        return value.id !== id;
                    });
                }, function (error) {
                    console.error('error', error);
                });
        }

    }]);