/**
 * Created by Ramirez on 4/1/2017.
 */
angular.module('myApp.service')
    .factory('usermanageService', ['$http', '$q', '$sce', function ($http, $q, $sce) {
        return {
            userList: function (info) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: 'http://bigbug.tech:8080/wdm-api/api/user/show.api',
                    params: {
                        token: info.token,
                        page: info.page,
                        start: info.start,
                        limit: info.limit
                    }
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                    // console.log(response);
                }, function errorCallback(response) {
                    deferred.reject(response)
                });

                return deferred.promise;
            },
            creatNewUser: function (newUserInfo) {
                return $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/user/add.api',
                    params: {
                        token: newUserInfo.token,
                        orgId: newUserInfo.orgId,
                        username: newUserInfo.username,
                        name: newUserInfo.name,
                        password: newUserInfo.password,
                        roleId: newUserInfo.roleId
                    }
                }).then(function successCallback(response) {
                    return response
                }, function errorCallback(response) {
                    console.log(response)
                });
            },
            getOrgList: function (token) {
                return $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/org/show.api',
                    params: {
                        token: token
                    }
                }).then(function successCallback(response) {
                    return response
                }, function errorCallback(response) {
                    console.log(response)
                });
            },
            getRoleList: function (token) {
                return $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/role/get_all.api',
                    params: {
                        token: token,
                        roleId: 0
                    }
                }).then(function successCallback(response) {
                    return response
                }, function errorCallback(response) {
                    console.log(response)
                });
            },
            getUserInfo: function (token, id) {
                return $http({
                    method: 'GET',
                    url: 'http://bigbug.tech:8080/wdm-api/api/user/get.api',
                    params: {
                        token: token,
                        userId: id
                    }
                }).then(function successCallback(response) {
                    return response
                }, function errorCallback(response) {
                    console.log(response)
                });
            },
            updateUserInfo: function (info) {
                return $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/user/update.api',
                    params: {
                        token: info.token,
                        userId: info.userId,
                        orgId: info.orgId,
                        roleId: info.roleId,
                        name: info.name,
                        password: info.password
                    }
                }).then(function successCallback(response) {
                    return response
                }, function errorCallback(response) {
                    console.log(response)
                });
            },
            deleteUser: function (token, id) {
                return $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/user/delete.api',
                    params: {
                        token: token,
                        id: id
                    }
                }).then(function successCallback(response) {
                    return response
                }, function errorCallback(response) {
                    console.log(response)
                });
            }
        }
    }]);