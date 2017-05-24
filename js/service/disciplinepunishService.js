/**
 * Created by Ramirez on 4/1/2017.
 */
angular.module('myApp.service')
    .factory('disciplinepunishService', ['$http', '$q', '$sce', function ($http, $q, $sce) {
        return {
            getOrgList: function (token) {
                return $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/org/show.api',
                    params: {
                        token: token
                    }
                }).then(function successCallback(response) {
                    return response
                    // console.log(response);
                }, function errorCallback(response) {
                    console.log(response)
                });
            },
            addInfo: function (info) {
                return $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/discipline_punish/add.api',
                    params: {
                        token: info.token,
                        title: info.title,
                        content: info.content,
                        staff: info.staff,
                        staffOrgId: info.staffOrgId
                    }
                }).then(function successCallback(response) {
                    return response
                    // console.log(response);
                }, function errorCallback(response) {
                    console.log(response)
                });
            },
            getPublicNotificationList: function (info) {
                return $http({
                    method: 'GET',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/discipline_punish/show.api',
                    params: {
                        token: info.token,
                        staff: info.staff,
                        page: info.page,
                        start: info.start,
                        limit: info.limit
                    }
                }).then(function successCallback(response) {
                    return response
                    // console.log(response);
                }, function errorCallback(response) {
                    console.log(response)
                });
            },
            getOnePublicNotificationInfo: function (token, id) {
                return $http({
                    method: 'GET',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/discipline_punish/get.api',
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
            },
            updateInfo: function (token, info) {
                return $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/discipline_punish/update.api',
                    params: {
                        token: token,
                        id: info.id,
                        title: info.title,
                        content: info.content,
                        staff: info.staff,
                        staffOrgId: info.staffOrg.id
                    }
                }).then(function successCallback(response) {
                    return response
                    // console.log(response);
                }, function errorCallback(response) {
                    console.log(response)
                });
            },
            deleteInfo: function (token, id) {
                return $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/discipline_punish/delete.api',
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