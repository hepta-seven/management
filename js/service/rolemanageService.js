/**
 * Created by Ramirez on 4/1/2017.
 */
angular.module('myApp.service')
    .factory('rolemanageService', ['$http', '$q', '$sce', function ($http, $q, $sce) {
        return {
            addRole: function (info, permissionInfo) {
                console.log(permissionInfo);
                return $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/role/add.api',
                    params: {
                        token: info.token,
                        roleName: info.roleName,
                        functionCodes: permissionInfo
                    }
                }).then(function successCallback(response) {
                    return response
                    // console.log(response);
                }, function errorCallback(response) {
                    console.log(response)
                });
            },
            getRoleList: function (info) {
                return $http({
                    method: 'GET',
                    url: 'http://bigbug.tech:8080/wdm-api/api/role/show.api',
                    params: {
                        token: info.token,
                        page: info.page,
                        start: info.start,
                        limit: info.limit
                    }
                }).then(function successCallback(response) {
                    return response;
                    // console.log(response);
                }, function errorCallback(response) {
                    console.log(response)
                });
            },
            getOneRoleInfo: function (token, roleId) {
                return $http({
                    method: 'GET',
                    url: 'http://bigbug.tech:8080/wdm-api/api/role/get.api',
                    params: {
                        token: token,
                        roleId: roleId
                    }
                }).then(function successCallback(response) {
                    return response
                    // console.log(response);
                }, function errorCallback(response) {
                    return response
                });
            },
            updateInfo: function (token, roleInfo, permissionInfo) {
                return $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/role/update.api',
                    params: {
                        token: token,
                        roleId: roleInfo.id,
                        roleName: roleInfo.name,
                        functionCodes: permissionInfo
                    }
                }).then(function successCallback(response) {
                    return response
                    // console.log(response);
                }, function errorCallback(response) {
                    console.log(response)
                });
            },
            deleteRole: function (token, id) {
                return $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/role/delete.api',
                    params: {
                        token: token,
                        id: id
                    }
                }).then(function successCallback(response) {
                    return response
                    // console.log(response);
                }, function errorCallback(response) {
                    console.log(response)
                });
            }
        }
    }]);