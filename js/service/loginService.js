/**
 * Created by Ramirez on 4/1/2017.
 */
angular.module('myApp.service')
    .factory('loginService', ['$http', '$q', '$sce', function ($http, $q, $sce) {
        return {
            userLogin: function (username, password) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/user/auth.api',
                    params: {
                        username: username,
                        password: password
                    }
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                    // console.log(response);
                }, function errorCallback(response) {
                    deferred.reject(response)
                });
                return deferred.promise;
            }
        }
    }]);