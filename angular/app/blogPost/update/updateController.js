'use strict';

angular.module('myApp.blogPost')

    .controller('updateController', ['$scope', 'Api', '$window', '$routeParams',
        function ($scope, Api, $window, $routeParams) {
            $scope.blogPost = {};

            Api.get($routeParams.id)
                .then(function (result) {
                    console.log('things went well!', result);

                    $scope.blogPost = result.data;

                    // $window.location.href = '#!list';

                }, function (err) {
                    console.error('things did not go so well', err);
                });

            $scope.update = function (blogPost) {

                Api.put(blogPost.id, blogPost)
                    .then(function (response) {
                        console.log('response', response);
                        $window.location.href = '#!list';
                    }, function (error) {
                        console.log('error', error);
                    });

            };
        }]);