'use strict';

angular.module('myApp.blogPost')

    .controller('createController', ['$scope', 'Api', '$window', function ($scope, Api, $window) {
        $scope.blogPost = {};

        $scope.create = function (blogPost) {

            Api.post(blogPost)
                .then(function (result) {
                    console.log('things went well!', result);

                    // $scope.blogPost = result.data;

                    $window.location.href = '#!list';

                }, function (err) {
                    console.error('things did not go so well', err);
                });
        }
    }]);