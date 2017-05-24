/**
 * Created by Ramirez on 4/1/2017.
 */
angular.module('myApp.service')
    .factory('publicityService', ['$http', '$q', '$sce', function ($http, $q, $sce) {
        return {
            bulletin: function (info) {
                // console.log(applicant);
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/show_bulletin.api',
                    params: {
                        token: info.token,
                        staff: info.staff,
                        bulletinStatus: info.bulletinStatus,
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
            getPublicityData: function (mytoken, eventId) {
                return $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event_bulletin_result/get_by_event.api',
                    params: {
                        token: mytoken,
                        eventId: eventId
                    }
                }).then(function successCallback(response) {
                    return response
                    // console.log(response);
                }, function errorCallback(response) {
                    console.log(response)
                });
            },
            viewData: function (mytoken, id) {
                return $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event/get.api',
                    params: {
                        token: mytoken,
                        id: id
                    }
                }).then(function successCallback(response) {
                    return response
                    // console.log(response);
                }, function errorCallback(response) {
                    console.log(response)
                });
            },
            publicityContent: function (info) {
                return $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event_bulletin/add.api',
                    params: {
                        token: info.token,
                        eventId: info.eventId,
                        content: info.content,
                        attachmentFileCode: info.attachmentFileCode
                    }
                }).then(function successCallback(response) {
                    return response
                    // console.log(response);
                }, function errorCallback(response) {
                    console.log(response)
                });
            },
            publicityResult: function (info) {
                return $http({
                    method: 'POST',
                    url: 'http://bigbug.tech:8080/wdm-api/api/wdm/event_bulletin_result/add.api',
                    params: {
                        token: info.token,
                        eventId: info.eventId,
                        status: info.status,
                        content: info.content,
                        attachmentFileCode: info.attachmentFileCode
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