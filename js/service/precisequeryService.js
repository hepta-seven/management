/**
 * Created by Ramirez on 4/1/2017.
 */
angular.module('myApp.service')
    .factory('precisequeryService', ['$http', '$q', '$sce', function ($http, $q, $sce) {
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
            precisequery: function (info) {
                return $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/search.api',
                    params: {
                        token: info.token,
                        staff: info.staff,
                        staffOrgId: info.staffOrgId,
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

        }

    }]);