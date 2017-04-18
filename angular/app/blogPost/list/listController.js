'use strict';

angular.module('myApp.blogPost')

    .controller('listController', ['$scope', 'Api', '$filter', function ($scope, Api, $filter) {

        $scope.blogPosts = [];
        $scope.totalItems = 1;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;
        $scope.propertyName = null;
        $scope.reverse = true;
        $scope.itemsPerPage = 5;
        $scope.filter = '';

        var getBlogPosts = function (page, itemsPerPage, filter, sortBy, direction) {
            Api.getAll(page, itemsPerPage, filter, sortBy, direction)
                .then(function (result) {
                    console.log('things went well!', result);

                    $scope.blogPosts = result.data.data;

                    $scope.totalItems = result.data.totalItems;
                    $scope.currentPage = result.data.currentPage;

                }, function (err) {
                    console.error('things did not go so well', err);
                });
        };

        getBlogPosts(1, $scope.itemsPerPage);

        $scope.remove = function (id) {
            Api.remove(id)
                .then(function (result) {
                    $scope.blogPosts = $filter('filter')($scope.blogPosts, function (value, index, array) {
                        return value.id !== id;
                    });
                }, function (error) {
                    console.error('error', error);
                });
        };

        $scope.pageChanged = function () {
            console.log('called page changed', $scope.currentPage);
            getBlogPosts($scope.currentPage, $scope.itemsPerPage, $scope.filter, $scope.propertyName, reversedAsString($scope.reverse));
        };

        $scope.sortBy = function (propertyName) {
            console.log('sort by property name', propertyName);
            $scope.propertyName = propertyName;
            $scope.reverse = !$scope.reverse;

            getBlogPosts($scope.currentPage, $scope.itemsPerPage, $scope.filter, $scope.propertyName, reversedAsString($scope.reverse));
        };

        var reversedAsString = function (bool) {
            return bool === true ? 'asc' : 'desc';
        };

        $scope.$watch('itemsPerPage', function (newValue, oldValue) {
            console.log('itemsPerPage changes', newValue, oldValue); // not used, just for demonstration
            getBlogPosts($scope.currentPage, $scope.itemsPerPage, $scope.filter, $scope.propertyName, reversedAsString($scope.reverse));
        });

        $scope.$watch('filter', function (newValue, oldValue) {
            console.log('filter changes', newValue, oldValue); // not used, just for demonstration
            getBlogPosts(1, $scope.itemsPerPage, $scope.filter, $scope.propertyName, reversedAsString($scope.reverse));
        });
    }]);