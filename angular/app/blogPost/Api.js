angular.module('myApp.blogPost')
    .factory('Api', ['$http', function ($http) {

        var ROOT_URL = 'http://localhost:8000/app_dev.php/posts';

        function getAll() {
            return $http.get(ROOT_URL);
        }

        return {
            getAll: getAll
        }
    }]);