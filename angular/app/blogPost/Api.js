angular.module('myApp.blogPost')
    .factory('Api', ['$http', function ($http) {

        var ROOT_URL = 'http://localhost:8000/app_dev.php/posts';

        function get(id) {
            return $http.get(ROOT_URL + '/' + id);
        }

        function getAll() {
            return $http.get(ROOT_URL);
        }

        function post(data) {
            return $http.post(ROOT_URL, data);
        }

        function put(id, data) {
            return $http.put(ROOT_URL + '/' + id, data);
        }

        function remove(id) {
            return $http.delete(ROOT_URL + '/' + id);
        }

        return {
            get: get,
            getAll: getAll,
            post: post,
            put: put,
            remove: remove
        }
    }]);